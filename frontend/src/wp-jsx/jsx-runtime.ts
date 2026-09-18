import {jsx as reactJsx,jsxs as reactJsxs,Fragment} from 'react/jsx-runtime';
import {wpUrl} from '../wp-data';
function mapped(type:any,props:any){if(typeof type!=='string'||!props)return props;const next={...props};for(const key of ['href','src','poster'])if(typeof next[key]==='string')next[key]=wpUrl(next[key]);if(typeof next.srcSet==='string')next.srcSet=next.srcSet.replace(/\/images\/[^\s,]+/g,wpUrl);return next;}
export {Fragment};
export const jsx=(type:any,props:any,key?:any)=>reactJsx(type,mapped(type,props),key);
export const jsxs=(type:any,props:any,key?:any)=>reactJsxs(type,mapped(type,props),key);
