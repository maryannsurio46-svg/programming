# QuickCart – React frontend

Login (with the two sign-in overlays) and Checkout (left column scrolls, right column stays fixed), built to match the reference screenshots at **1728 × 1117**. All styles are in `src/index.css`.

## Install
```bash
npm install
```

## Run
```bash
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173). To check the reference
size, open DevTools device toolbar and set a custom viewport of 1728 × 1117.

## Build
```bash
npm run build && npm run preview
```

## Routes
- `/` Login. "Continue with Shop" opens the "Sign in with Shop" overlay; typing an email and clicking the arrow opens the "Sign in" overlay. Both lead to `/checkout` with the email prefilled.
- `/checkout` Checkout form with order summary.

## Assets (src/assets)
`quickcart-logo.png`, `grocery-woman.png` and `ground-pork.png` were cropped from the
screenshots, so they are low resolution. Replace them with the originals using the
same file names and nothing else needs to change.

## Scaling
All sizes use `calc(var(--px) * N)`, where N is the pixel value at 1728 px wide.
`--px` is 1px at 1728 px, scales with the viewport from 1200 to 1728 px, and is
fixed at 1px below 1200 px where the tablet and mobile layouts apply.

## Demo behavior
- Discount codes: `QUICKCART10` (10% off) and `FRESH5` (5% off).
- Shipping shows "Enter Shipping Address" until address, barangay and municipality are filled, then a flat ₱49.00.
- Place Order validates required fields; there is no backend.
