# Google Search Console Verification for imzainvest.com

## Step-by-Step Instructions for Toc

### 1. Go to Google Search Console
- Visit: https://search.google.com/search-console
- Sign in with izaimza0@gmail.com

### 2. Add Property
- Click **"Add property"** button
- Enter the domain: `imzainvest.com`
- Click "Continue"

### 3. Choose HTML File Verification
- You'll see multiple verification methods (DNS, HTML file, Google tag, etc.)
- Select **"HTML file"** verification method
- Google will provide a file named something like `googleXXXXXXXXXXXXXXXX.html`
- **Download this file**

### 4. Add File to Site Root
- Place the downloaded `googleXXXXXXXXXXXXXXXX.html` file in the root directory:
  ```
  ~/Sites/imzainvest/googleXXXXXXXXXXXXXXXX.html
  ```
- The file should be accessible at: `https://imzainvest.com/googleXXXXXXXXXXXXXXXX.html`

### 5. Deploy to Netlify
- Commit the verification file to the Git repository:
  ```bash
  cd ~/Sites/imzainvest
  git add googleXXXXXXXXXXXXXXXX.html
  git commit -m "Add Google Search Console verification file"
  git push
  ```
- Netlify will automatically deploy the changes (it's connected to the repo)
- The site updates should be live within seconds to a few minutes

### 6. Verify in Google Search Console
- Return to Google Search Console
- Click the **"Verify"** button
- If successful, you'll see a confirmation message
- The property is now ready for monitoring

## Next Steps After Verification

Once the property is verified:

1. Google Analytics (GA4) integration:
   - We have a placeholder in `templates/analytics-snippet.html` with property ID `G-XXXXXXXXXX`
   - Once you create a GA4 property, replace `G-XXXXXXXXXX` with the real property ID
   - Deploy and verify the tracking is working

2. Sitemap submission:
   - In Search Console, go to **Sitemaps**
   - Submit `https://imzainvest.com/sitemap.xml`

3. Monitor performance:
   - Check **Performance** reports to see search impressions, clicks, and CTR
   - Review **Coverage** to ensure all pages are properly indexed

## Notes

- The HTML verification file method is the most straightforward
- Once verified, you can optionally remove the verification file, but it's fine to keep it there
- Domain verification is permanent; you won't need to re-verify
