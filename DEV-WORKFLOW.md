# Mantine Development Workflow

## Problem: Demo Changes Not Showing Up

When you edit files in `packages/@docs/demos/src/`, changes don't automatically appear in the Next.js dev server because:

1. The `@docs/demos` package exports **compiled** (esm/, cjs/) versions, not source files
2. Next.js dev server watches the **compiled output**, not TypeScript source
3. Changes to source files must be **rebuilt** to show up in the app

## Solutions

### Option 1: Watch Mode (Recommended for Active Development)

Run the watcher in a separate terminal:

```bash
npm run watch:demos
```

This will:
- Watch for changes in `packages/@docs/demos/src/`
- Automatically rebuild when you save any `.ts`, `.tsx`, or `.css` file
- Display build status and errors

Then run the dev server in another terminal:
```bash
npm run docs
```

**Development workflow:**
1. Terminal 1: `npm run watch:demos` (leave running)
2. Terminal 2: `npm run docs` (Next.js dev server)
3. Edit demo files in `packages/@docs/demos/src/`
4. Watcher rebuilds automatically
5. Next.js picks up the changes and hot-reloads

### Option 2: Manual Rebuild (For Occasional Edits)

If you're only making occasional changes, rebuild manually:

```bash
npm run build @docs/demos
```

This is faster than the full build (~5-10 seconds) and only rebuilds the demos package.

### Option 3: Full Build (Initial Setup)

When setting up or after major changes:

```bash
npm run build
```

Rebuilds all packages in the monorepo.

## Package Architecture

```
packages/@docs/demos/
├── src/                          # TypeScript source files (what you edit)
│   ├── demos/
│   │   └── core/
│   │       └── Button/
│   │           └── Button.demo.customVariant.tsx
│   └── index.ts
│
├── esm/                          # Compiled ES modules (what Next.js imports)
│   ├── demos/
│   │   └── core/
│   │       └── Button/
│   │           └── Button.demo.customVariant.mjs
│   └── index.mjs
│
├── cjs/                          # Compiled CommonJS (for other tools)
└── lib/                          # TypeScript declarations (.d.ts)
```

**Import Resolution:**
```typescript
// In apps/mantine.dev/src/pages/core/button.mdx
import { ButtonDemos } from '@docs/demos'
//                          ↓
// Resolves to: packages/@docs/demos/esm/index.mjs (compiled)
// NOT to: packages/@docs/demos/src/index.ts (source)
```

## Build System Details

- **Build tool**: Rollup with TypeScript via esbuild plugin
- **Type generation**: `tsc` with `emitDeclarationOnly: true`
- **Entry point**: `scripts/build/build-package.ts`
- **Config**: `scripts/build/rollup/create-package-config.ts`

## Troubleshooting

### Changes still not appearing?

1. **Check the watcher is running**: Look for "Building @docs/demos..." messages
2. **Verify build succeeded**: Should see "✅ Build complete!"
3. **Hard refresh browser**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
4. **Restart Next.js dev server**: Stop and run `npm run docs` again
5. **Clear Next.js cache**: `rm -rf apps/mantine.dev/.next`

### Build errors?

- Check TypeScript errors in your demo file
- Ensure all imports are valid
- Look at the terminal output for specific errors

### Watcher not detecting changes?

- Verify you're editing files in `packages/@docs/demos/src/`
- Check file extensions are `.ts`, `.tsx`, or `.css`
- Try saving the file again

## Related Commands

```bash
# Development
npm run docs              # Start Next.js dev server (port 7545)
npm run watch:demos       # Watch and rebuild demos package
npm run storybook         # Start Storybook (port 2356)

# Building
npm run build @docs/demos # Build only demos package
npm run build             # Build all packages
npm run docs:build        # Build docs site for production

# Other
npm run docs:docgen       # Generate documentation from source
npm run clean             # Remove all build outputs
```

## Why This Architecture?

The mantine monorepo uses a **build-and-import** pattern (compiled outputs) rather than **direct source imports** because:

1. **Next.js static export mode** (`output: 'export'`) optimizes for pre-compiled dependencies
2. **Faster production builds** - no need to compile dependencies at build time
3. **Separate type generation** - TypeScript types generated independently
4. **Cross-package compatibility** - Both ESM and CJS outputs for different tools
5. **Explicit build step** - More control over what gets published

The tradeoff is that changes require rebuilding, which is why the watch script was created.
