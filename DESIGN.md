# Design System Strategy: The Ethereal Grooming Experience

## 1. Overview & Creative North Star

**Creative North Star: "The Digital Concierge"**

This design system is engineered to transform the utility of booking a barber into a high-end, editorial experience. We are moving away from the "grid-and-border" constraints of traditional SaaS platforms. Instead, the UI is treated as an ethereal, three-dimensional space where content floats on layers of light and glass.

By utilizing **intentional asymmetry** (e.g., overlapping cards and floating "Live Availability" badges) and a **dynamic typographic scale**, we create a sense of movement and premium "breathing room." The interface should never feel crowded; it should feel like a curated gallery where the user’s next appointment is the masterpiece.

---

## 2. Colors

The palette is anchored in a sophisticated "Violet-to-Deep-Amethyst" spectrum. It avoids harsh blacks and whites in favor of tinted neutrals that maintain tonal depth.

### Color Tokens (Material Design Convention)
*   **Primary:** `#652fe7` (The source of energy and action)
*   **Primary Container:** `#a98fff` (Used for soft highlights and active states)
*   **Surface:** `#fcf4ff` (The canvas; a warm, purple-tinted off-white)
*   **Surface Container (Lowest to Highest):** `#ffffff` to `#e9d5ff`
*   **On-Surface:** `#37274d` (Deep plum for maximum readability without the harshness of pure black)

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through:
1.  **Background Shifts:** Placing a `surface-container-low` component on a `surface` background.
2.  **Tonal Transitions:** Using the gradient spectrum to naturally guide the eye from one content block to the next.

### Signature Textures & Glass
To achieve the "Futuristic Airy" look, use **Glassmorphism** for floating UI elements (like the "Upcoming Booking" card). 
*   **Recipe:** Apply a semi-transparent `surface-container-lowest` background with a `backdrop-blur` of 20px–40px. 
*   **Gradients:** Main CTAs must use a linear gradient from `primary` (#652fe7) to `primary-container` (#a98fff) at a 135-degree angle to provide a luminous, high-end "soul."

---

## 3. Typography

The system utilizes **Plus Jakarta Sans**, a modern sans-serif with a geometric touch that feels both technical and approachable.

*   **Display (Lg/Md/Sm):** Used for "Hero" statements. These should be set with tight letter-spacing (-0.02em) to feel like a high-fashion magazine.
*   **Headline & Title:** Used to anchor sections. The contrast between a `headline-lg` and `body-md` creates an authoritative hierarchy.
*   **Body (Lg/Md/Sm):** Optimized for legibility with generous line heights (1.5x–1.6x).
*   **Labels:** Reserved for metadata, like "Expert" tags or "Live" status. Always uppercase with slight letter-spacing (+0.05em) for a "luxury tag" feel.

---

## 4. Elevation & Depth

In this system, depth is a physical property. We prioritize **Tonal Layering** over shadows.

*   **The Layering Principle:** Stack `surface-container` tiers. A card (Lowest: #ffffff) sitting on a section (Low: #f8edff) creates a soft, natural lift that mimics fine stationery.
*   **Ambient Shadows:** For elements that truly "float" (e.g., floating action buttons or modal cards), use shadows with a blur radius of at least 40px and an opacity of 4%-8%. The shadow color must be a tinted `on-surface` (Deep Plum), never pure grey.
*   **The "Ghost Border" Fallback:** If a container requires an edge for accessibility, use a "Ghost Border": the `outline-variant` (#baa4d3) at **15% opacity**.
*   **Corner Radii:** Embrace the "Large Radius" ethos.
    *   **Small (Buttons):** 0.5rem
    *   **Medium (List Items):** 1.5rem
    *   **Large (Feature Cards):** 2rem
    *   **Extra Large (Sections):** 3rem

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), 0.5rem radius, with a subtle internal "glow" (white 10% opacity top-border).
*   **Secondary (Glass):** Semi-transparent white with 20px backdrop blur and a `Ghost Border`.

### Input Fields
*   **Style:** No background fill; only a soft `surface-container` background with a `Ghost Border`. 
*   **Focus State:** The border transitions to a soft `primary` glow.

### Cards & Lists
*   **Anti-Divider Rule:** Explicitly forbid 1px dividers between list items. Instead, use vertical white space (from the Spacing Scale) or alternate between `surface-container-low` and `surface-container-lowest` to distinguish items.

### Specialist Component: The "Barber Orb"
A specialized avatar component for barbers. It features a circular image with a `primary` ring that glows when the barber is "Live" or "Available Today."

---

## 6. Do’s and Don’ts

### Do
*   **DO** use overlapping elements. A floating badge overlapping a card edge creates a sophisticated, multi-layered feel.
*   **DO** use whitespace as a functional tool. If a screen feels "empty," increase the typography scale rather than adding more borders or boxes.
*   **DO** ensure the `T` logo mark is used as a decorative watermark in backgrounds at 5% opacity to reinforce brand presence.

### Don’t
*   **DON'T** use 100% opaque, high-contrast borders. It breaks the "Airy" illusion.
*   **DON'T** use standard grey shadows. They make the vibrant purple theme look "muddy."
*   **DON'T** use sharp corners. Every corner must feel "sculpted" and soft.
*   **DON'T** use pure black (#000000) for text. It creates too much visual vibration against the violet backgrounds.