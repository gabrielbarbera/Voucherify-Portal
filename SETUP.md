# Voucherify Portal - Setup Guide

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Initial Setup

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
Voucherify-Portal/
├── components/          # Reusable React components
│   ├── Layout.tsx      # Main layout component
│   ├── StoreLayout.tsx # Store-specific layout
│   └── ui/            # UI component library
├── pages/             # Page components
│   ├── Dashboard.tsx
│   ├── CreateVoucher.tsx
│   ├── Login.tsx
│   └── store/        # Demo store pages
├── services/          # API service layer
│   └── voucherService.ts
├── App.tsx           # Main app component with routing
├── index.tsx         # Application entry point
└── types.ts          # TypeScript type definitions
```

## Configuration Files

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript compiler configuration
- `package.json` - Project dependencies and scripts

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, you can change it in `vite.config.ts`:

```typescript
server: {
  port: 3000, // Change to your preferred port
}
```


