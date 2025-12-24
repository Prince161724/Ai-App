# 🚀 Step-by-Step: Deploy to Render

## Quick Steps Overview

1. ✅ **Code is on GitHub** - Already done! (https://github.com/Prince161724/Ai-App.git)
2. Create Render account
3. Create Web Service
4. Configure settings (IMPORTANT: Set Root Directory to `backend`)
5. Add environment variables
6. Deploy!

---

## Detailed Steps

### Step 1: Create Render Account

1. Go to **[render.com](https://render.com)**
2. Click **"Get Started"** or **"Sign Up"**
3. **Sign up with GitHub** (recommended - easier connection)
   - Or sign up with email
4. Verify your email if required

---

### Step 2: Create New Web Service

1. Once logged in, click the **"New +"** button (top right)
2. Select **"Web Service"**
3. If prompted, **connect your GitHub account**
   - Click **"Connect account"**
   - Authorize Render to access your repositories

---

### Step 3: Connect Your Repository

1. Render will show a list of your GitHub repositories
2. Find and click on: **`Prince161724/Ai-App`**
3. Click **"Connect"**

---

### Step 4: Configure Settings ⚠️ IMPORTANT

Fill in these settings:

#### Basic Settings:
- **Name:** `backend-ai` (or any name you like)
- **Region:** Choose closest to you (e.g., `Oregon (US West)`)
- **Branch:** `main`
- **Root Directory:** ⚠️ **`backend`** ⚠️ (THIS IS CRITICAL!)
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Why Root Directory is important:** Your code is in the `backend` folder, so Render needs to know to look there!

#### Plan:
- Choose **"Free"** for testing (has limitations)
- Or **"Starter"** ($7/month) for better performance

---

### Step 5: Add Environment Variables

1. Scroll down to **"Environment Variables"** section
2. Click **"Add Environment Variable"** for each one:

| Key | Value | Where to Get |
|-----|-------|--------------|
| `PORT` | `8000` | (Optional - Render sets this automatically) |
| `GOOGLE_API_KEY` | `your_google_api_key` | Google Cloud Console |
| `PINEAPI` | `your_pinecone_api_key` | Pinecone Dashboard |
| `INDEXPINE` | `your_index_name` | Pinecone Dashboard |
| `GROQ_API_KEY` | `your_groq_api_key` | Groq Console |

**Important:**
- Replace `your_...` with your actual API keys
- Variable names are **case-sensitive** (exact match)
- No spaces in variable names
- Click **"Add"** after each variable

---

### Step 6: Deploy!

1. Scroll to the bottom
2. Click **"Create Web Service"**
3. Render will start building your app
4. Watch the build logs (they appear in real-time)
5. Wait 2-5 minutes for deployment

---

### Step 7: Verify Deployment

1. Once deployment completes, you'll see:
   - ✅ **"Live"** status
   - A URL like: `https://backend-ai.onrender.com`

2. Click the URL to test
3. Check **"Logs"** tab if there are errors

---

## Testing Your API

### Test with Browser:
Just visit: `https://your-app-name.onrender.com`

### Test with PowerShell:
```powershell
# Test if server is running
curl https://your-app-name.onrender.com
```

### Test with Postman:
- Base URL: `https://your-app-name.onrender.com`
- Endpoints:
  - `POST /:gmail` - Upload PDF
  - `POST /askQuestion` - Ask question
  - `DELETE /delete` - Delete file

---

## ⚠️ Important Notes

### File Uploads
- **Render's filesystem is temporary** - uploaded files will be deleted when service restarts
- For production, consider using cloud storage (AWS S3, Cloudinary)

### Auto-Deploy
- Every push to `main` branch automatically redeploys your app
- No need to manually redeploy!

### Troubleshooting

**Build Fails?**
- Check build logs in Render dashboard
- Verify Root Directory is set to `backend`
- Ensure all dependencies are in `package.json`

**App Crashes?**
- Check **"Logs"** tab
- Verify all environment variables are set correctly
- Check variable names (case-sensitive!)

**Can't Find Repository?**
- Make sure GitHub account is connected
- Refresh the repository list

---

## Summary Checklist

- [ ] Render account created
- [ ] GitHub connected to Render
- [ ] Web service created
- [ ] **Root Directory set to `backend`** ⚠️
- [ ] All environment variables added
- [ ] Deployment successful
- [ ] App is live and tested

---

## Your App URL

Once deployed, your app will be live at:
**`https://your-app-name.onrender.com`**

🎉 **Congratulations! Your backend is now live on Render!**

