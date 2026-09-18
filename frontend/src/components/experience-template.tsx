import { ArrowLeft,ArrowUpRight } from "lucide-react";
import { EditorialImage } from "@/components/editorial-image";
import { InnerShell } from "@/components/inner-shell";
import type { ExperienceService } from "@/lib/experience-services";
export function ExperienceTemplate({service}:{service:ExperienceService}){return <InnerShell current="/experiences/">
 <header className="service-template-heading section-wrap"><a className="article-back" href="/experiences/"><ArrowLeft size={16}/>All experiences</a><p className="eyebrow">{service.eyebrow}</p><h1>{service.title}</h1><p>{service.description}</p><span className="service-coming-soon">Details coming soon</span></header>
 {service.image&&<div className="section-wrap"><figure className="service-article-cover"><EditorialImage name={service.image} alt={service.alt||service.title}/></figure></div>}
 <div className="service-template-body section-wrap"><div className="service-template-sections">{service.sections.map((title,i)=><section key={title}><span className="eyebrow">0{i+1}</span><div><h2>{title}</h2><p>Details will be added soon.</p></div></section>)}</div><aside className="service-template-enquiry"><p className="eyebrow">LET’S TALK</p><h2>Have something<br/><em>in mind?</em></h2><p>Contact our team for enquiries about {service.title.toLowerCase()}.</p><a className="button" href={`mailto:info@luxuryaparthotel.ge?subject=${encodeURIComponent(service.title+" enquiry")}`}>Enquire by email<ArrowUpRight size={18}/></a><a className="text-link" href="/contact-us/">All contact details<ArrowUpRight size={16}/></a></aside></div>
 </InnerShell>;}
