# Garage Invoice Generator

A small Next.js tool that generates a PDF invoice from a Garage fire truck listing URL.

🔗 **Live App:** https://garage-invoice-generator-xi.vercel.app/

Users can paste a Garage listing link into the app, and the tool will:

- Extract the listing UUID from the URL
- Fetch the listing data from Garage's listing API
- Generate a structured PDF invoice
- Download the invoice directly in the browser

## Overview

This project was built as a take-home assignment to simulate a real Garage product workflow.

The goal was to create a simple internal-style tool that supports the "Get PDF invoice" use case for fire truck listings. Fire departments often need a printable invoice to present for board approval before purchase, so this tool turns listing data into a cleaner approval document.

## Features

- Paste a Garage listing URL into a simple web UI
- Extract listing ID from the URL automatically
- Fetch listing data from the Garage backend API
- Generate a PDF invoice using `@react-pdf/renderer`
- Download the generated invoice in the browser
- Clean, Garage-inspired UI styling

## Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **@react-pdf/renderer**

## Project Structure

```text
app/
  page.tsx
  api/
    generate-invoice/
      route.ts

components/
  ui/
    button.tsx
    card.tsx
    input.tsx
  pdf/
    invoice-document.tsx

lib/
  extract-listing-id.ts
  fetch-listing.ts
  utils.ts
```

## How It Works

### 1. Enter a listing URL

The user enters a Garage listing URL such as:

```text
https://www.shopgarage.com/listing/2013-Spartan-Sirius-MFD-105-5481a92e-6259-4ae7-b024-53af68b99848
```

### 2. Extract the listing ID

The app parses the UUID from the listing URL.

### 3. Fetch listing data

The API route uses the extracted UUID to fetch listing details from:

```text
GET https://garage-backend.onrender.com/listings/:listingId
```

### 4. Generate the PDF

The listing data is passed into a React PDF document template that renders a structured invoice with:

- Header metadata
- Vehicle summary
- Description
- Delivery and availability
- Pricing

### 5. Download or email the invoice

After the PDF is generated, the app supports two flows:

Download: the generated PDF is returned from the API route and downloaded in the browser
Email: the generated PDF is attached to an outbound email and sent using Resend

## Scripts
```text
npm run dev
npm run build
npm run start
npm run lint
```
