Campus Marketplace
The problem — read this before writing any code
Right now, when a fellow wants to sell or swap something within the community — a laptop bag, a textbook, a phone charger, a spare seat in a ride — it happens over WhatsApp Status or a community group chat. That "works," but it's broken in specific ways:

A listing is buried within hours as new messages push it up the chat
There's no search — "does anyone have a scientific calculator for sale" means scrolling or asking and waiting
No way to filter by price or category
Sellers get asked "is this still available?" repeatedly by people who don't know it already sold
There's no history — if you missed the post, it's gone
Persona: a fellow on a tight budget who wants to buy something secondhand from someone they trust (another fellow), not a stranger on Jiji/Facebook Marketplace.

Why it matters: cheaper access to gear for students, less waste, and it's lower-risk than buying from strangers because the seller is someone in the same program.

Before you build: validate it
Talk to at least 3 real classmates. Ask: have you tried to sell or find something secondhand recently? What did you use? What went wrong? Put 4–6 sentences on what you heard in your README. If what you hear contradicts something in this brief, adjust your MVP and say so — don't build blind.

Success metric
If this worked, a fellow could find out whether a specific item is available and its price in under a minute, without asking anyone a question in a group chat.

MVP user stories — each one removes a specific pain point above
Sign up / log in (Supabase auth)
Create a listing: title, description, price, category, image — validated with RHF + Zod (removes: buried Status posts)
Search by keyword, filter by category and price (removes: no search)
View a listing's detail page, including whether it's still available (removes: repeated "still available?" messages)
Edit or delete a listing I created, including marking it sold
"My listings" view on a dashboard
Stretch goals (only after MVP is solid)
Image upload to Supabase Storage
Contact-seller messaging inside the app
Favorites / saved listings
Suggested routes
/, /listings, /listings/[id], /listings/new, /listings/[id]/edit, /dashboard, /login, /signup

Suggested Supabase schema
profiles   (id, name, avatar_url)
listings   (id, user_id, title, description, price, category, image_url, status, created_at)
Notes
"Mark as sold" is not a stretch goal — it's core, because it directly kills the "still available?" problem. Don't cut it.
Category list should be a fixed enum, not free text — keeps filtering simple and Zod validation clean.