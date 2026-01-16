const fs = require('fs');
const path = require('path');

/**
 * Génère le fichier CSS de variables à partir des tokens JSON
 */
function generateThemeCSS() {
    const themesDir = path.join(__dirname, 'tokens/themes');
    const outputPath = path.join(__dirname, 'generated/theme-variables.css');

    // Lire tous les fichiers de thèmes
    const themeFiles = fs.readdirSync(themesDir).filter(f => f.endsWith('.json'));

    let css = `/* Auto-generated theme variables - DO NOT EDIT MANUALLY */\n`;
    css += `/* Generated at: ${new Date().toISOString()} */\n\n`;

    themeFiles.forEach(file => {
        const themePath = path.join(themesDir, file);
        const theme = JSON.parse(fs.readFileSync(themePath, 'utf-8'));

        // dark.json devient le :root par défaut
        const selector = theme.id === 'dark' ? ':root' : `[data-theme="${theme.id}"]`;

        css += `/* Theme: ${theme.label} - ${theme.description} */\n`;
        css += `${selector} {\n`;

        Object.entries(theme.tokens).forEach(([key, value]) => {
            css += `  ${key}: ${value};\n`;
        });

        css += `}\n\n`;
    });

    // Créer le dossier generated s'il n'existe pas
    const generatedDir = path.dirname(outputPath);
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir, { recursive: true });
    }

    // Écrire le fichier CSS
    fs.writeFileSync(outputPath, css, 'utf-8');

    console.log(`✅ Generated ${outputPath}`);
    console.log(`📦 Processed ${themeFiles.length} themes`);
}

// Exécution
try {
    generateThemeCSS();
} catch (error) {
    console.error('❌ Error generating CSS:', error);
    process.exit(1);
}
