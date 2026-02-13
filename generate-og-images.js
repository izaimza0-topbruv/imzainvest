const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// OG image data
const ogImages = [
  {
    title: "Best Investment Apps for UK Teens 2026",
    filename: "og-best-investment-apps-uk-teens-2026.png"
  },
  {
    title: "Index Funds vs ETFs",
    filename: "og-index-funds-vs-etfs.png"
  },
  {
    title: "What Is Compound Interest?",
    filename: "og-compound-interest-explained.png"
  },
  {
    title: "How to Open a Junior ISA",
    filename: "og-how-to-open-junior-isa.png"
  },
  {
    title: "Stock Market Basics for Beginners",
    filename: "og-stock-market-basics.png"
  },
  {
    title: "My First Month Investing",
    filename: "og-my-first-month-investing.png"
  },
  {
    title: "What Happens When You Buy a Stock",
    filename: "og-what-happens-buy-stock.png"
  }
];

function createOGImage(title, filename) {
  const width = 1200;
  const height = 630;
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#16213e');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add accent color bar at top
  ctx.fillStyle = '#e94560';
  ctx.fillRect(0, 0, width, 8);
  
  // Set up title text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Word wrap function for long titles
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let lines = [];
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = context.measureText(testLine);
      
      if (metrics.width > maxWidth && i > 0) {
        lines.push(line.trim());
        line = words[i] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    
    const totalHeight = lineHeight * lines.length;
    let currentY = y - totalHeight / 2;
    
    for (let line of lines) {
      context.fillText(line, x, currentY);
      currentY += lineHeight;
    }
  }
  
  // Draw title
  wrapText(ctx, title, width / 2, height / 2, width - 100, 90);
  
  // Draw branding at bottom
  ctx.fillStyle = '#e94560';
  ctx.font = '28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('imzainvest.com', width / 2, height - 30);
  
  // Save image
  const filepath = path.join(imagesDir, filename);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filepath, buffer);
  console.log(`✓ Created: ${filename}`);
}

// Generate all OG images
console.log('Generating OG images...\n');
ogImages.forEach(img => {
  createOGImage(img.title, img.filename);
});

console.log('\n✓ All OG images generated successfully!');
