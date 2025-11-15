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
<!-- Google Tag Manager -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${googleTagId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${googleTagId}');
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'wait_for_update': 500
  });
</script>
<!-- End Google Tag Manager -->
`;

// Insere o script logo após a tag <head>
if (!html.includes(`gtag/js?id=${googleTagId}`)) {
  html = html.replace(
    /<head>/i,
    `<head>${googleTagScript}`
  );
  
  fs.writeFileSync(indexHtmlPath, html, 'utf8');
  console.log('✅ Google Tag injetado com sucesso no index.html');
} else {
  console.log('ℹ️  Google Tag já existe no HTML');
}

