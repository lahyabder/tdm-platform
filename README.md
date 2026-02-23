# TDM Demo Project

This is a modern demo application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Features
- **i18n Support**: Simple bidirectional localization using JSON dictionaries.
  - Arabic (RTL) natively supported.
  - French (LTR) supported.
- **Dynamic Layout**: Automatically shifts direction (`dir="rtl"` vs `dir="ltr"`) based on the active locale.
- **Mock Data**: Pre-configured with mock users, stats, and tables for the admin dashboard.
- **No Database**: Completely self-contained, no external database, Supabase, or backend required.

## Getting Started

1. **Install Dependencies** (if not already installed)
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```

3. **View the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.
   
   - The default routing redirects to the Arabic locale (`/ar`).
   - You can toggle the language in the Navbar.
   - Navigate to the **Admin Dashboard** (`/ar/admin` or `/fr/admin`) to view the mock data tables and statistics.
