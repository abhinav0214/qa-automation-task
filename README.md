# QA Automation Task

Playwright (JavaScript) tests for the DemoQA Book Store UI flow and the reqres.in user API.

## Setup
```
npm install
npx playwright install chromium
```

## Run
```
npm test
npm run test:ui
npm run test:api
```

Optional environment variables: `DEMOQA_USER`, `DEMOQA_PASS`, `REQRES_API_KEY`.

The UI test writes the book's Title, Author and Publisher to `output/book-details.txt`.
