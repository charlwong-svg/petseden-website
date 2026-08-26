# Pets Eden — New Static Site

## What's inside
17 pages rebuilt as static HTML, matching your current URLs exactly:

/  /services-available/  /cat-grooming/  /dog-grooming/  /rabbit-grooming/
/tartar-removal/  /courses/  /courses-available/  /professioanl-cat-groomer-course/
/professional-dog-groomer-course/  /professional-rabbit-groomer-course/
/trainer-profiles/  /professional-toolbox-sets/  /membership/  /franchise/
/contact-us/  /join-us/

A floating WhatsApp button (linking to 9227 7915) appears on every page.

Images currently link directly to your existing Wix media CDN (static.wixstatic.com)
so nothing needed re-uploading yet. **Important:** once you cancel Wix, those image
links will likely break. Before cancelling Wix, download the images and I can swap
them to local files — just ask.

## Editable content (no code needed)
Two pieces of content are pulled from JSON files so you can edit them without
touching any HTML:
- `content/promos.json` — the two promo banners (grooming $ off / courses % off)
- `content/join-us.json` — the job listings on the Join Us page

These are editable directly as text files, OR through a simple dashboard (see below).

## Deploying to Netlify
1. Create a GitHub repository and push this whole folder to it.
2. In Netlify: "Add new site" → "Import an existing project" → connect the GitHub repo.
   - Build command: leave blank
   - Publish directory: `/` (the repo root)
3. In Netlify site settings, add your domain (petseden.net) once you've moved it to
   your registrar's DNS pointing at Netlify (see Netlify's domain docs for the exact
   records — usually an ALIAS/A record + CNAME for www).

## Setting up the editing dashboard (recommended, for monthly promo edits)
This gives you a simple login page at yoursite.com/admin to edit the promo dates and
job listings without opening any code.
1. In Netlify: Site settings → Identity → **Enable Identity**.
2. Under Identity → Registration, set to "Invite only".
3. Under Identity → Services, **Enable Git Gateway**.
4. Invite yourself as a user (Identity tab → Invite users → your email).
5. Visit yoursite.com/admin, accept the email invite, set a password, and log in.
6. You'll see "Promotions" and "Join Us Page" — edit fields, click Publish. Netlify
   auto-rebuilds and the live site updates within a minute or two.

## Local files structure
- `css/style.css` — all styling
- `js/nav.js` — mobile menu toggle
- `js/promo.js` — loads promo banner text from content/promos.json
- `js/join-us.js` — loads job listings from content/join-us.json
- `admin/` — the CMS dashboard (Decap CMS)
- `content/` — the two editable JSON files
