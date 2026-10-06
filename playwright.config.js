const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'ui', testMatch: /ui\.spec\.js/, use: { browserName: 'chromium' } },
    { name: 'api', testMatch: /api\.spec\.js/ },
  ],
});
