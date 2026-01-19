# 🧪 API Automation & Mocking with Playwright

This repository demonstrates **API automation testing using Playwright**, with a strong focus on **network request mocking**, **frontend–backend isolation**.



---

## 📌 What This Project Covers

- ✅ API request interception and mocking (`page.route`)
- ✅ Success & failure scenario testing
- ✅ No backend required (fully mocked API)
- ✅ Static frontend served automatically by Playwright
- ✅ Playwright HTML test reports
- ✅ Clean and minimal project structure

---

## 📂 Project Structure

```text
api-automation-mocking/
├── data/
│   ├── transfer-success.json      # Mocked successful API response
│   └── transfer-failure.json      # Mocked failure API response
│
├── tests/
│   └── money-transfer.spec.ts     # Playwright test with API mocking
│
├── utils/
│   └── mock-helpers.ts            # (Optional) reusable helpers
│
├── transfer.html                  # Simple frontend used for testing
│
├── playwright.config.ts           # Playwright configuration + webServer
├── package.json
├── README.md
└── test-results/                  # Playwright reports (auto-generated)

---



# 📌Test Scenario Explained

The project tests a money transfer feature with two scenarios.

✅ Success Scenario

User clicks Send

Frontend sends POST /api/transfer
API is mocked to return 200 OK
UI displays:

SUCCESS success 12345

❌ Failure Scenario

User clicks Send
API is mocked to return 400 Bad Request
UI displays:


FAIL Insufficient funds

playwright-report/result.png

# ▶️How to Run the Tests

1️⃣Install dependencies

```text
npm install
---



2️⃣ Run Playwright tests

```text
npx playwright test
---



3️⃣ Open the HTML report

```test
npx playwright show-report
---




![Playwright Test Report](playwright-report/result.png)