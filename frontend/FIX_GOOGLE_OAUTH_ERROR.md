# 🔧 Fix Google OAuth "Access Blocked" Error on Render

## ❌ The Problem

You're seeing this error:
```
Access blocked: Authorization Error
Error 400: origin_mismatch
```

**Why?** Your Render domain (`ai-frontend-mpiz.onrender.com`) is not registered as an authorized origin in Google Cloud Console.

---

## ✅ The Solution

Add your Render URL to Google Cloud Console's authorized origins.

---

## 📋 Step-by-Step Fix

### Step 1: Open Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account

### Step 2: Select Your Project
1. At the top, click the **project dropdown** (shows your project name)
2. Select the project where your OAuth Client ID was created
3. If you don't see it, search for it in the dropdown

### Step 3: Navigate to OAuth Credentials
1. In the left sidebar, click **"APIs & Services"**
2. Click **"Credentials"** (under APIs & Services)
3. You'll see a list of your OAuth 2.0 Client IDs

### Step 4: Edit Your OAuth Client ID
1. Find your OAuth Client ID (the one you're using for `VITE_CLIENT_ID`)
2. Click the **pencil icon** (Edit) next to it
   - OR click on the Client ID name to open it, then click **"Edit"** button

### Step 5: Add Authorized JavaScript Origins
1. Scroll down to **"Authorized JavaScript origins"** section
2. You'll see a list of URLs (probably has `http://localhost:5173`)
3. Click **"+ ADD URI"** button
4. A new input field will appear
5. Enter your Render URL:
   ```
   https://ai-frontend-mpiz.onrender.com
   ```
   **Important:**
   - ✅ Include `https://`
   - ✅ Don't add a trailing slash `/`
   - ✅ Use the exact URL from your Render dashboard

### Step 6: Save Changes
1. Scroll to the bottom of the page
2. Click **"SAVE"** button (blue button)
3. Wait for the confirmation message: "Client saved"

### Step 7: Wait for Propagation
1. **Wait 5-10 minutes** for Google's servers to update
2. This is important - changes don't take effect immediately

### Step 8: Test Again
1. Go to your Render site: `https://ai-frontend-mpiz.onrender.com`
2. Clear your browser cache (Ctrl+Shift+Delete)
3. Try logging in with Google again
4. It should work now! ✅

---

## 🔍 How to Find Your Exact Render URL

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **"ai-frontend"** service
3. Look at the top of the page
4. You'll see: **"Your site is live at"**
5. Copy that exact URL (should be something like `https://ai-frontend-xxxxx.onrender.com`)

---

## 📝 Complete Example

Your **Authorized JavaScript origins** should look like this:

```
http://localhost:5173
https://ai-frontend-mpiz.onrender.com
```

**For each environment, add:**
- ✅ `http://localhost:5173` (for local development)
- ✅ `https://your-render-url.onrender.com` (for production)

---

## ⚠️ Common Mistakes to Avoid

❌ **Don't add:**
- `http://ai-frontend-mpiz.onrender.com` (missing 's' in https)
- `https://ai-frontend-mpiz.onrender.com/` (trailing slash)
- `ai-frontend-mpiz.onrender.com` (missing https://)

✅ **Do add:**
- `https://ai-frontend-mpiz.onrender.com` (correct format)

---

## 🔄 If It Still Doesn't Work

### Check 1: Verify the URL
- Make sure you copied the exact URL from Render
- Check for typos
- Ensure it starts with `https://`

### Check 2: Wait Longer
- Sometimes it takes up to 15 minutes
- Try again after waiting

### Check 3: Clear Browser Cache
- Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Clear cached images and files
- Try again

### Check 4: Check Environment Variable
- In Render dashboard, go to Environment tab
- Verify `VITE_CLIENT_ID` is set correctly
- Make sure there are no extra spaces

### Check 5: Rebuild Your Site
- In Render, go to your service
- Click **"Manual Deploy"** → **"Deploy latest commit"**
- Wait for deployment to complete
- Try again

---

## 🎯 Quick Checklist

- [ ] Opened Google Cloud Console
- [ ] Selected correct project
- [ ] Went to APIs & Services → Credentials
- [ ] Found and edited OAuth Client ID
- [ ] Added `https://ai-frontend-mpiz.onrender.com` to Authorized JavaScript origins
- [ ] Clicked SAVE
- [ ] Waited 5-10 minutes
- [ ] Cleared browser cache
- [ ] Tested login again

---

## 💡 Why This Happens

Google OAuth requires you to register every domain/origin where your app will run. This is a **security feature** to prevent unauthorized use of your OAuth credentials.

- ✅ `localhost:5173` works because you added it
- ❌ `ai-frontend-mpiz.onrender.com` doesn't work because it's not added yet

Once you add it, Google will allow OAuth requests from that domain.

---

## 🚀 After Fixing

Once you've added the origin and waited:
1. Your login will work on Render ✅
2. Your login will still work locally ✅
3. Both environments will use the same OAuth Client ID

---

**That's it! Follow these steps and your OAuth will work on Render! 🎉**

