import { InnerShell } from "@/components/inner-shell";
import { ScrollChapter } from "@/components/scroll-chapter";
import { PropertyQuiz } from "@/components/property-quiz";
import { OwnerProcess } from "@/components/owner-process";
import { OwnerEnquiryForm } from "@/components/owner-enquiry";
import { EditorialImage } from "@/components/editorial-image";
export const metadata={title:"Property Management for Owners | Luxury Apart Hotel",description:"Marketing, reservations, guest service, housekeeping, property control and monthly reporting for apartment owners in Georgia."};

export default function OwnersPage(){return <InnerShell current="/for-owners/">
 <ScrollChapter label="FOR PROPERTY OWNERS" title="Your property." italic="Professionally managed." image="owners-orbi" alt="Architectural visualization of Orbi City’s exterior beside the promenade at dusk" description="We manage marketing, reservations, guest service, housekeeping, property control and monthly reporting." secondTitle="Your peace of mind." secondItalic="Our everyday work." href="#property-assessment" action="Request a property assessment" caption="PROPERTY MANAGEMENT / GEORGIA"/>
 <section className="owners-introduction editorial-section section-wrap" data-reveal><p className="eyebrow">ONE PROPERTY. ONE CONNECTED TEAM.</p><h2>From the first conversation<br/><em>to the everyday details.</em></h2><p>A clear sequence of care, built around the responsibilities of hosting. Explore the five stages of our property management service.</p></section>
 <PropertyQuiz/>
 <section className="section-wrap owner-process-section" aria-label="The five stages of property management"><OwnerProcess/></section>
 <section className="owner-enquiry-section" id="assessment" aria-labelledby="owner-enquiry-title"><div className="owner-enquiry-photo"><EditorialImage name="owners-night" alt="Batumi’s contemporary architecture at night"/></div><div className="owner-enquiry-shade"/><div className="owner-enquiry-layout section-wrap"><div className="owner-enquiry-copy"><p className="eyebrow">LUXURY APART HOTEL / SINCE 2015</p><h2 id="owner-enquiry-title">Your property.<br/><em>Our full attention.</em></h2><p>Let’s talk about your property and the care it needs. Leave your details to start the conversation.</p><a href="tel:+995555907333">+995 555 907 333</a></div><OwnerEnquiryForm/></div></section>
 </InnerShell>;}
