# OG Image Generator - Instructions

## Status: ✅ Complete

All 7 blog posts have been updated to reference OG images, and the batch generator is ready.

### Blog Posts Updated:
1. ✅ best-investment-apps-uk-teens-2026.html
2. ✅ index-funds-vs-etfs.html
3. ✅ junior-isa-guide.html
4. ✅ what-is-compound-interest.html
5. ✅ what-happens-when-you-buy-a-stock.html
6. ✅ my-first-month-investing-what-i-learned.html
7. ✅ how-much-should-15-year-old-saved.html

### How to Generate the OG Images:

1. **Open the generator page:**
   - File: `~/Sites/imzainvest/images/og-generator-batch.html`
   - Open in your browser (local file or via HTTP server)

2. **The page will automatically:**
   - Generate all 7 OG images (1200x630px)
   - Display previews in a gallery
   - Show each image name

3. **Download images:**
   - Click "Download All" to download all 7 PNGs at once
   - Or click individual "Download" buttons per image

4. **Place the PNGs:**
   - Save all images to: `~/Sites/imzainvest/images/`
   - Filenames will be:
     - og-best-investment-apps-uk-teens-2026.png
     - og-index-funds-vs-etfs.png
     - og-junior-isa-guide.png
     - og-what-is-compound-interest.png
     - og-what-happens-when-you-buy-a-stock.png
     - og-my-first-month-investing-what-i-learned.png
     - og-how-much-should-15-year-old-saved.png

### Design Specifications:
- **Dimensions:** 1200x630px
- **Gradient:** Green (#10b981) → Cyan (#06b6d4) → Blue (#0891b2)
- **Typography:** Large white text with article title
- **Branding:** "IMZA INVEST" footer + relevant emoji
- **Font:** System font stack for cross-platform compatibility
- **Format:** PNG (lossless, web-optimized)

### Meta Tags Updated:
All blog posts now have correct `og:image` meta tags pointing to:
```
https://imzainvest.com/images/og-{slug}.png
```

### Next Steps:
1. Open `og-generator-batch.html` in a browser
2. Download all PNG files
3. Upload/place them in `~/Sites/imzainvest/images/`
4. Commit and push to GitHub
5. Deploy to production

