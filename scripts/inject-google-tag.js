const fs = require('fs');
const path = require('path');

const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || 'AW-17701069965';

if (!googleTagId) {
  console.log('NEXT_PUBLIC_GOOGLE_TAG_ID não encontrado, pulando injeção do tag');
  process.exit(0);
}

const outDir = path.join(__dirname, '..', 'out');
const indexHtmlPath = path.join(outDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.log('index.html não encontrado em out/, pulando injeção do tag');
  process.exit(0);
}

let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Script do Google Tag Manager para ser injetado no head
const googleTagScript = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${googleTagId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${googleTagId}');
</script>
<!-- End Google tag (gtag.js) -->
`;

// Remove qualquer script do Google Tag que possa estar no body ou head
// Remove scripts do Next.js que referenciam o Google Tag (formato do Next.js)
html = html.replace(/<script[^>]*>.*?self\.__next_s.*?googletagmanager\.com\/gtag\/js[^>]*.*?<\/script>/gis, '');
html = html.replace(/<script[^>]*>.*?self\.__next_s.*?gtag-init.*?<\/script>/gis, '');
html = html.replace(/self\.__next_s.*?googletagmanager\.com\/gtag\/js[^>]*.*?\]/gi, '');
html = html.replace(/self\.__next_s.*?gtag-init.*?\]/gi, '');

// Verifica se o tag já está no head corretamente (script completo, não apenas preload)
const headMatch = html.match(/<head>(.*?)<\/head>/is);
const hasCompleteTagInHead = headMatch && 
  headMatch[1].includes(`<script`) && 
  headMatch[1].includes(`googletagmanager.com/gtag/js?id=${googleTagId}`) &&
  headMatch[1].includes(`gtag('config', '${googleTagId}')`);

if (!hasCompleteTagInHead) {
  // Remove preload links do Google Tag se existirem (vamos adicionar o script completo)
  html = html.replace(/<link[^>]*rel="preload"[^>]*googletagmanager\.com\/gtag\/js[^>]*>/gi, '');
  
  // Insere o script logo após a tag <head>
  html = html.replace(
    /<head>/i,
    `<head>${googleTagScript}`
  );
  
  fs.writeFileSync(indexHtmlPath, html, 'utf8');
  console.log('✅ Google Tag injetado com sucesso no <head> do index.html');
} else {
  console.log('ℹ️  Google Tag já existe corretamente no <head> do HTML');
}

