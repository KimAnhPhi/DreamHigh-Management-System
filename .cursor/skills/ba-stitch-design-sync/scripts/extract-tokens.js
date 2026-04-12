/**
 * Extract Design Tokens from Stitch HTML
 * 
 * Usage: node extract-tokens.js <html-file-path>
 * Output: design-tokens.json
 */

const fs = require('fs');
const path = require('path');

function extractColors(html) {
  const colors = {
    primary: {},
    semantic: {},
    neutral: {},
    accent: {},
  };

  // Extract hex colors
  const hexPattern = /#([0-9a-fA-F]{3,6})\b/g;
  const hexMatches = [...html.matchAll(hexPattern)];
  
  // Extract rgb/rgba colors
  const rgbPattern = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/g;
  const rgbMatches = [...html.matchAll(rgbPattern)];

  // Group colors by usage
  const allColors = new Set();
  
  hexMatches.forEach(match => {
    allColors.add(match[1].length === 3 
      ? `#${match[1].split('').map(c => c + c).join('')}` 
      : `#${match[1]}`);
  });

  rgbMatches.forEach(match => {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    allColors.add(`rgb(${r}, ${g}, ${b})`);
  });

  return Array.from(allColors);
}

function extractTypography(html) {
  const typography = {
    fontFamily: {},
    fontSize: {},
    lineHeight: {},
    fontWeight: {},
  };

  // Extract font-family
  const fontFamilyPattern = /font-family:\s*['"]?([^'";}]+)['"]?/gi;
  const fontMatches = [...html.matchAll(fontFamilyPattern)];
  fontMatches.forEach(match => {
    const font = match[1].trim();
    if (!typography.fontFamily[font]) {
      typography.fontFamily[font] = font;
    }
  });

  // Extract font-size
  const fontSizePattern = /font-size:\s*(\d+(?:\.\d+)?)px/gi;
  const sizeMatches = [...html.matchAll(fontSizePattern)];
  sizeMatches.forEach(match => {
    const size = `${match[1]}px`;
    if (!typography.fontSize[size]) {
      typography.fontSize[size] = size;
    }
  });

  // Extract line-height
  const lineHeightPattern = /line-height:\s*(\d+(?:\.\d+)?)px/gi;
  const lineHeightMatches = [...html.matchAll(lineHeightPattern)];
  lineHeightMatches.forEach(match => {
    const lh = `${match[1]}px`;
    if (!typography.lineHeight[lh]) {
      typography.lineHeight[lh] = lh;
    }
  });

  // Extract font-weight
  const fontWeightPattern = /font-weight:\s*(\d+)/gi;
  const weightMatches = [...html.matchAll(fontWeightPattern)];
  weightMatches.forEach(match => {
    const weight = match[1];
    if (!typography.fontWeight[weight]) {
      typography.fontWeight[weight] = weight;
    }
  });

  return typography;
}

function extractSpacing(html) {
  const spacing = new Set();

  // Extract padding, margin, gap values
  const spacingPattern = /(?:padding|margin|gap):\s*(\d+(?:\.\d+)?)px/gi;
  const spacingMatches = [...html.matchAll(spacingPattern)];
  
  spacingMatches.forEach(match => {
    spacing.add(`${match[1]}px`);
  });

  return Array.from(spacing).sort((a, b) => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    return aNum - bNum;
  });
}

function extractBorderRadius(html) {
  const borderRadius = new Set();

  const borderRadiusPattern = /border-radius:\s*(\d+(?:\.\d+)?)px/gi;
  const borderRadiusMatches = [...html.matchAll(borderRadiusPattern)];
  
  borderRadiusMatches.forEach(match => {
    borderRadius.add(`${match[1]}px`);
  });

  return Array.from(borderRadius).sort((a, b) => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    return aNum - bNum;
  });
}

function main() {
  const htmlFilePath = process.argv[2];
  
  if (!htmlFilePath) {
    console.error('Usage: node extract-tokens.js <html-file-path>');
    process.exit(1);
  }

  if (!fs.existsSync(htmlFilePath)) {
    console.error(`File not found: ${htmlFilePath}`);
    process.exit(1);
  }

  const html = fs.readFileSync(htmlFilePath, 'utf-8');

  const tokens = {
    colors: extractColors(html),
    typography: extractTypography(html),
    spacing: extractSpacing(html),
    borderRadius: extractBorderRadius(html),
  };

  const outputPath = path.join(path.dirname(htmlFilePath), 'design-tokens.json');
  fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));

  console.log(`✅ Design tokens extracted to: ${outputPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`  - Colors: ${tokens.colors.length}`);
  console.log(`  - Font sizes: ${Object.keys(tokens.typography.fontSize).length}`);
  console.log(`  - Spacing values: ${tokens.spacing.length}`);
  console.log(`  - Border radius values: ${tokens.borderRadius.length}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  extractColors,
  extractTypography,
  extractSpacing,
  extractBorderRadius,
};
