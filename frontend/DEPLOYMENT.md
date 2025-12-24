# Frontend Deployment Guide

## 🚀 Deployment Steps for AI Frontend Application

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- GitHub account
- Deployment platform account (Vercel, Netlify, or Render)

---

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Create a `.env` file in the `frontend` directory with:
```
VITE_CLIENT_ID=your_google_oauth_client_id
```

**Note:** Make sure to add `.env` to `.gitignore` to keep your credentials secure.

### 2. Backend URL Configuration
✅ **Already configured!** The backend URL is set to:
```
https://backend-ai-w92s.onrender.com/
```

All API calls in `src/Home.jsx` are already pointing to this production URL.

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (optional, can use web interface):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Web Interface:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository: `Prince161724/Ai-App`
   - Set **Root Directory** to: `frontend`
   - Add Environment Variable:
     - Name: `VITE_CLIENT_ID`
     - Value: Your Google OAuth Client ID
   - Click "Deploy"

3. **Deploy via CLI:**
   ```bash
   cd frontend
   vercel
   ```
   Follow the prompts and add your environment variables.

**Vercel automatically:**
- Detects Vite build configuration
- Runs `npm run build`
- Deploys to a production URL
- Provides HTTPS
- Enables automatic deployments on git push

---

### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy via Web Interface:**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository: `Prince161724/Ai-App`
   - Configure build settings:
     - **Base directory:** `frontend`
     - **Build command:** `npm run build`
     - **Publish directory:** `frontend/dist`
   - Add Environment Variable:
     - `VITE_CLIENT_ID` = Your Google OAuth Client ID
   - Click "Deploy site"

3. **Deploy via CLI:**
   ```bash
   cd frontend
   netlify deploy --prod
   ```

---

### Option 3: Render

1. **Go to Render Dashboard:**
   - Visit [render.com](https://render.com)
   - Sign in with GitHub

2. **Create New Static Site:**
   - Click "New +" → "Static Site"
   - Connect your repository: `Prince161724/Ai-App`
   - Configure:
     - **Name:** ai-frontend (or your preferred name)
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Publish Directory:** `dist`
   - Add Environment Variable:
     - `VITE_CLIENT_ID` = Your Google OAuth Client ID
   - Click "Create Static Site"

---

## 🔧 Build Configuration

The project uses **Vite** as the build tool. The build process:

1. **Development:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Runs on `http://localhost:5173`

2. **Production Build:**
   ```bash
   cd frontend
   npm run build
   ```
   Creates optimized production files in `frontend/dist/`

3. **Preview Production Build:**
   ```bash
   npm run preview
   ```

---

## 🔐 Google OAuth Setup

1. **Get Client ID:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - `https://your-deployed-domain.com` (for production)
   - Add authorized redirect URIs (if needed)
   - Copy the Client ID

2. **Add to Environment Variables:**
   - In your deployment platform, add `VITE_CLIENT_ID` with your Client ID value

---

## ✅ Post-Deployment Checklist

- [ ] Verify the site loads correctly
- [ ] Test Google OAuth login
- [ ] Test PDF upload functionality
- [ ] Test question asking feature
- [ ] Verify API calls to backend are working
- [ ] Check console for any errors
- [ ] Test on mobile devices
- [ ] Verify HTTPS is enabled

---

## 🐛 Troubleshooting

### Issue: Google OAuth not working
- **Solution:** Make sure you've added your production URL to Google Cloud Console authorized origins

### Issue: API calls failing
- **Solution:** Check CORS settings on backend. Backend should allow your frontend domain.

### Issue: Build fails
- **Solution:** 
  - Check Node.js version (should be 18+)
  - Run `npm install` in frontend directory
  - Check for any missing dependencies

### Issue: Environment variables not working
- **Solution:** 
  - Vite requires `VITE_` prefix for environment variables
  - Restart dev server after adding env variables
  - Rebuild and redeploy for production

---

## 📝 Important Notes

1. **Backend URL:** Already configured to `https://backend-ai-w92s.onrender.com/`
2. **CORS:** Make sure your backend allows requests from your frontend domain
3. **File Size Limit:** PDF uploads are limited to 10MB (configured in code)
4. **Environment Variables:** Never commit `.env` file to git

---

## 🔄 Continuous Deployment

All platforms (Vercel, Netlify, Render) support automatic deployments:
- Every push to `main` branch triggers a new deployment
- Pull requests create preview deployments
- No manual deployment needed after initial setup

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check network tab for failed API calls
3. Verify environment variables are set correctly
4. Ensure backend is running and accessible

---

**Happy Deploying! 🚀**

