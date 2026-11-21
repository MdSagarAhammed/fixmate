# FixMate Client

Web app for **FixMate**, an on-demand device and home appliance repair booking platform.

## Short Description
FixMate connects customers with verified technicians for repairs such as smartphones, laptops, AC, refrigerators, TVs, washing machines and electrical work. Customers send a repair request, track the job step by step, and pay online only after the work is completed. Technicians manage their services and jobs, and admins moderate the platform.

## Live URL
- **Live site:** https://fixmate-wheat-mu.vercel.app
- **Server API:** https://fixmate-server-dusky.vercel.app
- **Server repo:** https://github.com/MdSagarAhammed/Fixmate_server.git
- **Client repo:** https://github.com/MdSagarAhammed/fixmate.git

## Purpose (Client Side)
The client is the user-facing part of FixMate. It:
- Gives each of the 3 roles (Customer, Technician, Admin) a dedicated dashboard.
- Handles sign up and sign in with BetterAuth, and protects every private route.
- Talks to the Express server with a short-lived JWT for all private data.
- Shows clear job statuses, so users always know what is happening with a repair.
- Sends customers to Stripe Checkout only after a job is completed.

## Examiner Test Credentials
| Role | Email | Password |
|---|---|---|
| Admin | `admin@test.com` | `Admin@123` |
| Technician | `tech@test.com` | `Tech@123` |
| Customer | `raju@test.com` | `Customer@123` |

Stripe test card: `4242 4242 4242 4242`, any future expiry date, any CVC.

**Quick flow to check:**
1. Sign in as the technician, add a service, then sign in as the admin and approve it.
2. Sign in as the customer, open the service and send a repair request.
3. As the technician, accept the request, start work, then mark it completed with a final amount.
4. As the customer, open My Bookings, click **Pay Now**, and pay with the test card.
5. As the admin, check All Bookings and Transactions.

## Key Features
**Public**
- Responsive sticky navbar with active route highlight, avatar dropdown, and mobile menu
- Home page with hero search, 6 latest services, How It Works, and popular categories
- Browse Services with server-side search, category and mode filters, and sorting (kept in the URL, so they survive a reload)
- Service details with technician summary and a role-aware Request Repair form
- Custom 404, error, and loading pages

**Authentication**
- Sign up as Customer or Technician (admin cannot be selected)
- Password rules: 6+ characters, one uppercase, one lowercase
- Redirect back to the page you were trying to open after sign in
- Logged-in users stay logged in on reload of any private route

**Customer dashboard**
- Overview stats and chart, My Bookings with cancel confirmation, Pay Now, and Payment History

**Technician dashboard**
- Overview, add service with ImgBB image upload, full CRUD on My Services, availability toggle, and request management with only the valid actions per status 

status

*Admin dashboard*
•⁠  ⁠Overview stats and chart, user role management, service approval, all bookings with filter, and transactions with total revenue

*Shared*
•⁠  ⁠Update Profile with photo upload, reflected in the navbar and top bar instantly
•⁠  ⁠Toast notifications, confirmation modals, and empty states
•⁠  ⁠Consistent status badge colors across all dashboards

## Technology Stack
| Area | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS 3 |
| Authentication | BetterAuth with MongoDB adapter |
| API auth | JWT issued from the session, verified by the Express server |
| Payments | Stripe Checkout (test mode) |
| Image upload | ImgBB API |
| Charts | Recharts |
| Icons | Lucide React |
| Notifications | Sonner |
| Deployment | Vercel |

## NPM Packages Used
⁠ next ⁠, ⁠ react ⁠, ⁠ react-dom ⁠, ⁠ better-auth ⁠, ⁠ mongodb ⁠, ⁠ jsonwebtoken ⁠, ⁠ sonner ⁠, ⁠ lucide-react ⁠, ⁠ recharts ⁠, ⁠ tailwindcss ⁠, ⁠ postcss ⁠, ⁠ autoprefixer ⁠

## Local Setup
1.⁠ ⁠Clone and install:
   ⁠ bash
   git clone https://github.com/<you>/fixmate-client.git
   cd fixmate-client
   npm install
    ⁠
2.⁠ ⁠Create your env file:
   ⁠ bash
   cp .env.example .env.local
    ⁠
3.⁠ ⁠Fill in ⁠ .env.local ⁠:
   ⁠ env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_IMGBB_KEY=<your imgbb key>
   MONGODB_URI=<your mongodb connection string>
   DB_NAME=fixmate
   BETTER_AUTH_SECRET=<long random string>
   BETTER_AUTH_URL=http://localhost:3000
   JWT_SECRET=<same value as the server JWT_SECRET>
   TRUSTED_ORIGINS=http://localhost:3000
    ⁠
4.⁠ ⁠Start the server first (see the server repo), then run the client:
   ⁠ bash
   npm run dev
    ⁠
5.⁠ ⁠Open http://localhost:3000.
6.⁠ ⁠To load demo data, run ⁠ npm run seed ⁠ in the server repo while the client is running.

## Scripts
| Command | Purpose |
|---|---|
| ⁠ npm run dev ⁠ | Start the dev server |
| ⁠ npm run build ⁠ | Create a production build |
| ⁠ npm start ⁠ | Run the production build |

## Deployment Notes
•⁠  ⁠Add the client domain to ⁠ TRUSTED_ORIGINS ⁠ (BetterAuth trusted origins) and to the server's ⁠ CLIENT_URLS ⁠ (CORS).
•⁠  ⁠Set ⁠ NEXT_PUBLIC_API_URL ⁠ to the deployed server URL ending in ⁠ /api ⁠.
•⁠  ⁠Set all environment variables in the Vercel project settings.
•⁠  ⁠Keep ⁠ JWT_SECRET ⁠ identical on the client and the server.