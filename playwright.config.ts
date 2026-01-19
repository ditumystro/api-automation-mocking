import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: /.*\.(spec|test)\.(ts|js)/,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  reporter: [
    ["html", { open: "never" }]
  ],
  webServer: {
    command: "node ./node_modules/http-server/bin/http-server . -p 3000 -c-1 --silent",
    url: "http://127.0.0.1:3000/transfer.html",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
