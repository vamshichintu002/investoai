# Investment Dashboard Feature

This feature provides a comprehensive investment portfolio dashboard with the following capabilities:

## Components
- Visual and text-based portfolio views
- Portfolio allocation charts
- Market analysis
- Investment recommendations
- Interactive chat widget
- Dark/light theme support

## Usage

```tsx
import { InvestmentDashboard, ThemeProvider } from '@/features/investment';
import type { InvestmentData } from '@/features/investment';

function App() {
  const handleDataUpdate = (newData: InvestmentData) => {
    console.log('Investment data updated:', newData);
  };

  return (
    <ThemeProvider>
      <InvestmentDashboard
        onDataUpdate={handleDataUpdate}
        theme="dark"
      />
    </ThemeProvider>
  );
}
```

## Directory Structure

```
features/investment/
├── components/       # UI components
├── contexts/        # Theme and data contexts
├── hooks/           # Custom hooks
├── services/        # API and data services
├── types/           # TypeScript types
└── utils/           # Helper functions
```

## Required Dependencies

Make sure your project has these dependencies:
- react
- react-dom
- clsx
- lucide-react
- recharts
- tailwindcss
- @tailwindcss/typography

## Tailwind Configuration

Add this to your tailwind.config.js:

```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/features/investment/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [
    require('@tailwindcss/typography')
  ]
}
```