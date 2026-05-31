# react-spotlight-gallery

React + TypeScript wrapper for [Spotlight.js](https://github.com/nextapps-de/spotlight).

- [Demo](https://vladi160.github.io/react-spotlight-gallery)
- [npm](https://www.npmjs.com/package/react-spotlight-gallery)
- [GitHub](https://github.com/vladi160/react-spotlight-gallery)

## Install

```bash
npm install react-spotlight-gallery
```

Import styles once (app entry or layout):

```ts
import 'react-spotlight-gallery/style.css';
```

## Declarative usage

```tsx
import { SpotlightGroup, SpotlightItem } from 'react-spotlight-gallery';
import 'react-spotlight-gallery/style.css';

<SpotlightGroup options={{ fit: 'cover', autohide: 'all' }}>
  <SpotlightItem href="/gallery/photo.jpg" options={{ title: 'Title', description: 'Description' }}>
    <img src="/gallery/thumb.jpg" alt="Title" />
  </SpotlightItem>
  <SpotlightItem href="/gallery/photo2.jpg">
    <img src="/gallery/thumb2.jpg" alt="Photo 2" />
  </SpotlightItem>
</SpotlightGroup>
```

`SpotlightGroup` → `div.spotlight-group`  
`SpotlightItem` → `<a class="spotlight">` (or `<div>` via `as="div"`)

### SpotlightGroup props

| Prop | Type | Description |
|---|---|---|
| `options` | `SpotlightGroupOptions` | Gallery-level options |
| `className` | `string` | Extra CSS class |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | Any div attribute |

### SpotlightItem props

| Prop | Type | Description |
|---|---|---|
| `href` | `string` | Full image URL — renders as `<a>` |
| `options` | `SpotlightItemOptions` | Per-slide options |
| `as` | `'a' \| 'div'` | Override tag (default: `'a'` if href, else `'div'`) |
| `...rest` | `HTMLAttributes` | Any element attribute |

## Programmatic usage

```ts
import { Spotlight } from 'react-spotlight-gallery';

Spotlight.show(
  [
    { src: '/gallery/1.jpg', title: 'Slide 1', description: 'Description' },
    { src: '/gallery/2.jpg', title: 'Slide 2' },
  ],
  {
    control: ['page', 'fullscreen', 'close', 'prev', 'next'],
    infinite: true,
    fit: 'cover',
  }
);
```

## Options

### SpotlightItemOptions

| Option | Type | Default | Description |
|---|---|---|---|
| `src` | `string \| HTMLElement` | — | Image URL or DOM node |
| `media` | `'image' \| 'video' \| 'node'` | `'image'` | Media type |
| `title` | `string \| false` | — | Slide title |
| `description` | `string \| false` | — | Slide description |
| `fit` | `'contain' \| 'cover'` | `'cover'` | Image fit |
| `theme` | `string \| false` | — | `'white'` or default dark |
| `animation` | `string \| string[]` | — | `'slide'`, `'fade'`, `'scale'`, `'custom'`, or array |
| `control` | `string \| string[]` | — | Toolbar buttons (see below) |
| `autohide` | `boolean \| number \| 'all'` | `true` | `false` = always visible, `true` = hide after inactivity, `'all'` = hide arrows too |
| `infinite` | `boolean` | `false` | Wrap around at ends |
| `preload` | `boolean` | `false` | Preload next slide |
| `spinner` | `boolean` | `true` | Loading spinner |
| `autoplay` | `boolean` | `false` | Video autoplay |
| `autoslide` | `boolean \| number` | `false` | Auto-advance in ms |
| `poster` | `string` | — | Video poster image |
| `button` | `string \| false` | — | Custom button label |
| `buttonHref` | `string` | — | Custom button href or JS |
| `download` | `boolean` | `false` | Download button |
| `zoom` | `boolean` | `false` | Enable zoom |
| `zoom-in` | `boolean` | `false` | Zoom in button |
| `zoom-out` | `boolean` | `false` | Zoom out button |
| `progress` | `boolean` | `false` | Progress bar |

### SpotlightGroupOptions

Extends `SpotlightItemOptions` plus:

| Option | Type | Description |
|---|---|---|
| `index` | `number` | Slide to open (1-based) |
| `onshow` | `(index: number) => void` | Gallery opened |
| `onclose` | `(index?: number) => void` | Gallery closed |
| `onchange` | `(index: number, options) => void` | Slide changed |
| `onclick` | `(index: number, options) => void` | Slide clicked |

### `control` values

String or array of: `'info'`, `'page'`, `'theme'`, `'fullscreen'`, `'autofit'`, `'zoom-in'`, `'zoom-out'`, `'close'`, `'download'`, `'play'`, `'prev'`, `'next'`

```ts
control: ['page', 'close', 'prev', 'next']
```

### Arrows

The side arrows (`.spl-prev` / `.spl-next`) appear when the toolbar is visible.

```ts
// arrows always visible
{ autohide: false }

// arrows hide with toolbar after inactivity
{ autohide: true }

// prev/next also as toolbar buttons
{ control: ['prev', 'next', 'close'] }
```

## API

```ts
Spotlight.show(gallery, options?, index?)
Spotlight.close()
Spotlight.next()
Spotlight.prev()
Spotlight.goto(slide)          // 1-based
Spotlight.zoom(factor?)
Spotlight.fullscreen(state?)
Spotlight.autofit(state?)
Spotlight.menu(state?)
Spotlight.play(state?)
Spotlight.theme(value?)
Spotlight.download()
Spotlight.addControl(name, fn) // returns the button element
Spotlight.removeControl(name)
```

## Video

```tsx
<SpotlightItem
  options={{
    media: 'video',
    'src-mp4': 'https://example.com/video.mp4',
    'src-webm': 'https://example.com/video.webm',
    autoplay: false,
    poster: 'gallery/poster.jpg',
  }}
>
  <img src="gallery/poster.jpg" alt="Video" />
</SpotlightItem>
```

## Embed HTML (node)

```tsx
<SpotlightItem options={{ media: 'node', src: '#content' }}>
  <img src="thumb.jpg" alt="" />
</SpotlightItem>

<div style={{ display: 'none' }}>
  <div id="content">
    <p>Any HTML here</p>
  </div>
</div>
```

## Custom controls

```ts
Spotlight.show(gallery, {
  onshow() {
    Spotlight.addControl('like', function() {
      console.log('liked!');
    });
  },
  onclose() {
    Spotlight.removeControl('like');
  },
});
```

## Next.js

Add `'use client'` to any component using this library.
