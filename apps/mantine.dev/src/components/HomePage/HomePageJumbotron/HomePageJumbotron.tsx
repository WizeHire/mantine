import Link from 'next/link';
import { IconArrowUpRight } from '@tabler/icons-react';
import { Badge, Box, Button, Stack } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import { meta } from '@mantinex/mantine-meta';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import classes from './HomePageJumbotron.module.css';
import darkImg from './images/dark-collage.webp';
import lightImg from './images/light-collage.webp';

export function HomePageJumbotron() {
  return (
    <section className={classes.root}>
      <div className={classes.overlay} />
      <HomePageContainer className={classes.container}>
        <Box
          darkHidden
          className={classes.image}
          style={{ backgroundImage: `url(${lightImg.src})` }}
        />
        <Box
          lightHidden
          className={classes.image}
          style={{ backgroundImage: `url(${darkImg.src})` }}
        />
        <div className={classes.main}>
          <Stack>
            <Badge color="var(--color-red-700)" c="var(--color-red-300)" size="lg">
              WizeHire Theme
            </Badge>
            <HomePageTitle order={1}>
              A fully featured React
              <br /> components library
            </HomePageTitle>
          </Stack>

          <HomePageDescription>
            Build fully functional accessible web applications faster than ever – Mantine includes
            more than 120 customizable components and 70 hooks to cover you in any situation
          </HomePageDescription>

          <div className={classes.actions}>
            <Button
              component={Link}
              href="/getting-started"
              className={classes.action}
              data-get-started
              justify="space-between"
              rightSection={<IconArrowUpRight size={26} stroke={1.5} />}
            >
              Get Started
            </Button>
            <Button
              className={classes.action}
              data-github
              rightSection={<GithubIcon size={26} />}
              justify="space-between"
              component="a"
              href={meta.gitHubLinks.mantine}
            >
              GitHub
            </Button>
          </div>
        </div>
      </HomePageContainer>
    </section>
  );
}
