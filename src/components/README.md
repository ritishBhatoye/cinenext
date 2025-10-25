# Netflix-Themed Design System

A comprehensive design system built with Netflix's visual identity, organized into atoms and elements for maximum reusability and maintainability.

## Structure

```
src/components/
├── atoms/           # Single HTML tag components
│   ├── text.tsx     # Typography component
│   ├── icon.tsx     # Icon wrapper
│   ├── image.tsx    # Image component with variants
│   ├── link.tsx     # Link component with Netflix styling
│   └── index.ts     # Atoms exports
├── elements/        # Reusable UI components
│   └── index.ts     # Elements exports (re-exports from ui/)
└── ui/              # shadcn/ui components (Netflix-themed)
    ├── button.tsx   # Button with Netflix variants
    ├── input.tsx    # Input with Netflix styling
    ├── card.tsx     # Card component
    └── label.tsx    # Label component
```

## Design Principles

### Atoms

- **Single Responsibility**: Each atom represents one HTML tag
- **Highly Reusable**: Can be used across different contexts
- **Minimal Logic**: Focus on presentation and basic variants

### Elements

- **Composite Components**: Built from atoms and basic HTML
- **Business Logic**: Can contain interaction logic
- **Consistent API**: Standardized props and behaviors

## Netflix Color Palette

```css
--netflix-red: #e50914; /* Primary brand color */
--netflix-black: #000000; /* Background */
--netflix-dark-gray: #141414; /* Card backgrounds */
--netflix-gray: #333333; /* Secondary backgrounds */
--netflix-light-gray: #564d4d; /* Borders and muted elements */
--netflix-white: #ffffff; /* Text and foregrounds */
--netflix-hover: #f40612; /* Hover states */
--netflix-text-secondary: #b3b3b3; /* Secondary text */
--netflix-text-muted: #808080; /* Muted text */
```

## Usage Examples

### Atoms

```tsx
import Text from '@/components/atoms/text';
import Link from '@/components/atoms/link';
import Image from '@/components/atoms/image';

// Typography
<Text as="h1" size="3xl" variant="netflix">
  CineNext
</Text>

<Text variant="secondary" size="sm">
  Secondary text
</Text>

// Links
<Link variant="netflix" external>
  External Link
</Link>

// Images
<Image
  variant="netflix-poster"
  src="/poster.jpg"
  alt="Movie poster"
/>
```

### Elements

```tsx
import { Button, Card, Input } from '@/components/elements';

// Netflix-themed buttons
<Button variant="netflix" size="lg">
  Watch Now
</Button>

<Button variant="netflix-outline">
  Add to List
</Button>

// Form elements
<Input
  type="email"
  placeholder="Email address"
/>

// Cards
<Card>
  <CardHeader>
    <CardTitle>Movie Title</CardTitle>
    <CardDescription>Movie description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

## Utility Classes

### Netflix-specific utilities

```css
.netflix-gradient      /* Netflix red gradient background */
/* Netflix red gradient background */
.netflix-text-gradient /* Netflix red gradient text */
.netflix-shadow        /* Netflix red shadow effect */
.netflix-hover; /* Netflix hover animation */
```

## Component Variants

### Button Variants

- `default` - Netflix red background
- `netflix` - Netflix gradient with hover effects
- `netflix-outline` - Outlined Netflix red button
- `outline` - Standard outline
- `ghost` - Transparent background
- `link` - Link-style button

### Text Variants

- `default` - Standard foreground color
- `muted` - Muted text color
- `secondary` - Netflix secondary text color
- `netflix` - Netflix gradient text

### Sizes

- `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl` for text
- `sm`, `default`, `lg`, `xl` for buttons
- `xs`, `sm`, `base`, `lg`, `xl` for icons

## Best Practices

1. **Use Atoms for Single Elements**: When you need just one HTML tag with styling
2. **Use Elements for Complex Components**: When you need multiple atoms or complex logic
3. **Consistent Naming**: Follow the established variant and size naming conventions
4. **Accessibility**: All components include proper ARIA attributes and keyboard navigation
5. **Performance**: Components are optimized with React.forwardRef and proper prop spreading

## Development Guidelines

- Keep atoms simple and focused on single HTML tags
- Elements can be more complex but should remain reusable
- Always use the `cn()` utility for className merging
- Include TypeScript interfaces for all props
- Use React.forwardRef for proper ref forwarding
- Follow the established color palette and design tokens
