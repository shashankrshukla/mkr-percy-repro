# 🎭 Playwright Test Examples

This repository contains examples of how to use [Playwright](https://playwright.dev) and [Typescript](https://www.typescriptlang.org/) to write end-to-end tests for web applications.

## 🛠 Built With

- [Playwright](https://playwright.dev)
- [Typescript](https://www.typescriptlang.org/)

## 🚀 Usage

Here are the most common options available in the command line.

- Run all the tests

  `npx playwright test`

- Run a single test file

  `npx playwright test tests/todo-page.spec.ts`

- Run a set of test files

  `npx playwright test test/specs/mkrbio/external/nicobar.spec.ts`

- Run files that have my-spec or my-spec-2 in the file name

  `npx playwright test my-spec my-spec-2`

- Run tests that are in line 42 in my-spec.ts

  `npx playwright test my-spec.ts:42`

- Run the test with the title

  `npx playwright test -g "add a todo item"`

- Run tests in headed browsers

  `npx playwright test --headed`

- Run all the tests against a specific project

  `npx playwright test --project=chromium`

- Disable parallelization

  `npx playwright test --workers=1`

- Choose a reporter

  `npx playwright test --reporter=dot`

- Run in debug mode with Playwright Inspector

  `npx playwright test --debug`

- Ask for help

  `npx playwright test --help`



To dry run a test in checkly server
  - npx checkly test

To deploy a test in checkly
  - npx checkly deploy


## 🚀 Config Details
Config1: https://showside.maker.co/test?id=KDWbWQqgM