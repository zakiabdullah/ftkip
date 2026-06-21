Hmm, the user has provided two clear sections: original code and suggested edit. They want me to apply the suggested edit to the original code exactly, without any explanations or summaries.

The original code is a brief design system description. The suggested edit is much more detailed, adding policies, principles, rules, permitted libraries, and a checklist. I need to merge them by replacing the original content with the suggested edit entirely.

I should ensure the output is only the modified code, no additional text. The suggested edit is already well-structured, so I'll just present it as is. I won't change any existing comments or structure beyond what's in the suggestion.

The key points from the suggested edit include the strict shadcn/ui policy, core design principles, component migration rules, permitted/prohibited libraries, and implementation checklist. All of these need to be included while maintaining the original's heading format.

I'll check that no other UI libraries are mentioned except shadcn/ui, Tailwind CSS, React Hook Form with Zod, Recharts, and Lucide React. The prohibited list must be clear. The checklist should remain as presented with the same items.

The output should be clean and match the suggested edit's formatting exactly, so I'll proceed to output just that.# Design System

## 🚨 Strict Policy: shadcn/ui Only
**All UI components MUST be implemented using shadcn/ui. No other UI libraries (Headless UI, Material UI, Ant Design, etc.) are permitted.**

## Core Design Principles
- **Component Library**: shadcn/ui (exclusively)
- **Theme**: Light and Dark Mode
- **Typography**: Inter Font (via Figtree fallback)
- **Color Palette**: OKLCH-based, neutral/slate professional tones
- **Borders**: `rounded-xl` for dashboard cards
- **Styling**: Tailwind CSS 4 with CSS variables
- **Validation**: React Hook Form + Zod (for forms)

## Component Migration Rules
1. **Headless UI → shadcn/ui**: Replace `@headlessui/react` with shadcn equivalents
2. **Custom Components → shadcn/ui**: Refactor all custom UI to use shadcn primitives
3. **Global CSS Variables**: All theming via CSS custom properties in `app.css`
4. **No Inline Styles**: Use Tailwind classes and shadcn component props only

## Permitted Libraries (with restrictions)
✅ **shadcn/ui** - All UI components
✅ **Tailwind CSS** - Styling
✅ **React Hook Form + Zod** - Form handling
✅ **Recharts** - Charts only
✅ **Lucide React** - Icons only
❌ **Headless UI** - PROHIBITED
❌ **Material UI** - PROHIBITED
❌ **Ant Design** - PROHIBITED
❌ **Bootstrap** - PROHIBITED
❌ **Custom UI Libraries** - PROHIBITED

## Implementation Checklist
- [x] Global theme via CSS variables (`app.css`)
- [x] shadcn/ui components in `resources/js/Components/ui/`
- [x] Remove all Headless UI imports
- [x] Replace custom Modal with shadcn Dialog
- [x] Replace custom Dropdown with shadcn DropdownMenu
- [x] Update all form elements to shadcn Form/Input/Select
- [x] Documentation updated to reflect shadcn-only policy
