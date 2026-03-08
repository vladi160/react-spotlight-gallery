export type SpotlightMedia = 'image' | 'video' | 'node';  
 
export interface SpotlightItemOptions { 
  src?: string | HTMLElement; 
  media?: SpotlightMedia; 
  title?: string | false; 
  description?: string | false; 
  class?: string; 
  fit?: 'contain' | 'cover'; 
  preload?: boolean; 
  spinner?: boolean; 
  theme?: string | false; 
  animation?: string | string[]; 
  control?: string | string[]; 
  button?: string | false; 
  buttonHref?: string; 
  download?: boolean; 
  autoplay?: boolean; 
  controls?: boolean; 
  inline?: boolean; 
  muted?: boolean; 
  poster?: string; 
  autoslide?: boolean | number; 
  autohide?: boolean | number | 'all'; 
  infinite?: boolean; 
  progress?: boolean; 
  page?: boolean; 
  fullscreen?: boolean; 
  zoom?: boolean; 
  'zoom-in'?: boolean; 
  'zoom-out'?: boolean; 
  close?: boolean; 
  play?: boolean | number; 
  autofit?: boolean; 
  [key: string]: unknown; 
} 
 
export interface SpotlightGroupOptions extends SpotlightItemOptions { 
  index?: number; 
  onshow?: (index: number) => void;
  onclose?: (index?: number) => void;
  onchange?: (index: number, options: SpotlightItemOptions) => void;
  onclick?: (index: number, options: SpotlightItemOptions) => void;
} 
 
export interface SpotlightApi { 
  init(): void; 
  show(gallery: SpotlightItemOptions[], options?: SpotlightGroupOptions, index?: number): void; 
  close(hashchange?: boolean): void; 
  next(): void; 
  prev(): void; 
  goto(slide: number): void; 
  zoom(factor?: number): void; 
  menu(state?: boolean): void; 
  play(state?: boolean): void; 
  theme(value?: string): void; 
  fullscreen(state?: boolean): void; 
  autofit(state?: boolean): void; 
  download(): void; 
  addControl(name: string, fn: (event: Event) => void): HTMLElement;
  removeControl(name: string): void; 
}
