# Page Design System: Graduation Invitation Photobook (Đặng Phương Thanh)

## Theme & Mood
- **Style:** Korean Vintage + Graduation + Youth Memories (Thanh xuân vườn trường)
- **Aesthetic:** Editorial Photobook, Warm Linen Paper, Polaroid Nostalgia, Gentle Romantic Elegance
- **Target Audience:** Bạn bè, thầy cô, người thân nhận thiệp mời tốt nghiệp trên smartphone và desktop.

## Color Palette (Korean Vintage & Nature Distilled)
- Background Base: `#FAF7F2` (Soft Ivory Paper)
- Background Surface / Card: `#FFFFFF` and `#FBF9F5` (Warm Cream White)
- Secondary Surface: `#F3EDE2` (Linen Parchment)
- Primary Text: `#382923` (Deep Espresso / Charcoal Brown, high contrast 11.2:1 against #FAF7F2)
- Secondary Text: `#68564D` (Warm Sepia Slate, contrast 5.8:1)
- Accent Sage Green: `#627560` (Pastel Pine / Youth Green)
- Sage Tint: `#E8EFE6` (Subtle tag badge background)
- Accent Burgundy / Wax: `#8B2635` / `#9E3244` (Traditional Wax Seal)
- Accent Warm Gold: `#C29B38` (Vintage Foil Accent)
- Card Border: `#E5DC CE` (Soft deckle edge border)

## Typography Pairings
- **Display & Headings:** 'Cormorant Garamond', 'Playfair Display', serif (Literary, editorial, luxury vintage)
- **Body & Captions:** 'Be Vietnam Pro', 'Plus Jakarta Sans', sans-serif (Clean modern readability, native Vietnamese diacritics)
- **Script / Signature Touch:** 'Alex Brush' or 'Great Vibes' / refined italic serif for name flourishes

## Spacing & Rhythm
- Spacing units: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- Generous editorial margins and intentional white space
- Max container width for photobook: `max-w-xl` (576px) on mobile, centered card layout with realistic tactile paper shadow `shadow-xl shadow-amber-900/10`

## Motion & Interaction (ui-ux-pro-max GSAP / CSS)
- Wax Seal click: 3D flap unfold, letter translation Y
- Falling sakura petals & golden dust particles on interactive canvas
- Smooth reveal on scroll with `power1.out`
- Immediate reduced-motion fallback when `prefers-reduced-motion` is active
- Vinyl record rotating animation when background audio is playing

## Accessibility (WCAG 2.1 AA)
- Primary text on cream background: > 10:1 (AAA)
- Secondary text on cream background: > 4.5:1 (AA)
- Touch targets >= 44x44px
- All interactive controls have accessible ARIA labels
- No pure emojis used as structural buttons (Lucide vector icons used)
- Forms provide explicit labels and error alerts
