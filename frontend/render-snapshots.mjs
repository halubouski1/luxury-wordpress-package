import React from 'react';import {renderToStaticMarkup} from 'react-dom/server';import {WPApp,StaticHeader,SiteFooter} from './ssr/render.js';import fs from 'node:fs';
const dir='../theme/luxury-apart-hotel/snapshots';fs.mkdirSync(dir,{recursive:true});
for(const view of ['home','about','owners','contact','experiences','guides']){fs.writeFileSync(`${dir}/${view}.html`,renderToStaticMarkup(React.createElement(WPApp,{view})));}
fs.writeFileSync(`${dir}/header.html`,renderToStaticMarkup(React.createElement(StaticHeader)));fs.writeFileSync(`${dir}/footer.html`,renderToStaticMarkup(React.createElement(SiteFooter)));
const css='../theme/luxury-apart-hotel/assets/app/luxury.css';fs.writeFileSync(css,fs.readFileSync(css,'utf8').replace(/([\"'(])\/fonts\//g,'$1../fonts/'));
console.log('Six server fallback pages and shared chrome generated; portable font URLs written.');
