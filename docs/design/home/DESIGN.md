---
name: Warmth & Care Clinical
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#5a4044'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#8e6f74'
  outline-variant: '#e3bdc3'
  surface-tint: '#bc004f'
  primary: '#b0004a'
  on-primary: '#ffffff'
  primary-container: '#d81b60'
  on-primary-container: '#fff2f3'
  inverse-primary: '#ffb2bf'
  secondary: '#964261'
  on-secondary: '#ffffff'
  secondary-container: '#fe97b9'
  on-secondary-container: '#792b4a'
  tertiary: '#ab1155'
  on-tertiary: '#ffffff'
  tertiary-container: '#cc326e'
  on-tertiary-container: '#fff2f4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9de'
  primary-fixed-dim: '#ffb2bf'
  on-primary-fixed: '#3f0016'
  on-primary-fixed-variant: '#90003b'
  secondary-fixed: '#ffd9e2'
  secondary-fixed-dim: '#ffb0c9'
  on-secondary-fixed: '#3e001e'
  on-secondary-fixed-variant: '#792b4a'
  tertiary-fixed: '#ffd9e1'
  tertiary-fixed-dim: '#ffb1c5'
  on-tertiary-fixed: '#3f001a'
  on-tertiary-fixed-variant: '#8f0045'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an empathetic, reassuring, and clinically credible environment dedicated to breast cancer awareness, risk screening, and holistic patient support. 

### Brand Personality & Emotional Impact
- **Empathy & Warmth:** Interfaces prioritize psychological safety, removing clinical coldness while avoiding excessive sentimentality.
- **Dignity & Clarity:** High legibility and soft visual pacing reduce anxiety during screening questionnaires and risk assessments.
- **Trust & Authority:** Balanced structure and clean lines convey medical credibility and rigorous guidance.

### Design Movement
The aesthetic blends **Modern Humanist Minimalism** with **Soft Ambient Tactility**. It uses generous whitespace, gentle blush undertones, ultra-soft layered elevations, and generous organic curves inspired by caring touch and the ribbon form in the visual mark.

## Colors

The palette balances empathetic rose tones with clinical clarity and high contrast for accessibility.

- **Primary (`#D81B60`):** Core action color used for critical interactions, key triage indicators, and focal points.
- **Secondary (`#F48FB1`):** Warm accent for supportive badges, secondary highlights, soft borders, and gentle progress meters.
- **Tertiary (`#AD1457`):** Deep berry for high-contrast active states, focused interactive elements, and accessible text links against light backgrounds.
- **Neutral Tone (`#1F2937`):** Slate charcoal for primary text hierarchy, paired with neutral slate-gray (`#374151`) for secondary copy.
- **Atmospheric Tinting:** Canvas surfaces employ soft rose pastels (`#FDF2F4`, `#FCE7F0`) alongside muted clinical neutrals (`#FFFFFF`, `#F9FAFB`, `#F3F4F6`) to maintain depth without jarring contrast.

## Typography

The type system blends friendly, geometric warmth with crisp clinical legibility.

- **Plus Jakarta Sans (Headlines & Labels):** Applied across all headers, titles, metrics, and interactive controls. Its rounded counters provide an open, human presence that mitigates medical stress.
- **Inter (Body & Screening Copy):** Applied across all analytical content, multi-step questionnaires, and explanatory tooltips to ensure maximum optical clarity across varied screen densities.
- **Rhythm & Accessibility:** Body text line heights are kept at 1.5x minimum to ensure unhurried reading for users navigating sensitive health decisions.

## Layout & Spacing

The layout model uses a responsive fluid grid paired with controlled content widths to prevent cognitive fatigue during triage.

### Breakpoints & Layout Grid
- **Mobile (< 768px):** 4-column fluid grid, 16px (`gutter-sm`) gutters, and 16px (`margin-sm`) margins. Single-column stacked triage cards and full-width touch surfaces.
- **Tablet (768px - 1024px):** 8-column grid, 24px (`gutter`) gutters, and 24px (`margin`) margins. Two-column question layouts with anchored progress bars.
- **Desktop (> 1024px):** 12-column grid capped at a maximum width of 1280px, with 32px (`gutter-lg`) gutters and 48px (`margin-lg`) margins. Questionnaires and risk summaries sit within centered 8-column reading zones to optimize comprehension.

### Spacing Principles
Internal component padding relies strictly on the `space-*` scale. Ample internal breathing room (using `space-lg` to `space-xl`) inside assessment cards ensures sensitive questions feel approachable rather than cramped.

## Elevation & Depth

To cultivate a safe and calm environment, depth is rendered through ambient light diffusion rather than harsh shadows.

- **Tonal Layers:** The primary canvas rests on `#F9FAFB` or tinted `#FDF2F4`. Elevated cards and modules sit atop crisp `#FFFFFF` or translucent white fills (`rgba(255, 255, 255, 0.85)`).
- **Rose-Tinted Ambient Shadows:** Shadows discard sterile neutral grays in favor of warm, low-opacity rose undertones:
  - *Low Elevation (Cards, Inputs):* `0 2px 8px -2px rgba(216, 27, 96, 0.05), 0 1px 3px 0 rgba(31, 41, 55, 0.03)`
  - *Medium Elevation (Hover states, Flyouts):* `0 10px 25px -5px rgba(216, 27, 96, 0.08), 0 4px 6px -2px rgba(31, 41, 55, 0.02)`
  - *High Elevation (Modals, Triage Drawers):* `0 20px 40px -10px rgba(173, 20, 87, 0.12), 0 8px 16px -4px rgba(31, 41, 55, 0.04)`
- **Soft Outlines:** Structural dividers use low-contrast borders: `1px solid #FCE7F0` for themed sections and `1px solid #F3F4F6` for neutral groupings.

## Shapes

The shape vocabulary uses generous, protective curves that echo natural biological curves and supportive gestures.

- **Pill & Ultra-Soft Profiles:** Micro-components (tags, pill buttons, indicators) use complete pill radii.
- **Large Surfaces:** Interactive cards, clinical summaries, and prompt containers employ generous corner treatment (`rounded-2xl` at 16px to `rounded-3xl` at 24px).
- **Emotional Rationale:** Sharp angles are eliminated to prevent subconscious tension, creating an interface that feels gentle, approachable, and safe to the touch.

## Components

### Buttons
- **Primary:** Full fill `#D81B60` with white text, pill-shaped geometry (`border-radius: 9999px`), `12px 24px` padding. On hover: shifts smoothly to `#AD1457` with an ambient glow (`box-shadow: 0 4px 14px rgba(216, 27, 96, 0.25)`).
- **Secondary:** Filled with `#FCE7F0`, `#AD1457` text, 0px border. On hover: `#F48FB1` with `#FFFFFF` text.
- **Outlined / Supportive:** `#FFFFFF` background with a subtle border (`1.5px solid #F48FB1`) and `#D81B60` text.

### Cards & Triage Containers
- **Visual Spec:** Clean `#FFFFFF` base on `#F9FAFB` ground, bordered with `1px solid #FCE7F0`, styled with a minimum radius of 20px (`rounded-2xl` to `rounded-3xl`).
- **Interactive Triage Cards:** When selectable in a questionnaire, unfocused cards use neutral hover borders (`#F48FB1`). Selected states activate a `#FDF2F4` tint, a prominent `2px solid #D81B60` border, and a check icon inside a rose pill circle.

### Chips & Health Badges
- **Status Tags:** Pill-shaped, `4px 12px` padding, `label-sm` typography.
- **Triage Stages:**
  - *Normal / Routine:* Light blush ground `#FCE7F0` with text `#AD1457`.
  - *Informational / Awareness:* Cool neutral ground `#F3F4F6` with text `#374151`.
  - *Attention / Medical Consult Recommended:* `#FDF2F4` base, `#D81B60` border, `#AD1457` text.

### Form Inputs & Selectors
- **Text Fields:** Generous height (48px min) with 16px corner radius, background `#FFFFFF`, bordered by `1.5px solid #F3F4F6`. Focused state activates `border-color: #D81B60` alongside an outer ambient ring `box-shadow: 0 0 0 3px rgba(244, 143, 177, 0.25)`.
- **Checkboxes & Radios:** Smooth rounded borders (circular for radio, 6px radius for checkbox). Checked state displays `#D81B60` solid fill with pure white icons.

### Specialized Platform Components
- **Step-by-Step Risk Assessment Bar:** A segmented pill progress indicator using `#FCE7F0` track and smooth animating `#D81B60` fill, accompanied by reassuring step labels.
- **Support & Hotline Floating Banner:** A persistent, soothing sticky dock with `#FFFFFF` translucent glass (`backdrop-filter: blur(12px)`), gentle border `#FCE7F0`, providing instantaneous one-tap connection to emotional support networks and nurse specialists.