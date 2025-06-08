const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse').default || require('lighthouse');
const fs = require('fs');

async function runLighthouse() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--remote-debugging-port=9222', '--no-sandbox', '--disable-setuid-sandbox'],
  });

  const result = await lighthouse('http://localhost:3000', {
    port: 9222,
    output: 'json',
    logLevel: 'info',
  });

  fs.writeFileSync('lighthouse-report.json', JSON.stringify(result.lhr, null, 2));

  console.log('\nLighthouse Results:');
  console.log('-------------------');
  console.log(`Performance: ${result.lhr.categories.performance.score * 100}`);
  console.log(`Accessibility: ${result.lhr.categories.accessibility.score * 100}`);
  console.log(`Best Practices: ${result.lhr.categories['best-practices'].score * 100}`);
  console.log(`SEO: ${result.lhr.categories.seo.score * 100}`);

  console.log('\nOpportunities for Improvement:');
  console.log('----------------------------');
  Object.values(result.lhr.audits).forEach(audit => {
    if (audit.score !== null && audit.score < 1) {
      console.log(`${audit.title}: ${audit.description}`);
    }
  });

  await browser.close();
}

runLighthouse().catch(console.error);
