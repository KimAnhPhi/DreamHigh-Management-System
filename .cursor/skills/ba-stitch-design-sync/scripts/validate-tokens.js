/**
 * Validate Design Tokens - Compare Stitch tokens với Frontend tokens
 * 
 * Usage: node validate-tokens.js <stitch-tokens.json> <frontend-tokens-dir>
 */

const fs = require('fs');
const path = require('path');

function loadTokens(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function compareColors(stitchColors, frontendColors) {
  const differences = [];
  
  // Compare primary colors
  if (frontendColors.primary?.DEFAULT !== stitchColors.primary?.DEFAULT) {
    differences.push({
      type: 'color',
      category: 'primary',
      property: 'DEFAULT',
      stitch: stitchColors.primary?.DEFAULT,
      frontend: frontendColors.primary?.DEFAULT,
    });
  }

  // Compare semantic colors
  ['success', 'error', 'warning', 'info'].forEach(semantic => {
    if (frontendColors.semantic?.[semantic] !== stitchColors.semantic?.[semantic]) {
      differences.push({
        type: 'color',
        category: 'semantic',
        property: semantic,
        stitch: stitchColors.semantic?.[semantic],
        frontend: frontendColors.semantic?.[semantic],
      });
    }
  });

  return differences;
}

function compareTypography(stitchTypography, frontendTypography) {
  const differences = [];

  // Compare font sizes
  Object.keys(stitchTypography.fontSize || {}).forEach(key => {
    if (frontendTypography.fontSize?.[key] !== stitchTypography.fontSize[key]) {
      differences.push({
        type: 'typography',
        property: `fontSize.${key}`,
        stitch: stitchTypography.fontSize[key],
        frontend: frontendTypography.fontSize?.[key],
      });
    }
  });

  // Compare line heights
  Object.keys(stitchTypography.lineHeight || {}).forEach(key => {
    if (frontendTypography.lineHeight?.[key] !== stitchTypography.lineHeight[key]) {
      differences.push({
        type: 'typography',
        property: `lineHeight.${key}`,
        stitch: stitchTypography.lineHeight[key],
        frontend: frontendTypography.lineHeight?.[key],
      });
    }
  });

  return differences;
}

function generateReport(differences, outputPath) {
  let report = '# Design Tokens Validation Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  
  if (differences.length === 0) {
    report += '✅ **All tokens match!**\n';
  } else {
    report += `⚠️ **Found ${differences.length} differences:**\n\n`;
    
    const byType = {};
    differences.forEach(diff => {
      if (!byType[diff.type]) {
        byType[diff.type] = [];
      }
      byType[diff.type].push(diff);
    });

    Object.keys(byType).forEach(type => {
      report += `## ${type.toUpperCase()}\n\n`;
      byType[type].forEach(diff => {
        report += `- **${diff.property}**:\n`;
        report += `  - Stitch: \`${diff.stitch}\`\n`;
        report += `  - Frontend: \`${diff.frontend}\`\n\n`;
      });
    });
  }

  fs.writeFileSync(outputPath, report);
  console.log(`✅ Validation report generated: ${outputPath}`);
}

function main() {
  const stitchTokensPath = process.argv[2];
  const frontendTokensDir = process.argv[3];

  if (!stitchTokensPath || !frontendTokensDir) {
    console.error('Usage: node validate-tokens.js <stitch-tokens.json> <frontend-tokens-dir>');
    process.exit(1);
  }

  const stitchTokens = loadTokens(stitchTokensPath);
  
  // Load frontend tokens
  const frontendColors = require(path.join(frontendTokensDir, 'colors.ts'));
  const frontendTypography = require(path.join(frontendTokensDir, 'typography.ts'));

  const differences = [
    ...compareColors(stitchTokens, { colors: frontendColors }),
    ...compareTypography(stitchTokens, frontendTypography),
  ];

  const reportPath = path.join(frontendTokensDir, '..', 'STITCH_VALIDATION_REPORT.md');
  generateReport(differences, reportPath);

  if (differences.length > 0) {
    console.log(`\n⚠️  Found ${differences.length} differences. See report for details.`);
    process.exit(1);
  } else {
    console.log('\n✅ All tokens match!');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  compareColors,
  compareTypography,
  generateReport,
};
