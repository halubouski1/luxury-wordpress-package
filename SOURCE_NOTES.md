# Luxury Apart Hotel homepage

## Scope
Standalone hospitality website implemented in the supplied Vinext/React/TypeScript starter. No existing project source or WordPress administration was supplied. The original luxuryaparthotel.ge site is not changed. About, owner services, guides and experiences now have local routes. Booking, apartment-detail and legal routes lead to the existing production website. No substitute checkout, inventory or payment handling is introduced.

## Verified business content — 17 September 2026
- https://luxuryaparthotel.ge/ — two destinations, hotel-level hospitality, in-house housekeeping and laundry, 24/7 guest support, airport/private transfers, high-speed Wi-Fi.
- https://luxuryaparthotel.ge/about-us/ — operating since 2015; Orbi City in Batumi; Four Seasons in New Gudauri; own full-cycle laundry; professional cleaning.
- https://luxuryaparthotel.ge/for-owners/ — marketing, reservations, guest operations, housekeeping, property control, monthly reporting. No financial return claims introduced.
- https://luxuryaparthotel.ge/rooms/orbi-c-41-53/ — live browser: USD 80/night, 45 m², one bedroom, four guests.
- https://luxuryaparthotel.ge/rooms/orbi-a-38-03/ — live browser: USD 130/night, 78 m², two bedrooms, six guests.
- https://luxuryaparthotel.ge/rooms/4-season-f2-4-30/ — live browser: USD 70/night, 33 m², studio, four guests.
Web search cached pages showed different rates. The live rendered property pages were used. Displayed prices are dated snapshots, not a live pricing integration. Seasonal rates and final date-based pricing are disclosed below the collection. Property links always open the original booking pages.
- Main telephone +995 555 907 333 and info@luxuryaparthotel.ge verified on the original site.
- Legal URLs retained from current homepage: privacy-policy, booking-and-payment-terms, terms-conditions, booking-cancellation-and-refund-policy.

## Photography
Real Batumi photography from the free photo results on https://unsplash.com/s/photos/batumi . Commercial reuse under https://unsplash.com/license . Original files visually inspected; responsive WebP derivatives are bundled locally. Images have resizing/cropping, with restrained CSS saturation for visual consistency.
- Hero: Max, https://unsplash.com/photos/R68FdCxFOII ; https://images.unsplash.com/photo-1625566360146-918001e76064 . Black Sea and Batumi waterfront at dusk.
- Guest scene: Orkhan Farmanli, https://unsplash.com/photos/xk0iYZVkkpo ; https://images.unsplash.com/photo-1568490891363-466fe21bede2 . Batumi promenade.
- Owners: Sergio Guardiola Herrador, https://unsplash.com/photos/cFFCeKt_66g . Batumi waterfront architecture.
- Final invitation: Olga Bi, https://unsplash.com/photos/6yvsdu1gwtA ; https://images.unsplash.com/photo-1707765185643-a2c10b5e816a . Batumi evening waterfront.
Photographers credited in the footer. Unsplash attribution is appreciated but not mandatory.

Apartment images were retrieved from their respective original property galleries, as authorised by the homepage redesign brief:
- ORBI C 41/53: /wp-content/uploads/09052025_184732-scaled.jpg
- ORBI A 38/03: /wp-content/uploads/Living-Room-scaled.jpg
- Four Seasons F2 4/30: /wp-content/uploads/09112025_194453-scaled.jpg
- Service-detail photo, ORBI A 38/03: /wp-content/uploads/Bedroom-5-scaled.jpg
All paths above are on https://luxuryaparthotel.ge . Original image rights remain with the hotel/photographers.

## Typography and motion
Locally served Instrument Serif (regular/italic) and Manrope (regular/medium), retrieved from Google Fonts. Natural scroll, native sticky positioning, passive scroll listeners, requestAnimationFrame updates, and IntersectionObserver reveals. Guest-scene progress is derived from current scroll position, so reverse scrolling is supported. Sticky storytelling is disabled below 900px and for reduced motion. Reveal content is visible without JavaScript; prefers-reduced-motion overrides effects. Mobile navigation uses the installed Radix Sheet primitive with focus management and Escape dismissal.

## Validation note
The supervised browser preview service was unavailable in this environment. Source, TypeScript, image integrity and production build checks were used; interactive browser QA should be completed before replacing the original WordPress homepage.

## Scroll choreography update — 17 September 2026

- The wordmark now uses the existing Manrope sans-serif font, uppercase letters and restrained spacing. The favicon uses a simple sans-serif L.
- The opening scene starts at full viewport size with a centred wordmark. A 220svh desktop section (175svh on phones) provides a natural scroll track: the logo fades, the image recedes into its frame, and the offer/menu/actions appear. All state is a function of current geometry, not elapsed time.
- Guest photographs change with paragraph progress: the Batumi coast (a new crop of the already licensed Max photo), an actual ORBI A 38/03 balcony/bedroom (existing hotel photography), and Orkhan Farmanli’s palm-lined Batumi promenade. They are rendered individually alongside their paragraphs on mobile and in reduced-motion mode.
- The closing scene uses the client-supplied file `1003992054.jpeg`. The original attachment is unchanged. Responsive WebP derivatives are bundled with the Site; muted saturation, brightness and a text-contrast overlay are applied in CSS. This replaces the previous Olga Bi night photograph in the visible page.
- The final photograph expands from an inset frame to the whole viewport. The first headline is followed by “Make yourself at home” and the existing booking link. Rewinding the scroll restores earlier states.
- Reduced motion and no-JavaScript layouts expose the offer, menu and booking invitation directly. Invisible interactive groups are made inert; the opening includes a keyboard-accessible scene skip.
- Preview infrastructure remains unavailable; deterministic timeline checks, TypeScript and production compilation provide validation, but do not replace browser/device QA.

## Supplied logo, arrival and scroll refinement
- Integrated the exact client-supplied Group 1261153441.png as public/images/luxury-wordmark.png. Original pixels, lettering and alpha channel are unchanged; the dark interface version uses a CSS brightness filter.
- Applied the mark to the header, opening hero, footer and mobile menu. Arrival mark is 112 CSS pixels wide on desktop and 96 on mobile.
- Added a black arrival screen with seven shutters opening from the center outward. It waits for the hero and logo decoding with a 1.4 second cap and a short 0.5 second minimum; the reveal takes 1.36 seconds. Keyboard navigation skips it, reduced-motion and deep links bypass it, and timeout/bfcache cleanup prevents trapping the page.
- Lenis 1.3.26 smooths wheel input with lerp 0.085 while leaving touch native. It uses the native document scroll so existing reversible sticky scenes remain tied to their actual position. Anchor links preserve URLs and transfer focus; the navigation drawer stops background scroll.
- All filled actions, card arrows, menu controls and the back-to-top control use black backgrounds with white labels and visible keyboard focus.
- User-provided motion references: https://fernandes-media.com/ and https://hawk-style.com/en/. Their public pages were consulted; the opening choreography was built specifically for this site. Library reference: https://github.com/darkroomengineering/lenis.
- TypeScript check passed. The managed preview remains unavailable, so visual browser QA of this revision could not be completed.

## Slower motion and white photo CTAs
- Opening and closing booking buttons now use white backgrounds and dark labels, including distinct hover, active and keyboard-focus states. Other interface actions retain their black treatment.
- Wheel-scroll interpolation changed from 0.085 to 0.05 for a longer, softer coast. Native touch scrolling and reduced-motion behavior are preserved.
- Arrival minimum logo hold increased from 0.5 to 0.8 seconds. Shutters now take 1.5 seconds with delays of 0.27–0.54 seconds; scene release is 2.1 seconds after reveal begins. The ordinary full sequence is approximately 2.9 seconds. Both safety timeouts were extended to accommodate the longer reveal without truncation.

## Requested ORBI hero retouch
- Updated the desktop/tablet opening photograph only: removed the prominent crane in front of ORBI and retouched the exposed upper floors as a finished glass facade matching the adjacent tower. Used built-in ImageGen with the existing hero as the edit target, then exported WebP derivatives at the existing dimensions.
- The mobile crop does not include the main crane or unfinished tower, and is preserved. Other photographs, layout, content and interactions are unchanged.
- This is a requested photographic retouch, not a newly captured documentary image or a verified architectural survey. Original photography attribution remains Max / Unsplash.
- Edit prompt: Remove only the main ORBI crane and complete only the exposed upper-floor facade using matching materials, keeping the original silhouette, scene, lighting, colors, perspective, coastline and all other buildings. No added floors, text or logos.

## Editorial pages — 17 September 2026
- Added About us, Guides & Insights, Experiences and For owners; shared desktop/mobile navigation and footer link to each section.
- About us preserves the original page's content and section sequence, including directions, reasons to choose the company, locations, international presence, guest offers and expansion/mission copy. Empty “Title 0” counters were excluded.
- For owners retains the five original stages: onboarding, marketing, guest operations, quality control and monthly reporting. The original property-assessment route returned 404; the local assessment section provides the verified email address and telephone instead of an unconnected form. No new revenue or yield promises.
- Original Experiences was empty. Added three original self-guided outing articles, supported by Georgia Travel: https://georgia.travel/guide-to-batumi-beach , https://georgia.travel/family-attractions/batumi-piazza and https://georgia.travel/batumi-botanical-garden . No invented tour inventory, reviews, opening times or prices.
- The original guides index linked to three absent pages (batumi-stay-guide, gudauri-winter-guide, owner-rental-income-guide). Created useful articles for these themes and concise articles covering the three existing hospitality stories: comfort-service-at-a-premium-standard, prime-locations-in-batumi-and-gudauri and eco-friendly-amenities-care-in-every-detail. References are linked within articles. Additional sources: https://georgia.travel/things-to-do-in-batumi and https://gudauri.com/about-gudauri/ski-lifts.html .
- New opening/closing scenes interpolate photo framing and two text states from current scroll geometry. Owner operations have a five-stage sticky photo sequence. Mobile/reduced-motion modes retain a readable sequential layout. The arrival preloader remains homepage-only; shared Lenis behavior continues on inner pages.
- Production build and TypeScript checks passed. Static checks verified 14 routes, six guides, three experiences, local article anchors and responsive image variants. Managed browser preview is unavailable; no browser animation/device QA is claimed.

### Additional licensed photographs
- Batumi Piazza, Roberto Strauss, CC BY 2.0: https://commons.wikimedia.org/wiki/File:Batumi_-_Piazza.jpg . Original 1220 × 698; exported as batumi-old-town.webp and a 640px variant.
- Botanical Garden, Archil Kikvadze, CC BY 3.0: https://commons.wikimedia.org/wiki/File:Batumi,_Georgia_%E2%80%94_Botanical_Garden.jpg . Original 1024 × 741; exported as batumi-garden.webp and a 640px variant.
- Gudauri, Paata Liparteliani, CC BY-SA 2.0: https://commons.wikimedia.org/wiki/File:Gudauri_Georgia_Panorama_P.Liparteliani.jpg . Original 1017 × 443; exported as gudauri-mountains.webp and a 640px variant. These image adaptations remain CC BY-SA 2.0.
- Files are locally bundled, resized, cropped by layout and given a restrained CSS colour treatment. Photographer/source/license links and modification notices are in the shared footer. Original images were visually inspected before use.


## Contact and individual page imagery — 17 September 2026
- Added /contact-us/ as a compact single-screen desktop composition, with a naturally flowing mobile layout. Contact details come from the footer of https://luxuryaparthotel.ge/contact-us/: +995 555 907 333, info@luxuryaparthotel.ge (also verified earlier), Batumi Sherif Khimshiashvilis 7d, and Redco New Gudauri 4702. Telephone, email, Maps and legal links are actionable. No unconnected contact form.
- Added Contact us to shared desktop/mobile navigation and changed the footer contact link to the local page. Our apartments now links directly to https://luxuryaparthotel.ge/apartments/ in both menus, without first scrolling to the homepage collection.
- Replaced the five requested images only: Experiences opening/closing, For owners opening/closing, About us opening. Other content, existing scenes and homepage images remain unchanged.
- Experiences opening: Etienne Dayer, https://unsplash.com/photos/JdZ0uKMyUHU , image https://images.unsplash.com/photo-1658604117922-0866fae7d74b . Original 4992x3328, locally exported to 2400/1440/640px WebP. Real elevated panorama of Batumi and Black Sea.
- Experiences closing: Max, https://unsplash.com/photos/HlZB3hTZUdA , image https://images.unsplash.com/photo-1715794545762-1a494c0dffcf . Original 2925x3900. Real Batumi beach sunset. Landscape 2400/1440px and portrait 960/640px WebP variants retain the sunset and waterline.
- About opening: Julia Varenikova, https://unsplash.com/photos/RgLTHgEKr8g , image https://images.unsplash.com/photo-1692960570657-cd1c319a0f29 . Original 2880x3840. Real waterfront skyline viewed from sea, with separate landscape 2400/1440px and portrait 960/640px variants.
- Owners closing: Max, https://unsplash.com/photos/1lc1G8SoVXY , image https://images.unsplash.com/photo-1626473401833-a07f0acbe6ed . Downloaded 2000x1333. Real Batumi night architecture; not labelled Orbi City. Exported at 2000/1440/640px.
- Four photos above use the Unsplash License https://unsplash.com/license . Originals and all selected subjects were visually inspected. Attribution/source links are in footer photography details. Resizing/display cropping and restrained CSS saturation/contrast treatment create a consistent tone; scenes/buildings in these real photographs were not reconstructed.
- Owners opening: one user-authorized built-in ImageGen architectural visualization, 1672x941. Reference: existing Orbi hero, used only for tower architecture. New promenade-level view at dusk with buildings center-right, horizontal balcony bands, dark glass crowns, no cranes/signage. Explicitly identified as AI-generated architectural visualization in image alt text and footer photography details. This is not a documentary photo or verified architectural survey. Locally bundled WebP at 1672/1440/640px.
- Managed browser preview remains unavailable (preview service mailbox missing). TypeScript, production compilation and source/asset checks are used; no browser/device QA is claimed.


## Gudauri, corrected identity, owner form and experience templates — 18 September 2026
- Corrected LUXORY to LUXURY across the shared header, footer, mobile navigation, opening scene and arrival preloader. A single ImageGen edit produced an unusable noisy candidate and was rejected. The final self-contained SVG composes the original clean artwork with its existing second U in the fourth-letter position, using a traced vector knockout for the old O. Original letterforms, weight, subtitle and overall dimensions are retained. Original PNG remains unchanged and is no longer referenced by the application. Corrected SVG was rendered and visually verified.
- Homepage first guest benefit now introduces New Gudauri/Four Seasons and its existing verified proximity to lifts; its sticky and mobile images show Gudauri. Owner management stage05 photo also shows Gudauri as requested.
- New real Gudauri winter-sunset photograph: Kent Tupas, https://unsplash.com/photos/hcnU-vztOcM , original https://images.unsplash.com/photo-1631540356492-e2debf43a836 . Photographer confirms Gudauri View Point. Unsplash License. Original 5661x3592, visually inspected; local WebP variants2400/1440/640px and a900x1200mobile crop. Restrained CSS saturation treatment. Credited in shared footer.
- Homepage slideshow starts with the unchanged current Batumi hero, then Gudauri, then the supplied palm-framed Batumi photograph. Crossfade1.4s, advance6.5s. Location/offer labels follow the photo. Existing geometry-controlled logo/offer/frame animation is retained. Autoplay pauses on user request, offscreen, during arrival and when the document is hidden; reduced-motion users get manual next-photo control. Unloaded frames are not selected by autoplay.
- Owner closing section now contains an always-visible English enquiry form: Name, Email, Phone, City(Tbilisi/Batumi/Gudauri), Property type(Hotel-style apartments/Villas/Hotels). Dropdowns reuse Radix Select. Labels, error focus and validation are provided. The former separate assessment panel was consolidated into this final section; the opening assessment link targets it.
- Form delivery is explicitly “Continue by email”: validated fields populate a mailto draft addressed to the verified hotel email. The visitor must send the email in their email app. No backend delivery, stored enquiry or success confirmation is claimed. Validation and mailto encoding were checked for required fields, enum values and special characters.
- Experiences now presents six editable templates: Georgia Tours, Zanzibar Packages, Airport Transfers, Private Driver, Concierge, Custom Trips. Each has a working local route, four simple English placeholder sections and an enquiry link. No prices, schedules or package inclusions are invented. Content lives in lib/experience-services.ts and components/experience-template.tsx. Existing three self-guided articles remain accessible at their original URLs.
- Managed preview remains unavailable because the supervised preview mailbox is missing. TypeScript/source/asset checks and production compilation are used; no browser/device QA is claimed.

## Owner assessment quiz and Tbilisi slideshow — 18 September 2026
- Removed the visible slideshow counter and pause label. The accessible icon-only pause control now sits with the main actions, clear of the destination caption. Mobile uses a two-row action grid.
- Third homepage slide is now Tbilisi; the first Batumi and second Gudauri photographs are preserved. Tbilisi offer reads “in Georgia” and does not imply available Tbilisi apartment inventory.
- Tbilisi photograph: Dimitri Simonishvili / Pexels, https://www.pexels.com/photo/view-of-the-city-and-the-mtatsminda-park-in-the-background-at-sunset-in-tbilisi-georgia-16192927/ . Original https://images.pexels.com/photos/16192927/pexels-photo-16192927.jpeg , 4928×3264. Pexels License https://www.pexels.com/license/ permits reuse and modification. Locally exported 2400/1440px WebP and 900×1200 portrait crop; restrained CSS saturation and brightness. Photographer credited in footer. Original and mobile crop visually inspected.
- Added a four-step quiz midway through For owners; the opening assessment CTA targets it. Service choices use the information in the user-provided reference: property/rental management, sale, property assessment and investment consultation. Each has distinct detail questions. Country/city, property type, area and contact fields are collected; answers persist when going back. The final step includes an editable review. No financial estimates or performance promises.
- Quiz uses existing Radix radio/select components with keyboard support, labels, progress, error focus, responsive layouts and reduced-motion handling. Delivery remains explicitly an email draft to the verified hotel address, requiring the visitor to send it in their email app. No database, background submission or fabricated success state. The final open enquiry form remains in place.
- TypeScript and branch validation checks passed: all four service paths, missing required fields, alternate country, invalid contact values, email encoding, selected-service-only summary and regression of the existing owner form. Managed preview has no available service mailbox; no browser/device QA is claimed.

## Four Experiences collections — 18 September 2026
- Replaced the six mixed service entries with four named collections: Holidays Abroad, Georgia Tours, Custom Trip and Concierge Service. Each has exactly three uniformly sized article cards, with consistent 4:3 photography and aligned text/action areas.
- Reused the installed Embla/Shadcn carousel: three cards fit across desktop, two at tablet widths, and a swipeable row on phones. Arrow controls and position buttons appear when the row overflows; keyboard navigation and reduced-motion preferences are supported. Additional articles can be added to the same collections without layout changes.
- All twelve cards link to unique local article templates. Existing experience/service article URLs remain valid. Added matching covers to the templates while retaining their clearly marked forthcoming details and existing enquiry links. No package prices, inclusions or availability were invented.
- Existing Georgia imagery is reused. Three licensed international photographs were added for the Holidays Abroad collection; source details below. All card assets have explicit dimensions, responsive derivatives and lazy loading.
- TypeScript and content checks passed for four collections, twelve unique destinations, complete article data and preserved previous routes. Browser preview infrastructure remains unavailable; browser/device interaction QA is not claimed.

### International collection photo sources
- Zanzibar: Taryn Elliott, Pexels photo 5993393. Source https://www.pexels.com/photo/tropical-beach-with-a-palm-tree-on-a-cloudy-day-5993393/ ; original https://images.pexels.com/photos/5993393/pexels-photo-5993393.jpeg (3831×5746). Palm-framed shoreline; landscape crop retains the palm and turquoise sea.
- Island escapes: Asad Photo Maldives, Pexels photo 9149277. Source gallery https://www.pexels.com/search/maldives/ ; original https://images.pexels.com/photos/9149277/pexels-photo-9149277.jpeg (4288×2848). Wooden jetty over turquoise water.
- City breaks: Halil Fatih Cetin, Pexels photo 20577444. Source gallery https://www.pexels.com/search/istanbul/ ; original https://images.pexels.com/photos/20577444/pexels-photo-20577444.jpeg (4000×6000). Galata Tower and Istanbul waterfront at sunset.
- All three use the Pexels License https://www.pexels.com/license/ . Locally exported 1200×900 and 640×480 WebP; responsive cropping and CSS saturation treatment. Credits in shared footer. Originals and selected crops visually inspected.

## Immersive Experiences opening — 18 September 2026
- Replaced the separate text header and panorama with a full-viewport photograph carrying the existing headline/description, white Explore experiences button, Plan your journey link and destination/scroll cues. The four collections follow immediately.
- Reused the existing licensed Batumi panorama. The opening navigation and wordmark are white over the photograph; after the first 48px of scrolling, the shared header returns to its normal light background. This optional shell treatment is enabled only on the Experiences index.
- Image scale/framing and a small text offset respond directly to scroll position and reverse naturally. Mobile and reduced-motion modes display a stable full-width composition. Anchor and contact actions use existing working routes.
- TypeScript and production build validation used; managed browser preview remains unavailable, so no browser/device QA is claimed.

## Desktop collection sliders and Guides — 18 September 2026
- Fixed the desktop carousel geometry: cards now occupy 40% of the row, leaving the next card partially visible and ensuring a three-card collection has horizontal travel. Tablet uses 58%, mobile 92%. Equal card shapes and aligned row layout remain.
- Arrow controls remain visible at all widths. Added a labelled range control tied to the carousel’s actual snap positions; dragging, swipe, arrows and keyboard navigation use the same Embla state. Native range arrow-key handling is preserved, and reInit listeners are cleaned up.
- Converted both Guides & Insights article grids to the shared carousel, with correct guide URLs and original article content. Guides are grouped by category rather than fixed three-item slices, so additional articles remain browsable. Existing featured guide/header are preserved.
- Four Experiences rows and two Guides rows now share this implementation. TypeScript and production compilation passed; browser preview infrastructure remains unavailable, so no interactive browser/device verification is claimed.
