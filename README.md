# GoodsShop-Frontend

Frontend for the GoodsStore application — an Angular single-page app that talks to the [GoodsStore-Backend](https://github.com/teafr/GoodsStore-Backend) (Express + MongoDB).

## Table of contents

* [Project overview](#project-overview)
* [Tech stack](#tech-stack)
* [Features](#features)
* [Prerequisites](#prerequisites)
* [Quick start](#quick-start)
* [Environment & runtime config](#environment--runtime-config)
* [Proxy to backend (dev)](#proxy-to-backend-dev)
* [Main components & services summary](#main-components--services-summary)
* [Authentication + tokens notes](#authentication--tokens-notes)
* [Cart persistence & signals](#cart-persistence--signals)

## Project overview

This Angular app is the client for the GoodsStore e‑commerce backend. It provides product browsing, filtering, pagination, authentication (register/login), cart management, checkout and a profile area. The app uses reactive patterns (Angular signals / computed) and standalone components where convenient.

> The README assumes the backend API base is configured through an `environment` file (e.g. `environment.apiUrl`) and that the backend uses cookie-based refresh tokens (so client calls refresh with `withCredentials: true`).

## Tech stack

* Angular — recommended Angular 16+ (signals) or newer
* TypeScript
* RxJS
* Angular Material (optional UI components)
* SCSS for styling
* HttpClient for API calls

## Features

* Product list with filtering, sorting and pagination
* Product detail page
* Authentication (register/login) with JWT access token and refresh cookie
* Cart (stored in `localStorage`) with quantity and checkout flow
* Checkout creates sales (bulk insert supported)
* Profile page with editable user data
* Interceptor handles token attach & refresh

## Prerequisites

* Node.js 18+ (or current LTS)
* npm or yarn
* Angular CLI (optional but useful): `npm i -g @angular/cli`
* Backend running locally (or a working API URL in `environment`)

## Quick start

1. Clone the repository

```bash
git clone https://github.com/teafr/GoodsShop-Frontend.git
cd GoodsShop-Frontend
```

2. Install dependencies

```bash
npm install
```

3. Configure API base in `src/environment/environment.ts` (see example below)

4. Start dev server

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200)

## Environment & runtime config

Use Angular environment files (recommended):

* `src/environment/environment.ts` (dev)
* `src/environment/environment.prod.ts` (production)

Example `environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  authKey: 'goodsstore_token',
  cartKey: 'goodsstore_cart'
};
```

## Main components & services summary

Components:

* `Header` — search, login/register or logout buttons
* `ProductList` — filtering, pagination, add to cart, more info about specific product
* `ProductDetails` — product page
* `Cart` — list items, change qty, remove, checkout button
* `Checkout` — create sales (bulk insert)
* `Thank you` — displaying after checkout
* `Register` / `Login` — forms with validators
* `Profile` — user info, "Edit" button and sales history
* `Edit profile` — form for editing user info
* `Footer` — at the end of the page 
* `Navigation menu` — options: products, cart, profile (if user authenticated) and checkout (if user authenticated)

Services:

* `AuthService` — register, login, logout, refreshTokens, getUser
* `ProductService` — getProducts, getProductById
* `CartService` — signal-based cart storage (localStorage), add/remove/update
* `SaleService` — createSales (single & multiple), get sales by user

## Authentication + tokens notes

* Access token held in `localStorage`; refresh token is an httpOnly cookie set by backend.
* Interceptor attach `Authorization: Bearer <token>` and call `/auth/refresh` with `{ withCredentials: true }` when access token expired.
* Pattern: on 401 → single refresh → if refresh fails → logout and redirect to `/login`.

## Cart persistence & signals

* Cart is stored in `localStorage` under `environment.cartKey` and mirrored by a `signal<CartItem[]>` in `CartService`.
* UI components should read `cartService.cartItemsSig()` or expose it as a signal and use computed values for totals so UI updates immediately when cart changes.

