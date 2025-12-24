# Quick Start: Render Deployment

## 🚀 Fast Deployment Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Deploy on Render
1. Go to [render.com](https://render.com) → Sign up/Login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `backend-ai`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   ```
   PORT=8000
   GOOGLE_API_KEY=your_key
   PINEAPI=your_key
   INDEXPINE=your_index
   GROQ_API_KEY=your_key
   ```
6. Click **"Create Web Service"**
7. Wait for deployment (2-5 minutes)
8. Your app will be live at: `https://your-app-name.onrender.com`

### 3. Test
```bash
curl https://your-app-name.onrender.com
```

## 📝 Required Environment Variables

Copy these to Render's environment variables section:

- `PORT` = `8000`
- `GOOGLE_API_KEY` = Your Google API key
- `PINEAPI` = Your Pinecone API key  
- `INDEXPINE` = Your Pinecone index name
- `GROQ_API_KEY` = Your Groq API key

## ⚠️ Important Notes

- **File Uploads:** Files uploaded to Render are temporary and will be deleted on restart
- **Auto-Deploy:** Every push to `main` branch auto-deploys
- **Logs:** Check Render dashboard → Logs tab for debugging

For detailed instructions, see `RENDER_DEPLOYMENT_GUIDE.md`

