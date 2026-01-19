import { test, expect } from "@playwright/test";
import successBody from "../data/transfer-success.json";
import failBody from "../data/transfer-failure.json";

test("Test A (Success) - mock POST /api/transfer -> 200", async ({ page }) => {
  await page.route("**/api/transfer", async (route) => {
    if (route.request().method() !== "POST") return route.fallback();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(successBody),
    });
  });

  await page.setContent(`
    <button id="send">Send</button>
    <div id="result"></div>
    <script>
      const result = document.getElementById("result");
      document.getElementById("send").addEventListener("click", async () => {
        const res = await fetch("/api/transfer", { method: "POST" });
        const data = await res.json();
        result.textContent = res.ok
          ? "SUCCESS " + data.status + " " + data.transactionId
          : "FAIL " + data.error;
      });
    </script>
  `);

  await page.click("#send");
  await expect(page.locator("#result")).toHaveText("SUCCESS success 12345");
});

test("Test B (Failure) - mock POST /api/transfer -> 400", async ({ page }) => {
  await page.route("**/api/transfer", async (route) => {
    if (route.request().method() !== "POST") return route.fallback();
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify(failBody),
    });
  });

  await page.setContent(`
    <button id="send">Send</button>
    <div id="result"></div>
    <script>
      const result = document.getElementById("result");
      document.getElementById("send").addEventListener("click", async () => {
        const res = await fetch("/api/transfer", { method: "POST" });
        const data = await res.json();
        result.textContent = res.ok ? "SUCCESS" : "FAIL " + data.error;
      });
    </script>
  `);

  await page.click("#send");
  await expect(page.locator("#result")).toHaveText("FAIL Insufficient funds");
});
