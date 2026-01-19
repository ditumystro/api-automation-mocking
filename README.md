# 🧪 API Automation & Mocking with Playwright

This repository demonstrates **API automation testing using Playwright**, with a strong focus on **network request mocking**, **frontend–backend isolation**, and **deterministic test execution without a real backend server**.

It is designed to serve as:
- a **QA Automation technical exercise**
- a **Playwright API mocking example**
- an **interview-ready portfolio project**

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


SUCCESS success 12345

FAIL Insufficient funds

![Playwright Test Report](playwright-report/result.png)