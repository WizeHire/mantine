#!/usr/bin/env node
import { watch } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demosPath = path.join(__dirname, '../packages/@docs/demos/src');

let isBuilding = false;
let needsRebuild = false;

function buildDemos() {
  if (isBuilding) {
    needsRebuild = true;
    return;
  }

  isBuilding = true;
  console.log('\n🔨 Building @docs/demos...');

  const build = spawn('npm', ['run', 'build', '@docs/demos'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    shell: true,
  });

  build.on('close', (code) => {
    isBuilding = false;
    if (code === 0) {
      console.log('✅ Build complete!');
    } else {
      console.error('❌ Build failed');
    }

    if (needsRebuild) {
      needsRebuild = false;
      setTimeout(() => buildDemos(), 100);
    }
  });
}

console.log(`👀 Watching for changes in ${demosPath}...\n`);

watch(demosPath, { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith('.ts') || filename.endsWith('.tsx') || filename.endsWith('.css'))) {
    console.log(`📝 Changed: ${filename}`);
    buildDemos();
  }
});

// Initial build
buildDemos();
