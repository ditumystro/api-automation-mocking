import { test, expect } from "@playwright/test";

test("Test A (Success) - mock POST /api/transfer -> 200", async ({ page }) => {
  await page.route("**/api/transfer", async (route) => {
    if (route.request().method() !== "POST") return route.fallback();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ status: "success", transactionId: "12345" }),
    });
  });

  await page.goto("http://127.0.0.1:3000/transfer.html");

  await page.click("#send");
  await expect(page.locator("#result")).toHaveText("SUCCESS success 12345");
});

test("Test B (Failure) - mock POST /api/transfer -> 400", async ({ page }) => {
  await page.route("**/api/transfer", async (route) => {
    if (route.request().method() !== "POST") return route.fallback();
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({ error: "Insufficient funds" }),
    });
  });

  await page.goto("http://127.0.0.1:3000/transfer.html");

  await page.click("#send");
  await expect(page.locator("#result")).toHaveText("FAIL Insufficient funds");
});
