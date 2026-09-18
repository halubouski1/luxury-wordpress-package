import "./globals.css";
import "./scroll-scenes.css";
import "lenis/dist/lenis.css";
import "./brand-motion.css";
import "./editorial.css";
import "./collection-updates.css";
import "./property-quiz.css";
import "./experience-collections.css";
export const metadata: Metadata = {
 title: "Luxury Apart Hotel | Thoughtful Stays in Batumi & New Gudauri",
 description: "Your own space. Hotel-level care. Discover apartments in Batumi and New Gudauri, with in-house hospitality and property management since 2015.",
 icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" }
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{var r=document.documentElement,m=matchMedia("(prefers-reduced-motion: reduce)").matches;r.dataset.scrollScenes=m?"off":"on";var n=performance.getEntriesByType("navigation")[0];if(location.pathname==="/"&&!m&&!location.hash&&scrollY<2&&(!n||n.type!=="back_forward")){r.dataset.intro="waiting";setTimeout(function(){delete r.dataset.intro;window.dispatchEvent(new Event("luxury:intro-finished"))},6000)}}catch(e){}` }}/><link rel="preload" href="/images/luxury-wordmark.svg" as="image"/><link rel="preload" href="/fonts/instrument-serif.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/><link rel="preload" href="/fonts/instrument-serif-italic.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/><link rel="preload" href="/fonts/manrope.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/></head><body>{children}</body></html>;
}
