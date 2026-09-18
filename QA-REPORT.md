# WordPress verification

## Scope

React backup source: 381e7a1b65dc632eb101ce25560b91e47c15086c (18 September 2026). The existing React project and published Site remain unchanged.

## Completed

- Theme and plugin activated in an isolated WordPress Playground runtime.
- WordPress 7.1.1 / PHP 8.5.10 reported by the runtime.
- Imported 6 guides, 12 service templates and 3 existing outing articles into native WordPress post types.
- Imported covers into the WordPress Media Library.
- Verified title, excerpt, cover and Gutenberg heading/image editing.
- Verified a repeated import preserves edits and does not duplicate existing articles.
- Verified newly published posts appear in the data used by carousels; drafts and trashed posts do not.
- Verified automatic default section assignment and explicit front-page setup.
- Verified server-rendered fallback pages and portable theme asset URLs.
- Built the standalone production JavaScript and CSS. Original scroll scene components, timelines, Lenis settings, quiz and carousel logic are reused.

- All seven frontend views mount successfully in JSDOM using real WordPress bootstrap data; checks cover editable content, article rendering, guide/experience collections, owner quiz and portable asset URLs.
- Reimport does not recreate trashed starter articles.

## Limits

- The cloud browser could not connect to the local WordPress preview (connection refused). This is not a claim of completed visual/browser/device QA. Component mount checks use JSDOM, which cannot verify actual layout or motion fidelity.
- The active theme, catalog/booking plugin and hosting configuration of luxuryaparthotel.ge have not been inspected. The package has not been activated on the production site.
- No guarantee of compatibility with an unknown existing property theme is made. Validate the combined installation on staging before production activation.
- Owner forms continue using the existing explicit mailto workflow; no backend delivery is claimed.
- Guides and Experiences are editable via WordPress. Other marketing templates retain their source-authored content.
