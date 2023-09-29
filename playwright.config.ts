import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  timeout: 60 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.ENVIRONMENT_NAME === 'preview' || process.env.ENVIRONMENT_NAME === 'production'
    ? 1
    : 0,
  workers: process.env.CI ? 1 : 6,
  reporter: 'html',
  use: {
    ...devices[process.env.DEVICE_NAME || 'Desktop Chrome'],
    // ...devices['iPhone 13'],
    // viewport: { width: 1250, height: 800 },
    launchOptions: {
      args: ["--start-maximized"],
      slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
    },
    screenshot: process.env.ENVIRONMENT_NAME === 'preview' || process.env.ENVIRONMENT_NAME === 'production'
      ? 'only-on-failure'
      : 'only-on-failure',

    headless: true,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 8000,
    navigationTimeout: 15000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    video: {
      mode: 'on',
      // size: { width: 1250, height: 800 }
    },

  },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: {
  //       ...devices['Desktop Chrome'],
  //       launchOptions: {
  //         args: ['--start-maximized'],
  //       }
  //     },
  //   },

  //   // {
  //   //   name: 'firefox',
  //   //   use: { ...devices['Desktop Firefox'] },
  //   // },

  //   // {
  //   //   name: 'webkit',
  //   //   use: { ...devices['Desktop Safari'] },
  //   // },

  //   /* Test against mobile viewports. */
  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: { ...devices['Pixel 5'] },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: { ...devices['iPhone 12'] },
  //   // },

  //   /* Test against branded browsers. */
  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: { channel: 'msedge' },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: { channel: 'chrome' },
  //   // },
  // ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});