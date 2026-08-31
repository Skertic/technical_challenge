# Product Catalog

A responsive Angular single-page application for browsing product data, viewing product details, and simulating product creation with the [Fake Store API](https://fakestoreapi.com/).

## Features

- Responsive product catalog with accessible product cards
- Client-side title/category search, category filtering, and sorting
- Product details with full descriptions, pricing, and rating information
- Strongly typed reactive product creation form
- Clear simulated-creation confirmation
- Skeleton loading, retryable error, not-found, and empty-filter states
- Lazy-loaded routes and keyboard-friendly navigation

## Tech stack

- Angular 21 with standalone components, Signals, and `OnPush` change detection
- PrimeNG 21.1.9 with the PrimeUIX Aura theme
- `@ngneat/query` 3.4 for API state and caching
- Angular Router and Reactive Forms
- Fake Store API
- Vitest through Angular's built-in unit-test runner

## Running locally

Requirements: a Node.js version supported by Angular 21 and npm.

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Build and testing

```bash
npm run build
npm test -- --watch=false
```

The repository does not currently include a lint command or lint configuration.

## Routes

- `/products` — catalog, search, filters, and sorting
- `/products/new` — simulated product creation
- `/products/:id` — product details

The root route and unknown URLs redirect to `/products`.

## Architecture

The application uses a compact, feature-based structure:

```text
src/app/
  core/
    api/                 Centralized Fake Store HTTP access
    models/              API domain models and creation DTOs
  features/products/
    data-access/         @ngneat/query definitions and stable keys
    facades/             Route-scoped page state and user actions
    pages/               Route-level catalog, detail, and create components
    ui/                  Product card and product form components
  shared/components/     Reusable page header, error, and empty states
```

Server state stays in `@ngneat/query`. The list, details, and categories use stable query keys and a five-minute `staleTime`, which avoids unnecessary repeat requests while navigating. Product creation uses a query mutation and exposes its pending/error state directly to the UI.

Signals hold only synchronous UI state such as the search term, category, sort order, submission attempt, and simulated success result. Derived product results use `computed()` and never mutate the cached API array.

Route-scoped facades coordinate routing, query state, local Signals, derived values, and user actions. Page components remain composition-only, while reusable UI components receive typed inputs and expose interactions through outputs. HTTP endpoint construction is isolated in `ProductApiService`.

## API limitation

Fake Store API `POST /products` operations are simulated. A successful response includes an ID, but the new product is not permanently stored and will not appear in a later catalog request. The UI states this explicitly and does not inject the response into the cached product list.

## Technical trade-offs

- The catalog fetches the complete small dataset once, then performs search, filtering, and sorting locally. Server-side pagination would be preferable for a large dataset.
- Product detail routing reads the route snapshot because links navigate between different route components in this assignment. A stream or router input binding would be appropriate if same-component parameter changes were a core flow.
- Ratings use lightweight semantic text and a star glyph rather than adding form-oriented rating behavior to read-only displays.
- The UI uses a focused set of PrimeNG controls and native semantic elements instead of wrapping every visual element in a component library abstraction.
- Query errors remain intact for `@ngneat/query`; user-friendly messages are selected only at the presentation boundary.

## Next steps

With more time, the next priorities would be end-to-end tests for keyboard and mobile flows, automated accessibility checks, image-error fallbacks, a configured lint task, and API schema validation for untrusted runtime responses.
