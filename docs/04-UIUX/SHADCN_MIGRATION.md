# shadcn/ui Migration Guide

## 🚨 Policy: Exclusive Use of shadcn/ui
All UI components in SPMP-FTKIP must use **shadcn/ui** exclusively. No other UI component libraries are permitted.

## Migration Steps

### 1. Remove Headless UI
```bash
npm uninstall @headlessui/react
```

### 2. Install shadcn/ui (if not already installed)
```bash
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
# Add other components as needed
```

### 3. Replace Custom Components

#### Modal → shadcn Dialog
```tsx
// BEFORE (Modal.tsx - Headless UI)
import { Dialog, DialogPanel } from '@headlessui/react';

// AFTER (shadcn Dialog)
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
```

#### Dropdown → shadcn DropdownMenu
```tsx
// BEFORE (Dropdown.tsx - Headless UI)
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

// AFTER (shadcn DropdownMenu)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
```

#### Form Elements → shadcn Form/Input
```tsx
// BEFORE (TextInput.tsx)
<input type="text" className="..." />

// AFTER (shadcn Input)
import { Input } from "@/components/ui/input"
<Input type="text" className="..." />
```

### 4. Update Global Theme

Ensure `app.css` contains shadcn theme variables:
```css
/* Already present in app.css */
@import "tailwindcss";
@import "./themes.css";

/* shadcn/ui theme integration */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    /* ... other variables */
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode variables */
  }
}
```

### 5. Component Usage Examples

#### Button
```tsx
import { Button } from "@/components/ui/button"
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

#### Dialog (Modal)
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

#### Form
```tsx
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

### 6. File Structure
```
resources/js/Components/ui/     # shadcn/ui components
resources/js/Components/        # App-specific components (must use shadcn/ui)
resources/js/Pages/             # Pages (must use shadcn/ui)
```

### 7. Prohibited Practices
❌ Importing from `@headlessui/react`
❌ Using custom Modal, Dropdown, or other UI components
❌ Using Material UI, Ant Design, Bootstrap, or other UI libraries
❌ Creating new UI component libraries
❌ Inline styles for UI components (use Tailwind classes)

### 8. Validation
All forms must use React Hook Form + Zod with shadcn Form components.

## Current Migration Status
- [x] Documentation updated
- [ ] Headless UI removed from package.json
- [ ] Custom Modal.tsx replaced with shadcn Dialog
- [ ] Custom Dropdown.tsx replaced with shadcn DropdownMenu
- [ ] All form elements refactored to shadcn
- [ ] All imports updated
- [ ] Tests updated

## Resources
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Hook Form + Zod](https://react-hook-form.com/)
</ARG>