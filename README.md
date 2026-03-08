# react-spotlight-gallery

React + TypeScript wrapper around the original Spotlight.js runtime.

- Github: https://github.com/vladi160/react-spotlight-gallery
- npm: https://www.npmjs.com/package/react-spotlight-gallery

## Install

```bash
npm install react-spotlight-gallery
```

## Import styles

```ts
import 'react-spotlight-gallery/style.css';
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

```bash
npm install
npm run dev
```
