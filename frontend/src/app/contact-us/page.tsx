import { ArrowUpRight } from "lucide-react";
import { InnerShell } from "@/components/inner-shell";

export const metadata={title:"Contact Us | Luxury Apart Hotel",description:"Get in touch with Luxury Apart Hotel in Batumi and New Gudauri. Telephone, email and addresses."};
const original="https://luxuryaparthotel.ge";

export default function ContactPage(){return <InnerShell current="/contact-us/" showFooter={false}>
 <section className="contact-screen section-wrap" aria-labelledby="contact-title">
  <div className="contact-composition">
   <header className="contact-heading"><p className="eyebrow">CONTACT US</p><h1 id="contact-title">Let’s start<br/><em>a conversation.</em></h1><p>Your next stay. Your property.<br/>We’re here to help.</p></header>
   <div className="contact-details">
    <div className="contact-direct"><div><p className="eyebrow">CALL US</p><a href="tel:+995555907333">+995 555 907 333<ArrowUpRight size={23}/></a></div><div><p className="eyebrow">WRITE TO US</p><a href="mailto:info@luxuryaparthotel.ge">info@luxuryaparthotel.ge<ArrowUpRight size={23}/></a></div></div>
    <div className="contact-locations"><div><h2>Batumi</h2><address>Sherif Khimshiashvilis 7d<br/>Orbi City, Georgia</address><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Orbi%20City%207d%20Sherif%20Khimshiashvili%20Batumi%20Georgia" target="_blank" rel="noopener noreferrer">View on map<ArrowUpRight size={16}/></a></div><div><h2>New Gudauri</h2><address>Redco New Gudauri<br/>Gudauri 4702, Georgia</address><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Redco%20New%20Gudauri%204702%20Georgia" target="_blank" rel="noopener noreferrer">View on map<ArrowUpRight size={16}/></a></div></div>
   </div>
  </div>
  <footer className="contact-bottom"><span>© {new Date().getFullYear()} Luxury Apart Hotel</span><nav aria-label="Legal information"><a href={`${original}/privacy-policy/`}>Privacy &amp; cookies</a><a href={`${original}/booking-and-payment-terms/`}>Booking &amp; payment</a><a href={`${original}/terms-conditions/`}>Terms &amp; conditions</a><a href={`${original}/booking-cancellation-and-refund-policy/`}>Cancellation &amp; refunds</a></nav></footer>
 </section>
 </InnerShell>;}
