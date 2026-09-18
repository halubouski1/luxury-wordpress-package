import { ArrowUpRight } from "lucide-react";
import { InnerShell } from "@/components/inner-shell";
import { ExperienceHero } from "@/components/experience-hero";
import { ScrollChapter } from "@/components/scroll-chapter";
import { ExperienceCollection } from "@/components/experience-collection";
import { experienceCollections,experienceServices } from "@/lib/experience-services";
export const metadata={title:"Experiences | Luxury Apart Hotel",description:"Holidays Abroad, Georgia Tours, Custom Trip and Concierge Service. Explore our travel collection."};
export default function ExperiencesPage(){return <InnerShell current="/experiences/" immersiveHero>
 <ExperienceHero/>
 <div className="experience-collections section-wrap" id="explore">{experienceCollections.map((collection,index)=><ExperienceCollection key={collection.id} {...collection} index={index} articles={collection.slugs.map(slug=>experienceServices.find(article=>article.slug===slug)!)}/>)}</div>
 <section className="experience-help section-wrap" data-reveal><p className="eyebrow">THE PRACTICAL SIDE</p><h2>We’re here<br/><em>when you need us.</em></h2><div><p>Need help with your arrival or a private transfer? Talk to our team about available options and confirmed pricing.</p><a className="text-link" href="mailto:info@luxuryaparthotel.ge?subject=Help%20planning%20my%20stay">Ask our team<ArrowUpRight size={18}/></a><a className="text-link" href="/guides-insights/batumi-stay-guide/">Read the Batumi stay guide<ArrowUpRight size={18}/></a></div></section>
 <ScrollChapter closing label="MORE THAN A DESTINATION" title="Go out. Get lost." italic="Feel at home." secondTitle="Your own place" secondItalic="in Batumi." image="experiences-sunset" alt="Evening sunlight on the waves and pebbles of Batumi beach" href="https://luxuryaparthotel.ge/apartments/" action="Book an apartment"/>
 </InnerShell>;}
