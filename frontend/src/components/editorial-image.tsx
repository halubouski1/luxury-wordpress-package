export function EditorialImage({name,alt,priority=false,sizes="100vw"}:{name:string;alt:string;priority?:boolean;sizes?:string}){
 if(/^https?:\/\//.test(name))return <img src={name} alt={alt} width={1200} height={900} loading={priority?"eager":"lazy"} decoding="async" sizes={sizes}/>;
 const hero=name==="batumi-hero",final=name==="batumi-final";
 const newScenes:Record<string,[number,number]>={"experiences-overlook":[2400,1600],"experiences-sunset":[2400,1600],"about-waterfront":[2400,1600],"owners-night":[2000,1333],"owners-orbi":[1672,941],"gudauri-dusk":[2400,1523]};
 if(newScenes[name]){
  const [width,height]=newScenes[name],portrait=name==="experiences-sunset"||name==="about-waterfront";
  const photo=<img data-photo={name} src={`/images/${name}.webp`} srcSet={`${portrait?"":`/images/${name}-small.webp 640w, `}/images/${name}-medium.webp 1440w, /images/${name}.webp ${width}w`} sizes={sizes} width={width} height={height} alt={alt} loading={priority?"eager":"lazy"} fetchPriority={priority?"high":undefined} decoding="async"/>;
  return portrait?<picture style={{display:"contents"}}><source media="(max-width:699px)" srcSet={`/images/${name}-small.webp 640w, /images/${name}-mobile.webp 960w`} sizes="100vw"/>{photo}</picture>:photo;
 }
 const dimensions:Record<string,[number,number]>={"batumi-old-town":[1220,698],"batumi-garden":[1024,741],"gudauri-mountains":[1017,443],"tbilisi-dusk":[2400,1590],"travel-zanzibar":[1200,900],"travel-island":[1200,900],"travel-city":[1200,900]};
 const [width,height]=dimensions[name]??(hero?[2400,1400]:final?[1920,1280]:[1200,1500]);
 const small=name==="tbilisi-dusk"?`${name}-medium`:hero||final?`${name}-medium`:`${name}-small`;
 return <img src={`/images/${name}.webp`} srcSet={`/images/${small}.webp ${name==="tbilisi-dusk"?1440:hero?1600:final?1400:640}w, /images/${name}.webp ${width}w`} sizes={sizes} width={width} height={height} alt={alt} loading={priority?"eager":"lazy"} fetchPriority={priority?"high":undefined} decoding="async"/>;
}
