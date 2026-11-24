
// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run tests one by one for recording
  fullyParallel: false,
  workers: 1,

  forbidOnly: !!process.env.CI,
  retries: 0,

  reporter: 'html',

  use: {
    baseURL: 'https://www.saucedemo.com/',

    // Show browser
    headless: false,

    // Capture screenshots when tests fail
    screenshot: 'only-on-failure',

    // Record trace on failure/retry
    trace: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          // slowMo: 1200,
          args: ['--start-maximized']
        },
      },
    },

    // Enable these later for cross-browser testing
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
