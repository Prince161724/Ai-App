# Complete Guide: Deploying Your Node.js App to Render

This guide will walk you through deploying your backend application to Render step by step.

## Prerequisites

1. **GitHub Account** - You'll need a GitHub account
2. **Render Account** - Sign up at [render.com](https://render.com) (free tier available)
3. **API Keys Ready** - Have all your API keys ready:
   - Google API Key
   - Pinecone API Key
   - Pinecone Index Name
   - Groq API Key

---

## Step 1: Prepare Your Code

### 1.1 Fix Environment Variables
✅ Already done! The environment variable typos have been fixed.

### 1.2 Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Name your repository (e.g., `backend-ai-app`)
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have files)
6. Click **"Create repository"**

### 1.3 Push Your Code to GitHub

Open your terminal/PowerShell in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit - ready for Render deployment"

# Add your GitHub repository (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or set up SSH keys with GitHub

---

## Step 2: Set Up Render Account

1. Go to [render.com](https://render.com)
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with your GitHub account (recommended) or email
4. Verify your email if required

---

## Step 3: Create a New Web Service on Render

1. Once logged in, click **"New +"** button in the top right
2. Select **"Web Service"**
3. You'll be asked to connect your GitHub account (if not already connected)
4. Click **"Connect account"** and authorize Render

---

## Step 4: Configure Your Web Service

### 4.1 Connect Repository
1. Render will show your GitHub repositories
2. Find and select your repository (the one you just pushed)
3. Click **"Connect"**

### 4.2 Basic Settings

Fill in the following:

- **Name:** `backend-ai` (or any name you prefer)
- **Region:** Choose closest to your users (e.g., `Oregon (US West)`)
- **Branch:** `main` (or `master` if that's your branch)
- **Root Directory:** Leave empty (unless your app is in a subfolder)
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 4.3 Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add each of these:

| Key | Value | Description |
|-----|-------|-------------|
| `PORT` | `8000` | Server port (Render will override this, but good to have) |
| `GOOGLE_API_KEY` | `your_actual_google_api_key` | Your Google Generative AI API key |
| `PINEAPI` | `your_actual_pinecone_api_key` | Your Pinecone API key |
| `INDEXPINE` | `your_actual_index_name` | Your Pinecone index name |
| `GROQ_API_KEY` | `your_actual_groq_api_key` | Your Groq API key |

**Important:** 
- Replace `your_actual_...` with your real API keys
- Never commit `.env` file to GitHub (it's in .gitignore)
- Keep your API keys secure

### 4.4 Plan Selection

- Choose **"Free"** plan for testing (has limitations)
- Or **"Starter"** plan ($7/month) for better performance

---

## Step 5: Deploy

1. Scroll down and click **"Create Web Service"**
2. Render will start building your application
3. You'll see build logs in real-time
4. Wait for deployment to complete (usually 2-5 minutes)

---

## Step 6: Verify Deployment

1. Once deployment is successful, you'll see a URL like:
   `https://backend-ai.onrender.com`
2. Click the URL to test your API
3. Check the **"Logs"** tab if there are any errors

---

## Step 7: Test Your API

You can test your endpoints using:

### Using curl (PowerShell):
```powershell
# Test if server is running
curl https://your-app-name.onrender.com

# Test upload endpoint (replace with your actual email)
curl -X POST https://your-app-name.onrender.com/test@example.com `
  -F "pdf=@path/to/your/file.pdf"
```

### Using Postman or any API client:
- Base URL: `https://your-app-name.onrender.com`
- Test endpoints: `/askQuestion`, `/:gmail`, `/delete`

---

## Important Notes & Troubleshooting

### ⚠️ File Upload Limitations

**Important:** Render's filesystem is **ephemeral** (temporary). This means:
- Uploaded files will be **deleted** when the service restarts
- Files are **not persistent** across deployments
- For production, consider using cloud storage (AWS S3, Cloudinary, etc.)

### 🔧 Common Issues

1. **Build Fails:**
   - Check build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **App Crashes:**
   - Check **"Logs"** tab in Render
   - Verify all environment variables are set correctly
   - Ensure `uploads/pdfs` directory exists (Render creates it automatically)

3. **Port Issues:**
   - Render automatically sets `PORT` environment variable
   - Your code uses `process.env.PORT || 8000` which is correct ✅

4. **Environment Variables Not Working:**
   - Double-check variable names (case-sensitive)
   - Ensure no extra spaces in variable names
   - Redeploy after adding new variables

### 🔄 Updating Your App

Whenever you make changes:

```bash
# Make your changes locally
# Then commit and push:
git add .
git commit -m "Your update message"
git push origin main
```

Render will **automatically redeploy** when you push to the main branch!

### 📊 Monitoring

- **Logs:** View real-time logs in Render dashboard
- **Metrics:** Monitor CPU, memory, and response times
- **Alerts:** Set up email alerts for crashes

---

## Next Steps (Optional)

1. **Custom Domain:** Add your own domain in Render settings
2. **Database:** Add a PostgreSQL database if needed
3. **Background Workers:** Set up background jobs if needed
4. **File Storage:** Migrate to cloud storage (S3, Cloudinary) for persistent file uploads

---

## Support

- **Render Docs:** [render.com/docs](https://render.com/docs)
- **Render Support:** Available in dashboard
- **Community:** Render Discord/Forums

---

## Summary Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] API tested and working
- [ ] Monitoring set up

**Congratulations! Your app is now live on Render! 🎉**

