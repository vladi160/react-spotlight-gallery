import React, { useMemo, useState } from 'react';
import { Spotlight, SpotlightGroup, SpotlightItem } from '../../src';
import '../../src/styles/spotlight.min.css';
import './demo-style.css';
import './app.css';

const apiGallery = [
  {
    title: 'Lorem ipsum dolor sit amet',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
    src: '/gallery/london-1758181.jpg',
    button: 'Download Image',
    onclick: () => Spotlight.download(),
    like: false
  },
  {
    title: 'At vero eos et accusam',
    description: 'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    src: '/gallery/sea-1975403.jpg',
    button: 'Next Slide',
    onclick: () => Spotlight.next(),
    like: false
  },
  {
    title: 'Duis autem vel eum iriure dolor',
    description: 'In hendrerit in vulputate velit esse molestie consequat.',
    src: '/gallery/newport-beach-2089906.jpg',
    button: 'Close Gallery',
    onclick: () => Spotlight.close(),
    like: false
  }
];

type BoolMap = Record<string, boolean>;
const controls = ['info', 'page', 'theme', 'fullscreen', 'autofit', 'zoom-in', 'zoom-out', 'close', 'download', 'play', 'prev', 'next'];
const animations = ['slide', 'fade', 'scale', 'custom'];

function makeState(values: string[], active: string[]): BoolMap {
  const map: BoolMap = {};
  values.forEach((value) => {
    map[value] = active.includes(value);
  });
  return map;
}

export default function App() {
  const [controlState, setControlState] = useState<BoolMap>(makeState(controls, ['info', 'page', 'theme', 'fullscreen', 'close', 'download', 'play', 'prev', 'next']));
  const [animationState, setAnimationState] = useState<BoolMap>(makeState(animations, ['slide', 'fade']));
  const [autoplay, setAutoplay] = useState(true);
  const [infinite, setInfinite] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const [preload, setPreload] = useState(true);
  const [autohide, setAutohide] = useState<'false' | 'true' | 'all'>('true');
  const [fit, setFit] = useState<'cover' | 'contain'>('cover');
  const [theme, setTheme] = useState<string>('');

  const selectedControls = useMemo(() => Object.keys(controlState).filter((key) => controlState[key]), [controlState]);
  const selectedAnimations = useMemo(() => Object.keys(animationState).filter((key) => animationState[key]), [animationState]);

  function toggleControl(value: string) {
    setControlState((prev) => ({ ...prev, [value]: !prev[value] }));
  }

  function toggleAnimation(value: string) {
    setAnimationState((prev) => ({ ...prev, [value]: !prev[value] }));
  }

  function showGallery(index: number) {
    let like: HTMLElement | undefined;
    let slide = 0;

    function likeHandler(this: HTMLElement) {
      const currentLikeState = !apiGallery[slide].like;
      apiGallery[slide].like = currentLikeState;
      this.classList.toggle('on');
    }

    Spotlight.show(apiGallery as any, {
      class: 'only-this-gallery',
      index,
      control: selectedControls,
      animation: selectedAnimations,
      autoplay,
      infinite,
      spinner,
      preload,
      autohide,
      fit,
      theme,
      onshow() {
        like = Spotlight.addControl('like', likeHandler);
      },
      onchange(idx: number) {
        slide = idx - 1;
        like?.classList.toggle('on', Boolean(apiGallery[slide].like));
      },
      onclose() {
        Spotlight.removeControl('like');
      }
    } as any);
  }

  return (
    <main>
      <header className="demo-header">
        <h1 className="brand-title">react-spotlight-gallery</h1>
        <p className="brand-subtitle">React + TypeScript Spotlight gallery with original interactions.</p>
        <nav className="demo-links">
          <a href="https://github.com/vladi160/react-spotlight-gallery" target="_blank" rel="noreferrer">Github</a>
          <a href="https://www.npmjs.com/package/react-spotlight-gallery" target="_blank" rel="noreferrer">NPM</a>
        </nav>
      </header>

      <section className="install-section">
        <h2>Install</h2>
        <pre><code>npm install react-spotlight-gallery</code></pre>
      </section>

      <hr />

      <section>
        <h2>Anchors &amp; Images</h2>
      <SpotlightGroup options={{ fit: 'cover', autohide: 'all' }}>
        <SpotlightItem
          href="/gallery/brooklyn-bridge-1791001.jpg"
          options={{
            button: 'Click Me!',
            buttonHref: "javascript:alert('You can open an URL or execute some Javascript here.')",
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
          }}
        >
          <img src="/gallery/brooklyn-bridge-1791001-thumb.jpg" alt="Lorem ipsum dolor sit amet" />
        </SpotlightItem>
        <SpotlightItem href="/gallery/california-1751455.jpg" options={{ description: 'Stet clita kasd gubergren, no sea takimata sanctus est.' }}>
          <img src="/gallery/california-1751455-thumb.jpg" alt="At vero eos et accusam" />
        </SpotlightItem>
        <SpotlightItem href="/gallery/canada-2340312.jpg" options={{ description: 'In hendrerit in vulputate velit esse molestie consequat.' }}>
          <img src="/gallery/canada-2340312-thumb.jpg" alt="Duis autem vel eum iriure dolor" />
        </SpotlightItem>
      </SpotlightGroup>
      </section>

      <section>
        <h2>Custom Elements, Videos &amp; Node Fragments</h2>
      <SpotlightGroup>
        <SpotlightItem as="div" options={{ media: 'image', src: '/gallery/godafoss-1840758.jpg' }}>
          <img src="/gallery/godafoss-1840758-thumb.jpg" alt="Duis autem vel eum iriure dolor" />
        </SpotlightItem>
        <SpotlightItem
          options={{
            media: 'video',
            'src-webm': 'https://nextapps.de/video/spotlight/big_buck_bunny.webm',
            'src-ogg': 'https://nextapps.de/video/spotlight/big_buck_bunny.ogv',
            'src-mp4': 'https://nextapps.de/video/spotlight/big_buck_bunny.mp4',
            autoplay: false,
            poster: '/gallery/poster.jpg'
          }}
        >
          <img src="/gallery/poster.jpg" alt="Video Poster" />
        </SpotlightItem>
        <SpotlightItem options={{ media: 'node', src: '#fragment' }}>
          <img src="/gallery/brooklyn-bridge-1791001-thumb.jpg" alt="" />
          <img src="/gallery/california-1751455-thumb.jpg" alt="" />
          <img src="/gallery/montana-1829251-thumb.jpg" alt="" />
        </SpotlightItem>
      </SpotlightGroup>

      <div style={{ display: 'none' }}>
        <div id="fragment" style={{ width: '100%' }}>
          <b>Embedded Node Fragment</b>
          <br />
          <br />
          <img className="image" src="/gallery/brooklyn-bridge-1791001-thumb.jpg" width={500} height={334} />
          <img className="image" src="/gallery/california-1751455-thumb.jpg" width={500} height={333} />
          <img className="image" src="/gallery/montana-1829251-thumb.jpg" width={500} height={331} />
        </div>
      </div>
      </section>

      <hr />

      <section>
      <h2>API Call</h2>
      <p>Choose controls (toolbar):</p>
      <div id="control">
        {controls.map((value) => (
          <label key={value}>
            <input type="checkbox" checked={controlState[value]} onChange={() => toggleControl(value)} />
            {value}
          </label>
        ))}
      </div>
      <p>Choose modifiers:</p>
      <div id="modifier">
        <label><input type="checkbox" checked={autoplay} onChange={() => setAutoplay((v) => !v)} />Autoplay</label>
        <label><input type="checkbox" checked={infinite} onChange={() => setInfinite((v) => !v)} />Infinite Slide</label>
        <label><input type="checkbox" checked={spinner} onChange={() => setSpinner((v) => !v)} />Spinner</label>
        <label><input type="checkbox" checked={preload} onChange={() => setPreload((v) => !v)} />Preload Next</label>
        <br />
        <label><input type="radio" name="autohide" checked={autohide === 'false'} onChange={() => setAutohide('false')} />Autohide: Off</label>
        <label><input type="radio" name="autohide" checked={autohide === 'true'} onChange={() => setAutohide('true')} />Autohide: Controls</label>
        <label><input type="radio" name="autohide" checked={autohide === 'all'} onChange={() => setAutohide('all')} />Autohide: All</label>
        <br />
        <label><input type="radio" name="fit" checked={fit === 'cover'} onChange={() => setFit('cover')} />Autofit: Cover</label>
        <label><input type="radio" name="fit" checked={fit === 'contain'} onChange={() => setFit('contain')} />Autofit: Contain</label>
        <br />
        <label><input type="radio" name="theme" checked={theme === ''} onChange={() => setTheme('')} />Theme: default</label>
        <label><input type="radio" name="theme" checked={theme === 'white'} onChange={() => setTheme('white')} />Theme: white</label>
      </div>
      <p>Choose animation:</p>
      <div id="animation">
        {animations.map((value) => (
          <label key={value}>
            <input type="checkbox" checked={animationState[value]} onChange={() => toggleAnimation(value)} />
            {value}
          </label>
        ))}
      </div>

      <div className="api-buttons">
      <div className="image" style={{ height: 'auto', margin: '0 1vmin' }}>
        <button onClick={() => showGallery(1)}>Show</button>
      </div>
      <div className="image" style={{ height: 'auto', margin: '0 1vmin' }}>
        <button onClick={() => showGallery(2)}>Show</button>
      </div>
      <div className="image" style={{ height: 'auto', margin: '0 1vmin' }}>
        <button onClick={() => showGallery(3)}>Show</button>
      </div>
      </div>
      <div>
        <div className="image" style={{ backgroundImage: 'url(/gallery/london-1758181-thumb.jpg)' }} />
        <div className="image" style={{ backgroundImage: 'url(/gallery/sea-1975403-thumb.jpg)' }} />
        <div className="image" style={{ backgroundImage: 'url(/gallery/newport-beach-2089906-thumb.jpg)' }} />
      </div>
      </section>
    </main>
  );
}
