import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  button: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    height: 'unset',
  },
  buttonInner: {
    justifyContent: 'flex-start',
  },
  buttonText: {
    textAlign: 'left',
    whiteSpace: 'normal',
  },
}));
