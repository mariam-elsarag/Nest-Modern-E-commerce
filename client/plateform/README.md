# Modern Ecommerce

Modern Ecommerce is a UI-based ecommerce application built with **React Router Framework** and **server-side rendering**, powered by a **JSON Server** backend.  
It includes essential ecommerce features like product listings, authentication, profile management (orders, wishlist, password change, account details, and address updates), cart, checkout, and home page.

---

## Features

- **Products Page** with filtering
- **Authentication** (Login, Register)
- **Profile Management**: Orders, Wishlist, Password change, Account details, Addresses
- **Cart & Checkout**
- **Home Page**
- **Server-Side Rendering with React Router**
- **Mock API using JSON Server**

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mariam-elsarag/modern-ecommerce.git
cd modern-ecommerce
```

### 2. Install dependencies

```
npm install
```

### 3.Run JSON Server

```
npx json-server --watch ./app/db/db.json --port 5000
```

### 4.Start development server

```
npm run dev
```

## Project Structure

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/          # Static assets
│   └── server/          # Server-side code
├── app/
│   ├── assets/
│   │   ├── icons/       # Icon files
│   │   ├── images/      # Image folders
│   │   ├── export.ts    # Export all images
│   │   └── styles/
│   │       ├── base/            # Sass config
│   │       │   └── _style.scss
│   │       ├── config/          # Tailwind config
│   │       │   └── tailwind_config.js
│   │       ├── lib/             # External library styles
│   │       │   ├── _toast.scss
│   │       │   └── _prime_dialog.scss
│   │       └── utils/           # Utilities
│   │           ├── _font.scss
│   │           └── _utils.scss
│   │
│   ├── common/
│   │   ├── constants/
│   │   │   ├── constant.ts
│   │   │   ├── validator.ts
│   │   │   ├── list/            # Example: menuList
│   │   │   └── types/           # Type definitions
│   │   └── utils/               # Reusable functions
│   │       ├── switchLang.ts
│   │       └── handleErrors.ts
│   │
│   ├── components/
│   │   ├── layout/              # Navbar, Footer, Layout parts
│   │   └── shared/              # UI Components (Filter, Badge, Card)
│   │
│   ├── db/
│   │   └── db.json              # JSON Server mock data
│   │
│   ├── hooks/
│   │   ├── useGetData.ts
│   │   ├── usePaginatedData.ts
│   │   └── useOutsideClick.ts
│   │
│   ├── layout/
│   │   └── AppLayout.tsx
│   │
│   ├── routes/
│   │   ├── auth/                # Login, Register, etc.
│   │   ├── profile/             # Profile-related pages
│   │   ├── checkout/
│   │   ├── cart/
│   │   ├── home/
│   │   └── products/
│   │
│   ├── services/
│   │   ├── apiUrl.ts            # API Endpoints
│   │   └── axiosInstance.ts     # Axios instance
│   │
│   ├── locales/
│   │   ├── en/                  # English translations
│   │   └── ar/                  # Arabic translations

```

## Tech Stack

- React Router Framework
- JSON Server
- React + TypeScript
- Sass
- Tailwind CSS
- Axios

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npx json-server --watch ./app/db/db.json --port 5000`
