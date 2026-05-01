# Netlify & Decap CMS Deployment Checklist

## Pre-Deployment ✅

- [x] GitHub repository is public: `gmeme5657-wq/ecockerspanielpuppies`
- [x] All code committed and pushed
- [x] `netlify.toml` configured with redirects
- [x] `/admin/config.yml` configured with Git Gateway backend
- [x] `/admin/index.html` includes Decap CMS v3
- [x] Example puppies in `/data/puppies/`: Buddy, Luna, Max, Bailey
- [x] Photo upload folder `/assets/uploads/.gitkeep` exists

---

## Netlify Setup (5-10 minutes)

### Step 1: Deploy Site
- [ ] Go to https://app.netlify.com
- [ ] Click **"Add new site"** → **"Import an existing project"**
- [ ] Select **GitHub** provider
- [ ] Authorize Netlify access to your GitHub account
- [ ] Choose repository: `gmeme5657-wq/ecockerspanielpuppies`
- [ ] Use default build settings (already in netlify.toml)
- [ ] Click **"Deploy Site"**
- [ ] Wait for green checkmark (deployment complete)
- [ ] Note your Netlify URL: `https://your-site-name.netlify.app`

### Step 2: Verify Deployment
- [ ] Visit your Netlify URL in browser
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Puppies display on homepage
- [ ] All images load properly

---

## Netlify Identity Setup (5-10 minutes)

### Step 1: Enable Identity
- [ ] In Netlify dashboard, select your site
- [ ] Go to **Settings** → **Identity**
- [ ] Click **"Enable Identity"**
- [ ] Select **Free** plan
- [ ] Click **"Enable"**

### Step 2: Configure Registration
- [ ] In **Identity** tab, find **Registration** settings
- [ ] Choose either:
  - **Option A (Recommended):** Invite only → Admin controls who can access
  - **Option B:** Open invitation → Anyone can sign up
- [ ] Select your preferred option and save

### Step 3: Add Admin User
- [ ] Still in **Identity** tab
- [ ] Click **"Invite users"** button
- [ ] Enter client/admin email address
- [ ] Send invitation
- [ ] They will receive email with signup link

---

## Git Gateway Setup (3-5 minutes)

### Step 1: Enable Git Gateway
- [ ] Still in **Identity** settings
- [ ] Scroll down to **Services** section
- [ ] Find **Git Gateway**
- [ ] Click **"Enable Git Gateway"**
- [ ] Authorize GitHub when prompted
- [ ] Accept deployment key creation

### Step 2: Verify Git Gateway
- [ ] Check your GitHub repo settings
- [ ] Under **Deploy keys**, you should see new key
- [ ] Status shows: authorized ✓

---

## Test Admin Access (5 minutes)

### Step 1: Access Admin Panel
- [ ] Go to: `https://your-site-name.netlify.app/admin/`
- [ ] You should see Netlify Identity login form

### Step 2: First Login
- [ ] Use email you invited
- [ ] Check email for signup link
- [ ] Set a secure password
- [ ] Return to admin page and sign in

### Step 3: Authorize GitHub (First Time Only)
- [ ] You may see "Authorize with GitHub" button
- [ ] Click to authorize Git Gateway
- [ ] This is one-time setup

### Step 4: Verify CMS Interface
- [ ] You should see Decap CMS dashboard
- [ ] Left sidebar shows **"Puppies"** collection
- [ ] Click **"Puppies"** to see all puppies

---

## Test Puppy Management (10 minutes)

### View Existing Puppies
- [ ] In Admin Panel, click **"Puppies"** in sidebar
- [ ] You should see:
  - [ ] Buddy (Available, Male)
  - [ ] Luna (Available, Female)
  - [ ] Max (Reserved, Male)
  - [ ] Bailey (Sold, Female)

### Edit Existing Puppy
- [ ] Click on **"Buddy"** to open
- [ ] Change description text
- [ ] Change **Status** to **"Reserved"**
- [ ] Click **"Publish"** button
- [ ] Wait for success message
- [ ] Check live site - should still show Buddy (Reserved status)

### Add New Puppy
- [ ] Click **"New Puppies"** button
- [ ] Fill in test puppy:
  - [ ] Name: "Daisy"
  - [ ] Price: 1250
  - [ ] Age: "7 weeks"
  - [ ] Gender: "Female"
  - [ ] Color: "Black"
  - [ ] Status: "Available"
  - [ ] Description: "Test puppy for CMS"
  - [ ] Photo: Upload test image (or use existing)
  - [ ] Check "Family Raised", "Health Insurance"
  - [ ] Leave "Potty Trained", "Crate Trained" unchecked
  - [ ] Click **"Publish"**
- [ ] Wait for success message

### Verify Changes on Live Site
- [ ] Refresh live site: `https://your-site-name.netlify.app/`
- [ ] New puppy "Daisy" should appear
- [ ] Check deployment took 1-2 minutes

### Test Photo Upload
- [ ] Open your test puppy "Daisy"
- [ ] Click the photo area
- [ ] Upload a different image
- [ ] Click **"Publish"**
- [ ] Verify new photo appears on live site

### Clean Up Test Puppy
- [ ] Open "Daisy" in CMS
- [ ] Change Status to **"Sold"**
- [ ] Uncheck "Featured on Homepage"
- [ ] Click **"Publish"**
- [ ] Verify it disappears from homepage

### Reset Buddy to Original
- [ ] Open "Buddy" in CMS
- [ ] Change Status back to **"Available"**
- [ ] Restore original description
- [ ] Click **"Publish"**

---

## Verification Checklist

### Homepage Display
- [ ] All available puppies show
- [ ] Sold puppies hidden
- [ ] Photos display correctly
- [ ] Training badges show correctly
- [ ] Newest puppies first
- [ ] Price and details visible

### Admin Panel
- [ ] Can access `/admin/`
- [ ] Can view all puppies
- [ ] Can edit puppy details
- [ ] Can upload/change photos
- [ ] Changes publish successfully
- [ ] Live site updates within 2 minutes

### Git Integration
- [ ] Commits appear in GitHub
- [ ] Each publish = 1 new commit
- [ ] Commit messages show CMS updates
- [ ] No manual deployment needed

### Performance
- [ ] Site loads in < 2 seconds
- [ ] Images load properly
- [ ] Admin panel responsive
- [ ] No console errors (F12)

---

## Monitoring & Maintenance

### Check Netlify Deploys
- [ ] Netlify dashboard shows recent deployments
- [ ] All status: "Published" (green)
- [ ] Check logs if any failed deploys

### Monitor GitHub
- [ ] New commits appear after CMS publishes
- [ ] Commit history shows changes
- [ ] No merge conflicts

### Backup Data
- [ ] GitHub is your backup (all data in repo)
- [ ] Regular git backups recommended
- [ ] Netlify keeps deployment history

---

## Troubleshooting Reference

### Issue: Admin page blank/loading forever
**Solution:**
1. Refresh page (Cmd+R)
2. Check Netlify site is deployed (green checkmark)
3. Wait 5 mins after enabling Identity
4. Try incognito window

### Issue: Can't upload photos
**Solution:**
1. Verify you're signed in (not just login form)
2. Check Git Gateway is enabled
3. File size < 5MB
4. Use JPG/PNG format

### Issue: Changes not appearing
**Solution:**
1. Wait 2-3 minutes
2. Hard refresh: Cmd+Shift+R
3. Check Netlify deployments
4. Check GitHub commits

### Issue: GitHub authorization error
**Solution:**
1. Re-enable Git Gateway in Netlify
2. Authorize GitHub again
3. Try admin page again

---

## Security Notes ⚠️

- [ ] Keep Netlify password secure
- [ ] Never share personal access tokens
- [ ] Use strong passwords (12+ chars)
- [ ] Review Git Gateway permissions
- [ ] Backup GitHub SSH keys
- [ ] Monitor Netlify activity logs

---

## Support Resources

- **Decap CMS Docs:** https://decapcms.org
- **Netlify Docs:** https://docs.netlify.com
- **Git Gateway:** https://decapcms.org/docs/git-gateway-backend/
- **Netlify Identity:** https://docs.netlify.com/visitor-access/identity/overview/

---

## 🎉 Ready to Launch!

Once all checkboxes are complete:
- ✅ Live website deployed
- ✅ Admin can edit all puppies
- ✅ Changes auto-publish
- ✅ No code knowledge required
- ✅ 24/7 uptime

**Your Cocker Spaniel puppy site is ready for business!** 🐕
