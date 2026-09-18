import {createRoot} from 'react-dom/client';import {WPApp} from './wp-app';
import './app/globals.css';import './app/scroll-scenes.css';import 'lenis/dist/lenis.css';import './app/brand-motion.css';import './app/editorial.css';import './app/collection-updates.css';import './app/property-quiz.css';import './app/experience-collections.css';import './wp.css';
const root=document.getElementById('luxury-app');if(root){
 const r=document.documentElement,m=matchMedia('(prefers-reduced-motion: reduce)').matches;r.dataset.scrollScenes=m?'off':'on';
 const n=performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming|undefined;
 if(window.LUXURY_WP?.view==='home'&&!m&&!location.hash&&scrollY<2&&n?.type!=='back_forward'){r.dataset.intro='waiting';setTimeout(()=>{delete r.dataset.intro;window.dispatchEvent(new Event('luxury:intro-finished'));},6000);}
 root.classList.remove('wp-fallback');createRoot(root).render(<WPApp/>);
}
