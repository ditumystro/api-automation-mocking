import { test, expect } from "@playwright/test";

test("SauceDemo E2E: login → add to cart → verify price format", async ({ page }) => {
  // Open site
  await page.goto("https://www.saucedemo.com/");

  // Login
  await page.fill('[data-test="username"]', "standard_user");
  await page.fill('[data-test="password"]', "secret_sauce");
  await page.click('[data-test="login-button"]');

  // Assert login success
  await expect(page).toHaveURL(/inventory\.html/);

  // Add the first product to cart and remember its name
  const firstItem = page.locator(".inventory_item").first();
  const itemName = await firstItem.locator(".inventory_item_name").innerText();

  await firstItem.locator('button[data-test^="add-to-cart"]').click();

  // Go to cart
  await page.click(".shopping_cart_link");
  await expect(page).toHaveURL(/cart\.html/);

  // Verify item is present in cart
  await expect(page.locator(".inventory_item_name")).toHaveText(itemName);

  // Fintech twist: verify price format ($ + digits + . + 2 decimals)
  const priceText = await page.locator(".inventory_item_price").innerText();
  expect(priceText).toMatch(/^\$\d+(\.\d{2})$/);
});
