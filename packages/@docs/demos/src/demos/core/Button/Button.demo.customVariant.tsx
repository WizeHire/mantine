import { Button, Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group, Button } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Button variant="brandPrimary">brandPrimary variant</Button>
      <Button variant="gradient">Gradient variant</Button>
      <Button variant="gradientOutline">Gradient Outline variant</Button>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <Button variant="brandPrimary">brandPrimary variant</Button>
      <Button variant="gradient">Gradient variant</Button>
      <Button variant="gradientOutline">Gradient Outline variant</Button>
    </Group>
  );
}

export const customVariant: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
  ],
};
