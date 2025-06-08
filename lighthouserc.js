module.exports = {
  ci: {
    collect: {
      // Number of runs to do per URL
      numberOfRuns: 3,
      // Start the local server before collecting
      startServerCommand: 'bun run dev',
      // URL to start collecting from
      url: ['http://localhost:3000'],
      // Settings for the Lighthouse run
      settings: {
        // Use mobile emulation
        formFactor: 'mobile',
        // Use throttling
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        // Screen emulation
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
          disabled: false,
        },
        // Emulate a mobile device
        emulatedUserAgent:
          'Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
      },
    },
    assert: {
      // Assertions for performance metrics
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
    upload: {
      // Upload results to temporary public storage
      target: 'temporary-public-storage',
    },
  },
};
