const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../angular/src/app/elements/components');
const MODULE_TEMPLATE = path.join(__dirname, '../angular/src/app/elements/elements.module.template.ts');
const MODULE_OUT = path.join(__dirname, '../angular/src/app/elements/elements.module.ts');

function pascalToKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function scanComponents() {
    const entries = [];

    function scan(dir) {
        for (const file of fs.readdirSync(dir)) {
            const full = path.join(dir, file);

            if (fs.statSync(full).isDirectory()) {
                scan(full);
                continue;
            }

            if (file.endsWith('.component.ts')) {
                const base = file.replace('.component.ts', '');

                const className =
                    base.split('-')
                        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                        .join('') + 'Component';

                const selector = pascalToKebab(base);

                const relative = path.relative(
                    path.join(__dirname, '../angular/src/app/elements'),
                    full.replace('.ts', '')
                ).replace(/\\/g, '/');

                entries.push({
                    className,
                    importPath: './' + relative,
                    selector,
                });
            }
        }
    }

    scan(COMPONENTS_DIR);

    return entries;
}

function generateModule() {
    const components = scanComponents();

    const imports = components
        .map(c => `import { ${c.className} } from '${c.importPath}';`)
        .join('\n');

    const declarations = components
        .map(c => `        ${c.className}`)
        .join(',\n');

    const bootstrap = components
        .map(c =>
            `const ${c.selector.replace(/-/g, '_')} = createCustomElement(${c.className}, { injector: this.injector });
    if (!customElements.get('${c.selector}')) {
        customElements.define('${c.selector}', ${c.selector.replace(/-/g, '_')});
    }`
        )
        .join('\n\n    ');

    let template = fs.readFileSync(MODULE_TEMPLATE, 'utf8');

    template = template
        .replace('/*__IMPORTS__*/', imports)
        .replace('/*__DECLARATIONS__*/', declarations)
        .replace('/*__BOOTSTRAP__*/', bootstrap);

    fs.writeFileSync(MODULE_OUT, template);
    console.log('✔ elements.module.ts generated successfully.');
}

generateModule();
