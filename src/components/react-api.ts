import React from 'react';  
import spotlight from '../spotlight'; 
import type { SpotlightGroupOptions, SpotlightItemOptions } from '../types'; 
 
export interface SpotlightGroupProps extends React.HTMLAttributes<HTMLDivElement> { 
  options?: SpotlightGroupOptions; 
} 
 
export interface SpotlightItemProps extends React.HTMLAttributes<HTMLElement> { 
  href?: string; 
  options?: SpotlightItemOptions; 
  as?: 'a' | 'div'; 
} 
 
function toDataOptions(options?: Record<string, unknown>){ 
  var result: Record<string, string> = {}; 
  if(!options){ return result; } 
  Object.keys(options).forEach(function(key){ 
    var value = options[key as keyof typeof options]; 
    if(value === undefined || value === null){ return; } 
    var normalized = key === 'buttonHref' ? 'button-href' : key.replace(/[A-Z]/g, function(m){ return '-' + m.toLowerCase(); }); 
    result['data-' + normalized] = String(value); 
  }); 
  return result; 
} 
 
export function SpotlightGroup(props: SpotlightGroupProps){ 
  var data = toDataOptions(props.options as Record<string, unknown>); 
  var className = props.className ? 'spotlight-group ' + props.className : 'spotlight-group'; 
  var p = Object.assign({}, data, props, { className: className }); 
  delete (p as any).options; 
  return React.createElement('div', p, props.children); 
} 
 
export function SpotlightItem(props: SpotlightItemProps){ 
  var data = toDataOptions(props.options as Record<string, unknown>); 
  var className = props.className ? 'spotlight ' + props.className : 'spotlight'; 
  var tag = props.as || (props.href ? 'a' : 'div'); 
  var p: any = Object.assign({}, data, props, { className: className }); 
  delete p.options; 
  delete p.as; 
  return React.createElement(tag, p, props.children); 
} 
 
export function useSpotlight(){ return spotlight; } 
export function showSpotlight(gallery: SpotlightItemOptions[], options?: SpotlightGroupOptions, index?: number){ spotlight.show(gallery, options, index); } 
export function closeSpotlight(){ spotlight.close(); }
