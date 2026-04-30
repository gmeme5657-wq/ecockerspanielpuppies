# EmailJS Quick Reference Card
## For Developers & Site Managers

---

## ⚡ 30-Second Setup

1. Go to [emailjs.com](https://emailjs.com) → Sign up (free)
2. Create Email Service (Gmail/Outlook)
3. Create Email Template with these variables:
   - `{{to_email}}`
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{phone_number}}`
   - `{{subject_type}}`
   - `{{message}}`
   - `{{timestamp}}`
4. Copy three credentials from EmailJS:
   - **Public Key** → `js/script.js` line 27
   - **Service ID** → `js/script.js` line 31
   - **Template ID** → `js/script.js` line 35
5. Test at `/contact.html`

---

## 📍 Where to Find EmailJS Credentials

### Public Key
- **Path:** Dashboard → Account (top right) → API Keys
- **Looks Like:** `abc123def456ghi789jkl`

### Service ID
- **Path:** Dashboard → Email Services → Click service → Service ID
- **Looks Like:** `service_abc123def456`

### Template ID
- **Path:** Dashboard → Email Templates → Click template → Template ID
- **Looks Like:** `template_xyz789uv`

---

## 📝 Exact Lines to Modify

**File:** `js/script.js`

```javascript
Line 27: const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';
         ↓ Replace with actual key

Line 31: const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE';
         ↓ Replace with actual ID

Line 35: const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE';
         ↓ Replace with actual ID
```

---

## 🧪 Testing Checklist

- [ ] Sign up at EmailJS
- [ ] Create Gmail/Email service
- [ ] Create email template
- [ ] Copy Public Key to line 27
- [ ] Copy Service ID to line 31
- [ ] Copy Template ID to line 35
- [ ] Visit website `/contact.html`
- [ ] Fill form with test data
- [ ] Click "Send Message"
- [ ] See success notification
- [ ] Check email inbox for test message

---

## 🎨 Form Fields Available

| Field | HTML ID | Sent As | Type |
|-------|---------|---------|------|
| Name | `#name` | `{{from_name}}` | Text |
| Email | `#email` | `{{from_email}}` | Email |
| Phone | `#phone` | `{{phone_number}}` | Phone |
| Subject | `#subject` | `{{subject_type}}` | Dropdown |
| Message | `#message` | `{{message}}` | Textarea |

---

## ⚠️ Common Mistakes

❌ **Don't:** Leave placeholder text in credentials  
✅ **Do:** Replace with actual values from EmailJS

❌ **Don't:** Share public key on GitHub  
✅ **Do:** Add to .gitignore if in version control

❌ **Don't:** Forget to create email template first  
✅ **Do:** Create template before copying Template ID

❌ **Don't:** Use wrong template variables  
✅ **Do:** Use exact variable names with `{{ }}`

---

## 🐛 Instant Troubleshooting

### Form says "not configured"
→ Check lines 27, 31, 35 in `js/script.js` for placeholder text

### No email received
→ Check EmailJS Activity log → look for errors → check spam folder

### "Sending..." button stuck
→ Check browser console (F12) for errors → check internet connection

### Validation not working
→ Hard refresh page (Ctrl+Shift+R) → clear browser cache

---

## 📚 Full Documentation

See `EMAILJS_SETUP_GUIDE.md` for complete setup instructions

---

## 🔗 Useful Links

- [EmailJS Home](https://www.emailjs.com/)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Gmail App Password](https://myaccount.google.com/apppasswords)
- [Browser Developer Tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools)

---

## 💡 Pro Tips

**Tip 1:** Use Gmail with app password for most reliable delivery  
**Tip 2:** Test form immediately after setup to ensure it works  
**Tip 3:** Check spam folder for test emails (add to contacts after)  
**Tip 4:** Monitor EmailJS Activity log regularly  
**Tip 5:** Keep email template backup in case of accidental deletion  

---

**Last Updated:** April 29, 2026
