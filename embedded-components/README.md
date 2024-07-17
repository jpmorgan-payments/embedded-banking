# Embedded Banking Components

Seamlessly integrate sophisticated UI components into your existing applications with Embedded Components, offering a plug-and-play solution for Embedded Banking features.

This library is a works-in-progress.

## Usage

---

:warning: This SDK is undergoing active development towards a stable release. While the version remains < 1.0.0 there may be some changes to the public API. We will endeavour to avoid that or keep to a minimum where possible

---

Place the `<EBComponentsProvider>` component at the top-level of your React application. This wrapper will securely handle the sign-in and authenticate the user, in addition to applying a theme throughout all of the components.

Next, you can add Embedded Banking Components anywhere within your application.

The following is a current minimal setup:

```tsx
import {
  EBComponentsProvider,
  LinkedAccountWidget,
} from '@jpmorgan-payments/embedded-banking-components';

export const YourApplication = () => {
  return (
    <EBComponentsProvider theme={{}} apiBaseUrl="">
      <LinkedAccountWidget />
    </EBComponentsProvider>
  );
};
```

## Contributing

### Recommended VSCode plugins:

- Prettier
- Tailwind CSS Intellisense

### Recommended VS Code Settings

#### `files.associations`

Use the `files.associations` setting to tell VS Code to always open `.css` files in Tailwind CSS mode:

```

"files.associations": {
"\*.css": "tailwindcss"
}

```

#### `editor.quickSuggestions`

By default VS Code will not trigger completions when editing "string" content, for example within JSX attribute values. Updating the `editor.quickSuggestions` setting may improve your experience:

```"editor.quickSuggestions": {
  "strings": "on"
}
```

### Guidelines

1. Create a new component in `./src/core`
2. Export it in `./src/index.tsx`
3. Also add it to `./src/vanilla/componentRegistry.ts`

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
