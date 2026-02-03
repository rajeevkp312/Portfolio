# Portfolio – Rajeev Kumar Pandit

Full‑stack MERN portfolio with AI/ML projects, real‑time features, and polished UI/UX.

## 🚀 Live Demo
- **Frontend:** [Your Vercel URL]
- **Backend API:** [Your Render URL]

## ✨ Features
- Interactive hero with VariableProximity text effect
- Animated sections: About, Education, Internship, Projects, Skills, Achievements, Contact
- Dark glassmorphism theme with electric borders
- Contact form with email delivery (Nodemailer + Gmail SMTP)
- Downloadable resume
- Fully responsive (mobile, tablet, desktop)
- Smooth scroll navigation with Back‑to‑Top

## 🛠 Tech Stack
| Frontend | Backend | Tools |
|----------|---------|-------|
| React.js | Node.js | Vite |
| Tailwind CSS | Express.js | Framer Motion |
| react‑icons | MongoDB (Mongoose) | Nodemailer |

## 📁 Folder Structure
```
portfolio/
├── client/          # React frontend (Vite)
│   ├── src/
│   ├── public/      # Images, resume, logo
│   └── package.json
├── server/          # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── package.json
└── .gitignore       # Secures env files
```

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/rajeevkp312/portfolio.git
cd portfolio

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

### 2. Environment Variables

**Server** (`server/.env`):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
PORT=5000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_gmail_app_password

CONTACT_TO_EMAIL=yourgmail@gmail.com
CONTACT_FROM_EMAIL=yourgmail@gmail.com
```

**Client** (`client/.env.local` for local dev):
```env
VITE_API_BASE_URL=http://localhost:5000
```

> **Note:** Get Gmail App Password from [Google Account → Security → App passwords](https://myaccount.google.com/security)

### 3. Run Locally
```bash
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend
cd client && npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🚀 Deployment

### Frontend → Vercel
1. Push code to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. **Root Directory:** `client`
4. **Environment Variable:**
   - `VITE_API_BASE_URL=https://your-render-backend.onrender.com`
5. Deploy

### Backend → Render
1. Create New Web Service on [render.com](https://render.com)
2. **Root Directory:** `server`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. **Environment Variables:** Add all from `server/.env` (above)
6. Deploy

## 🔐 Security
- ✅ `.gitignore` excludes all `.env` files and `node_modules/`
- ✅ Never commit Gmail App Password or MongoDB URI
- ✅ Use Render/Vercel dashboard for production env vars

## 📧 Contact Form
Submissions are:
1. Saved to MongoDB
2. Emailed to your Gmail inbox (check Spam if not received)

## 📝 Sections
Home → About → Education → Internship → Projects → Skills → Achievements → Contact → Footer

## 👤 Author
**Rajeev Kumar Pandit**
- [GitHub](https://github.com/rajeevkp312)
- [LinkedIn](https://www.linkedin.com/in/rajeev-kumar-pandit-a72977280/)
- Email: rajeevkumarpandit2002@gmail.com

---
© 2026 Rajeev Kumar Pandit. All rights reserved.
