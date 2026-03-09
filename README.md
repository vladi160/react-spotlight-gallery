# react-spotlight-gallery

Modern React + TypeScript wrapper around Spotlight.js with the original interactions and gallery behavior.

- Demo: https://vladi160.github.io/react-spotlight-gallery
- GitHub: https://github.com/vladi160/react-spotlight-gallery
- npm: https://www.npmjs.com/package/react-spotlight-gallery

## Features

- Original Spotlight runtime behavior and effects
- Typed React components for markup usage
- Programmatic API (`Spotlight.show`, `next`, `prev`, etc.)
- Works with React and Next.js client components

## Install

```bash
npm install react-spotlight-gallery
```

## Import styles

```ts
import 'react-spotlight-gallery/style.css';
```

## Quick Start (React)

```tsx
import { SpotlightGroup, SpotlightItem } from 'react-spotlight-gallery';
import 'react-spotlight-gallery/style.css';

export function Gallery() {
  return (
    <SpotlightGroup options={{ fit: 'cover', autohide: 'all' }}>
      <SpotlightItem
        href="/gallery/image.jpg"
        options={{ title: 'Image title', description: 'Image description' }}
      >
        <img src="/gallery/thumb.jpg" alt="Image title" />
      </SpotlightItem>
    </SpotlightGroup>
  );
}
```

## Declarative usage

```tsx
import { SpotlightGroup, SpotlightItem } from 'react-spotlight-gallery';

export function Example() {
  return (
    <SpotlightGroup options={{ fit: 'cover', autohide: 'all' }}>
      <SpotlightItem href="/gallery/image.jpg">
        <img src="/gallery/thumb.jpg" alt="Preview" />
      </SpotlightItem>
    </SpotlightGroup>
  );
}
```

## Programmatic usage

```ts
import { Spotlight } from 'react-spotlight-gallery';

Spotlight.show(
  [
    { src: '/gallery/1.jpg', title: 'Slide 1' },
    { src: '/gallery/2.jpg', title: 'Slide 2' }
  ],
  {
    index: 1,
    theme: 'white',
    control: ['page', 'fullscreen', 'close']
  }
);
```

## Next.js

Use in client components:

```tsx
'use client';
```

## API surface

- `Spotlight.show(gallery, options, index?)`
- `Spotlight.close()`
- `Spotlight.next()`
- `Spotlight.prev()`
- `Spotlight.goto(slide)`
- `Spotlight.zoom(factor?)`
- `Spotlight.fullscreen(state?)`
- `Spotlight.autofit(state?)`
- `Spotlight.menu(state?)`
- `Spotlight.play(state?)`
- `Spotlight.theme(value?)`
- `Spotlight.download()`

## Demo
Live demo: [https://vladi160.github.io/react-spotlight-gallery](https://vladi160.github.io/react-spotlight-gallery)

Or run locally:

```bash
git clone https://github.com/vladi160/react-spotlight-gallery.git
cd react-spotlight-gallery
npm install
npm run dev
```
