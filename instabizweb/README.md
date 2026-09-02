# InstaBizWeb — Full Stack MERN Project

> Digital Solutions for Business Growth

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios, Custom CSS |
| Backend | Node.js, Express.js, REST APIs |
| Database | MongoDB + Mongoose ODM |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Validation | express-validator (backend) + custom JS (frontend) |
| Deployment | Render (backend) + Vercel/Netlify (frontend) + MongoDB Atlas |

---

## Project Structure

```
instabizweb/
├── frontend/
│   └── src/
│       ├── App.js             # Routes + AuthProvider
│       ├── index.css          # Global design system
│       ├── context/AuthContext.js
│       ├── components/
│       │   ├── Navbar.js/css
│       │   ├── Footer.js/css
│       │   └── admin/
│       │       ├── AdminNavbar.js/css
│       │       └── ProtectedRoute.js
│       └── pages/
│           ├── Home.js        # Hero, stats, offerings, CTA
│           ├── About.js       # Story, values
│           ├── Services.js    # All 9 services
│           ├── WhyUs.js       # 6 reasons + testimonials
│           ├── Contact.js     # Enquiry form
│           └── admin/
│               ├── AdminLogin.js
│               ├── AdminDashboard.js
│               ├── EnquiryList.js
│               └── EnquiryDetail.js
│
└── backend/
    ├── server.js
    ├── seed.js
    ├── Procfile
    ├── config/db.js
    ├── models/Admin.js + Enquiry.js
    ├── middleware/auth.js + validate.js
    ├── controllers/authController.js + enquiryController.js
    └── routes/authRoutes.js + enquiryRoutes.js
```

---

## API Reference

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/login` | Public | Admin login → JWT |
| GET | `/api/auth/me` | Protected | Verify token |
| POST | `/api/enquiries` | Public | Submit contact form |
| GET | `/api/enquiries` | Protected | List (search/filter/paginate) |
| GET | `/api/enquiries/stats` | Protected | Dashboard stats |
| GET | `/api/enquiries/:id` | Protected | Single enquiry |
| PUT | `/api/enquiries/:id` | Protected | Update enquiry |
| DELETE | `/api/enquiries/:id` | Protected | Delete enquiry |

---

## Local Setup

### Backend
```bash
cd backend
cp .env.example .env        # Fill MONGO_URI + JWT_SECRET
npm install
node seed.js                # Creates admin account
npm run dev                 # http://localhost:5000
```

### Frontend
```bash
cd frontend
cp .env.example .env        # REACT_APP_API_URL=http://localhost:5000/api
npm install
npm start                   # http://localhost:3000
```

### Default Admin Credentials
```
Email:    admin@instabizweb.com
Password: Admin@123
URL:      http://localhost:3000/admin
```

---

## Deployment

### Backend → Render
1. Push `backend/` to GitHub
2. New Web Service → Build: `npm install` → Start: `node server.js`
3. Set env vars: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `NODE_ENV=production`
4. After deploy: Render shell → `node seed.js`

### Frontend → Vercel
1. Push `frontend/` to GitHub
2. Import to Vercel, set `REACT_APP_API_URL` = Render backend URL + `/api`

### Database → MongoDB Atlas
1. Free cluster at mongodb.com/atlas
2. Add DB user, allow all IPs (0.0.0.0/0)
3. Copy connection string to `MONGO_URI`

---

## AI Tools Used

**Tool:** Claude (Anthropic)

**Used for:** Architecture planning, scaffolding boilerplate, CSS design system, debugging

**Example debug — search debounce fix:**

AI-generated code fired an API call on every keystroke. Fixed by separating input state from debounced state:

```js
// Before: fires every keystroke
useEffect(() => { fetchEnquiries(); }, [search]);

// After: debounced 400ms
const [searchInput, setSearchInput] = useState('');
useEffect(() => {
  const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 400);
  return () => clearTimeout(t);
}, [searchInput]);
```
