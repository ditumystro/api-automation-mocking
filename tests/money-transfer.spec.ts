import { test, expect } from "@playwright/test";
import { loadJson, mockPostJson } from "../utils/mock-helpers";

test("Test A (Success) - mock POST /api/transfer -> 200", async ({ page }) => {
  const successBody = loadJson("data/transfer-success.json");

  await page.route("**/*", async (route) => {
    const req = route.request();
    await mockPostJson(route, req, "/api/transfer", 200, successBody);
  });

  await page.setContent(`
    <button id="send">Send</button>
    <div id="result"></div>
    <script>
      const result = document.getElementById("result");
      document.getElementById("send").addEventListener("click", async () => {
        const res = await fetch("/api/transfer", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ amount: 100, to: "bob" })
        });
        const data = await res.json();
        if (res.ok) result.textContent = "SUCCESS " + data.status + " " + data.transactionId;
        else result.textContent = "FAIL " + data.error;
      });
    </script>
  `);

  await page.click("#send");
  await expect(page.locator("#result")).toHaveText("SUCCESS success 12345");
});

test("Test B (Failure) - mock POST /api/transfer -> 400", async ({ page }) => {
  const failBody = loadJson("data/transfer-failure.json");

  await page.route("**/*", async (route) => {
    const req = route.request();
    await mockPostJson(route, req, "/api/transfer", 400, failBody);
  });

  await page.setContent(`
    <button id="send">Send</button>
    <div id="result"></div>
    <script>
      const result = document.getElementById("result");
      document.getElementById("send").addEventListener("click", async () => {
        const res = await fetch("/api/transfer", { method: "POST" });
        const data = await res.json();
        if (res.ok) result.textContent = "SUCCESS";
        else result.textContent = "FAIL " + data.error;
      });
    </script>
  `);

  await page.click("#send");
  await expect(page.locator("#result")).toHaveText("FAIL Insufficient funds");
});
