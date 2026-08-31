---
name: Velvet & Gold
colors:
  surface: '#290810'
  surface-dim: '#290810'
  surface-bright: '#562d35'
  surface-container-lowest: '#22040b'
  surface-container-low: '#331018'
  surface-container: '#38141c'
  surface-container-high: '#441e26'
  surface-container-highest: '#512830'
  on-surface: '#ffd9de'
  on-surface-variant: '#d8c1c3'
  inverse-surface: '#ffd9de'
  inverse-on-surface: '#4c242c'
  outline: '#a08c8e'
  outline-variant: '#534345'
  surface-tint: '#ffb2bd'
  primary: '#ffb2bd'
  on-primary: '#571c29'
  primary-container: '#4a1220'
  on-primary-container: '#c77784'
  inverse-primary: '#8f4956'
  secondary: '#ecc078'
  on-secondary: '#432c00'
  secondary-container: '#5f4103'
  on-secondary-container: '#d9ae69'
  tertiary: '#c8c6c2'
  on-tertiary: '#31302d'
  tertiary-container: '#272724'
  on-tertiary-container: '#8f8e8a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9de'
  primary-fixed-dim: '#ffb2bd'
  on-primary-fixed: '#3b0615'
  on-primary-fixed-variant: '#72323f'
  secondary-fixed: '#ffdeac'
  secondary-fixed-dim: '#ecc078'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#5f4103'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#290810'
  on-background: '#ffd9de'
  surface-variant: '#512830'
typography:
  display-romantic:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-romantic-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '400'
    lineHeight: '1.1'
  headline-gold:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.1em
  body-classic:
    fontFamily: EB Garamond
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-classic-italic:
    fontFamily: EB Garamond
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: EB Garamond
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.2em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  margin-mobile: 2rem
  margin-desktop: 10vw
  section-gap: 5rem
  element-gap: 1.5rem
  fine-line-weight: 1px
---

## Brand & Style
The design system embodies an atmosphere of timeless romance and high-end exclusivity. The target audience is discerning guests attending a formal, black-tie event. The UI should evoke an emotional response of warmth, prestige, and anticipation.

The design style is **Tactile / Skeuomorphic** with a heavy influence of **Minimalism**. It leverages the digital medium to simulate physical high-end stationery. Key characteristics include:
- **Depth through Texture:** Use of subtle noise and gradient overlays to mimic velvet paper stock.
- **Metallic Finishes:** Gold elements use multi-stop gradients to simulate light reflecting off foil stamping.
- **Generous Breathing Room:** High "white space" (or "burgundy space") ratios to ensure every element feels intentional and curated.

## Colors
The palette is rooted in a deep, regal atmosphere. 
- **Primary (#4a1220):** A rich burgundy used for the main canvas, representing the velvet base.
- **Secondary (#c9a05c):** An antique gold used exclusively for accents, borders, and calligraphic highlights.
- **Tertiary (#fdfaf5):** A soft cream used for "paper" surfaces and primary text contrast against the dark background.
- **Neutral (#2d0b13):** A darker shade of wine used for deep shadows and subtle textural transitions.

## Typography
The typography system relies on a high-contrast pairing between an editorial serif and a graceful calligraphic feel.

**Playfair Display** serves as the primary display face. For names and main titles, it should be set with high contrast and occasionally italicized to mimic traditional script flows. 

**EB Garamond** provides the functional elegance required for event details, RSVPs, and directions. It must always be set with generous line heights to maintain a "literary" feel. 

For all uppercase labels, increase letter-spacing significantly to 0.15em or 0.2em to emulate premium engravings.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy centered on a vertical "aisle" flow. On mobile, content is strictly centered to maintain a sense of formal balance. 

- **Vertical Rhythm:** Sections are separated by significant vertical gaps (80px+) to allow the user to appreciate the background textures.
- **Containment:** Content cards should not span the full width of the screen; they should be inset with wide margins to resemble physical invitations placed on a table.
- **Decorative Lines:** Use the `fine-line-weight` for gold separators. These lines should often start from 0% opacity, peak at 100% in the center, and fade back to 0% at the edges.

## Elevation & Depth
This system uses **Tonal Layers** combined with **Ambient Shadows** to create a physical presence.

- **The Base:** The burgundy background has a subtle radial gradient (lighter in the center) and a fine noise texture to simulate fabric.
- **The Cards:** Cream-colored surfaces (Tertiary) use a "Soft Rise" shadow—very wide blur (30px+), low opacity (15%), with a slight vertical offset to suggest the paper is hovering slightly above the velvet.
- **Wax Seals:** Elements intended to look like wax seals should use inner shadows and a 1px highlight on the top edge to create a 3D pressed effect.
- **Gold Foiling:** Gold text or lines should have a subtle drop shadow (1px) with the color of the primary background (#4a1220) to make them pop as if embossed.

## Shapes
The shape language is conservative and traditional.
- **Cards:** Use `rounded-lg` (0.5rem) to mimic the slightly softened corners of premium heavyweight cardstock.
- **Decorative Frames:** Gold borders should utilize double-line strokes or ornate "corner-only" brackets.
- **Buttons:** Buttons are either sharp-edged (0px) for a formal look or fully pill-shaped if they contain a "Wax Seal" icon.

## Components
- **Buttons:** Primary buttons should be solid Gold (#c9a05c) with Cream text. Secondary buttons should be Ghost style with a 1px Gold border.
- **RSVP Inputs:** Use a single bottom border (Gold) rather than a full box. Labels should hover above the line in `label-caps`.
- **Cards:** "Invitation Cards" are Cream with a 1px Gold inset border (8px from the edge).
- **Wax Seal Toggle:** For binary choices (e.g., Attending/Not Attending), use a custom radio button that looks like a circular wax seal when selected.
- **Transitions:** All page transitions should use a slow "Fade & Rise" effect (0.8s, ease-out) to reinforce the graceful brand personality.
- **Interactive Maps:** Styled with a custom desaturated "Sepia" filter to match the gold/cream palette.