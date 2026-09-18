import { ArrowUpRight } from "lucide-react";
import { InnerShell } from "@/components/inner-shell";
import { EditorialImage } from "@/components/editorial-image";
import { ExperienceCollection } from "@/components/experience-collection";
import { guides } from "@/lib/editorial";
export const metadata={title:"Guides & Insights | Luxury Apart Hotel",description:"Practical guides for guests and property owners: Batumi, New Gudauri and the details of a considered stay."};
export default function GuidesPage(){const featured=guides[0];const card=(article:typeof guides[number])=>({slug:article.slug,title:article.title,eyebrow:article.category,description:article.summary,image:article.image,alt:article.alt});return <InnerShell current="/guides-insights/">
 <header className="journal-heading section-wrap"><p className="eyebrow">GUIDES & INSIGHTS / LOCAL KNOWLEDGE</p><h1>Plan better.<br/><em>Stay inspired.</em></h1><div><p>Practical guides for guests, property owners and investors in Georgia.</p><span className="journal-edition">THE LUXURY APART HOTEL JOURNAL</span></div></header>
 {featured&&<section className="journal-feature section-wrap"><a href={`/guides-insights/${featured.slug}/`} className="journal-feature-photo" aria-label={`Read ${featured.title}`}><EditorialImage name={featured.image} alt={featured.alt} priority sizes="(max-width:700px) 100vw, 65vw"/></a><div className="journal-feature-copy"><p className="eyebrow">{featured.title==="The Batumi stay guide"?"THE DESTINATION EDIT / BATUMI":featured.category}</p><span className="feature-index" aria-hidden="true">01</span><h2>{featured.title==="The Batumi stay guide"?<>Get to know<br/><em>your kind of Batumi.</em></>:featured.title}</h2><p>{featured.summary}</p><a className="text-link" href={`/guides-insights/${featured.slug}/`}>Read the guide<ArrowUpRight size={18}/></a></div></section>}
 <div className="guide-collections section-wrap">
  <ExperienceCollection id="local-knowledge" title="A little local knowledge" heading={<>A little local <em>knowledge.</em></>} eyebrow="PLAN BETTER. INVEST SMARTER." description="From your first visit to your next property conversation." basePath="guides-insights" articles={guides.filter(article=>article.category!=="Our hospitality").map(card)}/>
  <ExperienceCollection id="behind-the-stay" title="Care, explained" heading={<>Care, <em>explained.</em></>} eyebrow="BEHIND THE STAY" description="The everyday details behind a considered stay." basePath="guides-insights" articles={guides.filter(article=>article.category==="Our hospitality").map(card)}/>
 </div>
 <section className="journal-signoff section-wrap" data-reveal><p className="eyebrow">FROM READING TO BEING THERE</p><h2>Make room for<br/><em>something memorable.</em></h2><a className="button" href="/experiences/">Explore experiences<ArrowUpRight size={19}/></a></section>
 </InnerShell>;}
