# Decap CMS Setup & Admin Panel Guide

## 🎉 Your CMS is Ready!

Your site is fully configured with **Decap CMS v3** + **Netlify Identity** + **Git Gateway** for easy client content management.

---

## 📋 Table of Contents
1. [Netlify Deployment](#netlify-deployment)
2. [Enable Netlify Identity](#enable-netlify-identity)
3. [Enable Git Gateway](#enable-git-gateway)
4. [Admin Access](#admin-access)
5. [Managing Puppies](#managing-puppies)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Netlify Deployment

### Step 1: Connect to Netlify
1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as your provider
4. Select `gmeme5657-wq/ecockerspanielpuppies` repository
5. Review deployment settings:
   - **Build command:** `echo 'Static site - no build needed'`
   - **Publish directory:** `.` (current directory)
6. Click **"Deploy Site"**

### Step 2: Wait for Deployment
- Netlify will automatically build and deploy your site
- You'll receive a URL like: `https://your-site-name.netlify.app`
- Your site is now live! 🎉

---

## 🔐 Enable Netlify Identity

### Step 1: Access Site Settings
1. In Netlify dashboard, select your site
2. Go to **Settings** → **Identity**
3. Click **Enable Identity**
4. Choose **Free** plan

### Step 2: Invite Users
1. Still in **Identity** tab, click **Invite users**
2. Enter email address of client/admin
3. They'll receive an invitation email
4. They can set their password via email link

### Alternative: Open Signup
If you want to allow signup without invites:
1. In **Identity** settings
2. Find **Registration** section
3. Set to **"Open"** (or require invitation, your choice)

---

## 🔑 Enable Git Gateway

### Step 1: Add Git Gateway Service
1. In **Identity** tab, scroll to **Services**
2. Find **Git Gateway** section
3. Click **Enable Git Gateway**
4. Authorize GitHub when prompted
5. It will create a deployment key automatically

### Step 2: Verify Configuration
✓ Git Gateway is now active
✓ Authentication via Netlify Identity
✓ Commits go directly to your GitHub repository
✓ Changes auto-deploy on every commit

---

## 🌐 Admin Access

### Access the Admin Panel
1. Navigate to: `https://your-site-name.netlify.app/admin/`
2. Sign in with Netlify Identity credentials
3. You'll see the Decap CMS interface

### First Time Login
- If prompted to authorize with GitHub, accept
- This allows Git Gateway to commit changes
- You only do this once

---

## 🐕 Managing Puppies

### View All Puppies
1. In Admin Panel, click **"Puppies"** in the left sidebar
2. You'll see all puppies in `/data/puppies/` folder:
   - **Buddy** - Available male
   - **Luna** - Available female  
   - **Max** - Reserved male
   - **Bailey** - Sold female (not displayed on site)

### Add a New Puppy
1. Click **"New Puppies"** button
2. Fill in all fields:
   - **Puppy Name** - e.g., "Charlie"
   - **Price USD** - e.g., 1200
   - **Age** - e.g., "8 weeks"
   - **Gender** - Male or Female
   - **Color** - e.g., "Golden Red"
   - **Status** - Available/Reserved/Sold
   - **Description** - Tell about the puppy
   - **Main Photo** - Upload image (will go to `/assets/uploads/`)
   - **Featured on Homepage** - Toggle to show on homepage
   - **Training Status:**
     - Family Raised - ✓ checked by default
     - Potty Trained - Toggle if puppy is trained
     - Crate Trained - Toggle if puppy is trained
     - Health Insurance - ✓ checked by default
   - **Date Added** - Auto-set to today (can edit)
3. Click **"Publish"** to save and deploy

### Edit Existing Puppy
1. Click the puppy name in the list
2. Make changes to any field
3. **To change photo:** Click the image, then upload new one
4. Click **"Publish"** to save changes
5. Changes go live in minutes!

### Mark Puppy as Sold
1. Open the puppy
2. Change **Status** to **"Sold"**
3. Uncheck **"Featured on Homepage"** (optional)
4. Click **"Publish"**
5. Puppy disappears from public listings

### Delete/Archive Puppy
⚠️ **Important:** To hide sold puppies, change status to "Sold" (don't delete)
- Deletion removes data permanently
- Use "Sold" status instead to keep history

---

## 🖼️ Photo Upload Best Practices

### Recommended Photo Specs
- **Format:** JPG or PNG
- **Size:** 1000x1000px or larger (4:3 ratio works best)
- **File size:** Under 5MB
- **Filename:** descriptive (e.g., `buddy-male.jpg`)

### Photo Upload Process
1. Click photo upload area
2. Select image from computer
3. Netlify uploads to `/assets/uploads/`
4. Photo URL automatically fills in
5. Crop/edit optional in CMS UI

### Photo Storage
- All photos stored in `/assets/uploads/`
- Accessible at: `https://ecockerspanielpuppies.com/assets/uploads/filename.jpg`
- Photos stay with commits in GitHub

---

## 🌟 Homepage Display

### What Shows on Homepage
- **Available & Reserved puppies** only
- **Sold puppies** hidden automatically
- **Sorted** by newest first
- **Each card displays:**
  - Photo
  - Name + Price
  - Age | Gender | Status
  - Description
  - Training badges (✓ Family Raised, etc.)

### Featured Flag
- Check "Featured on Homepage" for puppies
- Non-featured puppies appear on `/puppies.html`
- Both appear in admin regardless

---

## 🔍 Live Updates

### How Updates Work
1. Admin makes changes in CMS
2. Clicks **"Publish"**
3. CMS commits to GitHub
4. Netlify auto-rebuilds (instant)
5. Site updates within **1-2 minutes**
6. No manual deployment needed!

### Viewing Changes
- Check live site: `https://ecockerspanielpuppies.com/`
- Check `/puppies/` page for full list
- Photos load from GitHub via API

---

## 🆘 Troubleshooting

### Admin Panel Shows "Waiting for Netlify Identity"
**Solution:**
1. Refresh page (Ctrl+R or Cmd+R)
2. Check Netlify site is deployed
3. Wait 5 minutes after enabling Identity

### Can't Upload Photos
**Checklist:**
- ✓ Git Gateway is enabled
- ✓ You're signed in (not just seeing login form)
- ✓ File size under 5MB
- ✓ Using JPG/PNG format
- ✓ Try a different browser (Safari/Chrome/Firefox)

### Changes Not Appearing on Site
**Common causes:**
- Wait 2-3 minutes for deploy
- Refresh page (Ctrl+Shift+R for hard refresh)
- Check Netlify deployments tab (should show recent build)
- Check admin console for errors (F12 → Console)

### Admin URL Not Working
**Solution:**
- Verify URL format: `https://your-site.netlify.app/admin/`
- Check `/admin/config.yml` file exists
- Check `/admin/index.html` file exists
- Try incognito window (no browser cache)

### GitHub Connection Error
**Solution:**
1. Re-enable Git Gateway in Netlify
2. GitHub will prompt for authorization
3. Accept the new deployment key
4. Try admin access again

---

## 📞 Support Resources

### CMS Documentation
- **Decap CMS Docs:** https://decapcms.org/docs/intro/
- **Git Gateway Guide:** https://decapcms.org/docs/git-gateway-backend/

### Netlify Documentation  
- **Netlify Identity:** https://docs.netlify.com/visitor-access/identity/overview/
- **Netlify Builds:** https://docs.netlify.com/configure-builds/overview/

### Get Help
1. Check GitHub Issues in repository
2. Review Netlify deploy logs
3. Check browser console (F12) for errors
4. Contact site developer

---

## ✅ Checklist Before Going Live

- [ ] Netlify site deployed and working
- [ ] Netlify Identity enabled
- [ ] Git Gateway enabled  
- [ ] Admin user invited/signed up
- [ ] Can access `/admin/` panel
- [ ] Can see puppies list (Buddy, Luna, Max, Bailey)
- [ ] Can add a test puppy
- [ ] Photo upload works
- [ ] Test puppy appears on site
- [ ] Delete test puppy (or mark as Sold)
- [ ] Homepage displays correctly
- [ ] Links to `/puppies.html` work

---

**🎉 You're all set!** Your client can now manage puppies without technical knowledge.

Any questions? Check the troubleshooting section or refer to the CMS documentation.

**Happy puppy management!** 🐕
