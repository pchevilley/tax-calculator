# Income Tax Calculator

This repository contains a small application for calculating income tax, built as a monorepo using pnpm workspaces.
![image](https://github.com/user-attachments/assets/6229ae6e-3ee3-4496-a95a-757fcee70a9c)


## Project Structure

The monorepo is organized as follows:

```
tax-calculator/
├── apps/
│   └── tax-calculator/     # The main application and its end-to-end (E2E) tests
├── packages/
│   ├── utils/              # Shared utility functions
│   ├── api-service/        # Handles network calls to fetch tax data
│   └── design-system/      # Reusable UI components (theme, buttons, inputs...)
├── pnpm-workspace.yaml     # pnpm workspace configuration
└── package.json            # Root package.json
```
## Technologies Used

* **Frontend:** React 19, Vite
* **Testing:** Vitest, Cypress (e2e)
* **Build Tool:** Vite
* **Monorepo Management:** pnpm workspaces

## Prerequisites

In order to run the API locally, please follow these instructions:

```bash
docker pull ptsdocker16/interview-test-server
docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server
```

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/pchevilley/tax-calculator.git
    cd tax-calculator
    ```

2.  **Install dependencies using pnpm:**

    ```bash
    pnpm install
    ```

3.  **Run the application:**

    ```bash
    pnpm run dev
    ```

    This will start the development server for the `tax-calculator` application. By default, the application will be served on the port 5173.

4.  **Run tests (if applicable):**

    ```bash
    pnpm run test
    ```

5.  **Run E2E tests (if applicable):**

    ```bash
    pnpm run e2e
    ```

## Design System

The `design-system` package provides a set of reusable UI components, including:

* `Button`: A customizable button component.
* `Input`: A text or number input component.
* `Select`: A select dropdown.

This allows for consistent styling and component reuse throughout the application.

## API Service

The `api-service` package handles network requests for fetching tax data. It is built on top of the fetch API with pattern in place to automatically retry the request in case of an error.

## Utils

The `utils` package contains shared utility functions used across the application such as calculating the taxes for a given income.

## Potential Improvements

* Unit test the UI components in the application
* Add Storybook in the Design System package to test and document the individual components
* Setup a CI/CD strategy with production builds
