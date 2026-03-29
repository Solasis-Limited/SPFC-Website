# GitHub Pages Site

This folder contains the static GitHub Pages site for `spfc.solasislimited.org`.

## Published Pages

- `/` home page with store links
- `/privacy-policy/` public privacy policy
- `/request/` support, privacy, and account deletion request form

## Before Going Live

1. Turn on GitHub Pages for this repository and set the source to **GitHub Actions**.
2. Point the DNS for `spfc.solasislimited.org` to GitHub Pages.
3. Fill in the values in `site/assets/site-config.js`:
   - `googlePlayUrl`
   - `appleAppStoreUrl`
   - `emailjs.publicKey`
   - `emailjs.serviceId`
   - `emailjs.templateId`
4. In EmailJS, create a template that accepts these fields from the form:
   - `request_type`
   - `from_name`
   - `reply_to`
   - `account_email`
   - `subject`
   - `message`
   - `to_email`
   - `app_name`

## Notes

- `site/CNAME` keeps the custom domain attached to the Pages deployment.
- `site/privacy-policy.html` redirects the older flat URL to the new folder-based route.
