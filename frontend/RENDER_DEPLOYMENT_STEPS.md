# 🚀 Render Deployment - Step by Step Guide

## Prerequisites Completed ✅
- ✅ Render account created
- ✅ GitHub account connected to Render

---

## Step-by-Step Deployment Instructions

### Step 1: Access Render Dashboard
1. Go to [render.com](https://render.com)
2. Click **"Sign In"** (top right corner)
3. Sign in with your account

---

### Step 2: Create New Static Site
1. In the Render dashboard, look at the top right corner
2. Click the **"+ New"** button (blue button)
3. A dropdown menu will appear
4. Click **"Static Site"** from the dropdown menu

---

### Step 3: Connect Your GitHub Repository
1. You'll see a page titled **"Create a new Static Site"**
2. Under **"Connect a repository"** section, you'll see your GitHub repositories
3. If you don't see your repo:
   - Click **"Configure account"** link
   - Authorize Render to access your GitHub repositories
   - Refresh the page
4. Find and click on: **"Prince161724/Ai-App"** repository
5. Click **"Connect"** button next to it

---

### Step 4: Configure Build Settings
After connecting the repository, you'll see configuration fields. Fill them as follows:

#### **Name:**
- Type: `ai-frontend` (or any name you prefer)
- This will be part of your URL: `ai-frontend.onrender.com`

#### **Branch:**
- Leave as: `main` (default)
- This is the branch Render will deploy from

#### **Root Directory:**
- **IMPORTANT:** Type exactly: `frontend`
- This tells Render where your frontend code is located
- Click in the field and type: `frontend`

#### **Build Command:**
- Type exactly: `npm install && npm run build`
- Or simply: `npm run build`
- This command builds your production-ready files

#### **Publish Directory:**
- Type exactly: `dist`
- This is where Vite puts the built files
- Render will serve files from this folder

---

### Step 5: Add Environment Variables
1. Scroll down to find **"Environment Variables"** section
2. Click **"Add Environment Variable"** button
3. A form will appear with two fields:

   **First field (Name):**
   - Type exactly: `VITE_CLIENT_ID`
   - Make sure it's all caps and has the underscore

   **Second field (Value):**
   - Paste your Google OAuth Client ID here
   - Example: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
   - Get this from [Google Cloud Console](https://console.cloud.google.com/)

4. Click **"Save"** or **"Add"** button

---

### Step 6: Choose Plan
1. Scroll down to **"Plan"** section
2. Select **"Free"** plan (for testing)
3. Or choose **"Starter"** ($7/month) for production use

---

### Step 7: Deploy
1. Scroll to the bottom of the page
2. Review all your settings:
   - ✅ Name: `ai-frontend`
   - ✅ Branch: `main`
   - ✅ Root Directory: `frontend`
   - ✅ Build Command: `npm run build`
   - ✅ Publish Directory: `dist`
   - ✅ Environment Variable: `VITE_CLIENT_ID` (set)
3. Click the **"Create Static Site"** button (blue button at bottom)

---

### Step 8: Wait for Deployment
1. You'll be redirected to your service dashboard
2. You'll see a deployment log showing:
   - "Cloning repository..."
   - "Installing dependencies..."
   - "Building application..."
   - "Deploying..."
3. **This takes 3-5 minutes** - be patient!
4. You'll see a progress bar at the top

---

### Step 9: Check Deployment Status
1. Watch the deployment log in real-time
2. Look for these status indicators:
   - 🟡 **"Building"** - Still deploying
   - 🟢 **"Live"** - Successfully deployed!
   - 🔴 **"Build Failed"** - Something went wrong

---

### Step 10: Get Your Live URL
1. Once status shows **"Live"** (green)
2. Look at the top of the page
3. You'll see: **"Your site is live at"**
4. Your URL will be: `https://ai-frontend.onrender.com`
5. Click the URL to open your deployed site!

---

### Step 11: Update Google OAuth Settings
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to: **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID
4. Click **"Edit"** (pencil icon)
5. Under **"Authorized JavaScript origins"**, click **"+ ADD URI"**
6. Add your Render URL: `https://ai-frontend.onrender.com`
7. Click **"Save"**

---

## ✅ Verification Checklist

After deployment, verify these:

- [ ] Site loads without errors
- [ ] Dark theme is visible
- [ ] Google Login button appears
- [ ] Can click "Sign in with Google"
- [ ] After login, can see upload form
- [ ] No console errors in browser (F12 → Console tab)

---

## 🔧 Troubleshooting

### Issue: Build Failed
**Check:**
1. Go to **"Logs"** tab in Render dashboard
2. Look for error messages
3. Common issues:
   - Wrong root directory (should be `frontend`)
   - Missing environment variable
   - Build command error

**Solution:**
- Double-check Root Directory is `frontend`
- Verify Build Command is `npm run build`
- Make sure `VITE_CLIENT_ID` is set

---

### Issue: Site loads but shows blank page
**Check:**
1. Open browser console (F12)
2. Look for errors
3. Check if `VITE_CLIENT_ID` is undefined

**Solution:**
- Verify environment variable is set correctly
- Rebuild the site (click "Manual Deploy" → "Deploy latest commit")

---

### Issue: Google OAuth not working
**Check:**
1. Verify your Render URL is added to Google Cloud Console
2. Check environment variable is set

**Solution:**
- Add `https://your-site.onrender.com` to authorized origins
- Wait 5-10 minutes for changes to propagate
- Clear browser cache

---

### Issue: API calls failing
**Check:**
1. Open browser console (F12) → Network tab
2. Look for failed requests
3. Check CORS errors

**Solution:**
- Verify backend URL is correct: `https://backend-ai-w92s.onrender.com/`
- Check backend CORS settings allow your Render domain
- Backend should allow: `https://ai-frontend.onrender.com`

---

## 🔄 Updating Your Site

### Automatic Updates:
- Every time you push to `main` branch on GitHub
- Render automatically detects the change
- Triggers a new deployment
- Takes 3-5 minutes

### Manual Deploy:
1. Go to your service dashboard on Render
2. Click **"Manual Deploy"** dropdown
3. Select **"Deploy latest commit"**
4. Wait for deployment to complete

---

## 📝 Important Notes

1. **Free Plan Limitations:**
   - Site spins down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds
   - Consider upgrading for production use

2. **Environment Variables:**
   - Changes require a rebuild
   - After updating, click "Manual Deploy"

3. **Custom Domain:**
   - Free plan supports custom domains
   - Go to Settings → Custom Domain
   - Add your domain

4. **Build Time:**
   - First build: 5-7 minutes
   - Subsequent builds: 3-5 minutes

---

## 🎉 Success!

Once you see **"Live"** status and can access your site, you're done!

Your frontend is now deployed at: `https://ai-frontend.onrender.com`

**Next Steps:**
1. Test all functionality
2. Share the URL with users
3. Monitor the logs for any issues
4. Set up custom domain (optional)

---

## 📞 Need Help?

If you encounter issues:
1. Check the **"Logs"** tab in Render dashboard
2. Check browser console (F12)
3. Verify all settings match this guide
4. Make sure backend is running and accessible

**Happy Deploying! 🚀**

