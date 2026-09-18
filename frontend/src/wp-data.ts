import type {EditorialArticle} from './lib/editorial';
import type {ExperienceService} from './lib/experience-services';
export type WPData={view:string;assetBase:string;homeUrl:string;links:Record<string,string>;guides:EditorialArticle[];outings:EditorialArticle[];experiences:ExperienceService[];collections:{id:string;title:string;description:string;slugs:string[]}[];article?:{title:string;category:string;summary:string;image:string;alt:string;html:string;kind:string;layout:string;lead:string;sections:{id:string;title:string;html:string}[]};page?:{title:string;html:string}};
declare global{interface Window{LUXURY_WP?:WPData}}
export const wpData=typeof window!=='undefined'?window.LUXURY_WP:undefined;
export function wpUrl(value:string){const d=wpData;if(!d)return value;if(value.startsWith('/images/')||value.startsWith('/fonts/')||value==='/favicon.svg')return d.assetBase+value;if(value.startsWith('/')&&!value.startsWith('//')){const [path,hash]=value.split('#');return (d.links[path]||d.homeUrl.replace(/\/$/,'')+path)+(hash?'#'+hash:'');}return value;}
