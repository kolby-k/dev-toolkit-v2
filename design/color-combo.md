## General note: where to define combos

All these schemes are best defined in a **Hue–Chroma–Lightness** space (HCL/OKLCH) and _then_ converted to RGB. In raw RGB, there isn’t a clean “rotate hue by 30°” operation – the channel relationships are nonlinear and not perceptually uniform.

So:
**Rule of thumb:**

- Compute combos in **OKLCH/HCL**
- Then convert to **sRGB** for CSS.

---

## 1. Monochromatic

> “Same hue; vary lightness and chroma”

**OKLCH / HCL:**

- Base color: `oklch(L₀ C₀ h₀)`
- Monochromatic variants:

  - Fix **hue**: `h = h₀` (no change)
  - Vary **lightness L** around L₀:

    - e.g. `L ∈ [L₀ - ΔL, L₀ + ΔL]`

  - Vary **chroma C**:

    - Often scale or slightly shift: `C = k * C₀` (e.g. 0.4–1.2)

So the only things changing are **L** and **C**; hue is locked.

**RGB intuition:**

- Channels keep roughly the **same ratios** (same perceived color family).
- You’re mostly scaling them up/down (lighter/darker) and slightly compressing/spreading them (more/less saturated).
- A rough RGB approximation is something like `rgb * factor` per channel (your earlier idea) – but OKLCH does this more reliably.

---

## 2. Analogous

> “Small hue shifts around the base; lightness/chroma mostly stable”

**OKLCH / HCL:**

- Base: `oklch(L₀ C₀ h₀)`
- Pick a hue spread, e.g. `Δh = 20–40°`.
- Analogous hues:

  - `h₁ = h₀ - Δh`
  - `h₂ = h₀`
  - `h₃ = h₀ + Δh`
    (wrap modulo 360)

- **Lightness L**:

  - Often kept close to L₀, maybe ± small jitter:

    - `L ≈ L₀ ± small_delta`

- **Chroma C**:

  - Often near C₀; maybe a bit reduced on extremes:

    - `C ≈ C₀` or `C = C₀ * factor` with factor ~0.8–1.1

So analogous = **primarily changing hue** in a small band; L and C roughly stable.

**RGB intuition:**

- Channel relationships change a bit (e.g. blue→blue-green→greenish), but overall luminance and “strength” stay almost the same.
- Values move “sideways” in RGB, not just brighter/darker – some channel rises while another falls.

---

## 3. Complementary

> “Hue shifted by 180°; L/C tweaked to stay usable”

**OKLCH / HCL:**

- Base: `oklch(L₀ C₀ h₀)`
- Complement:

  - `h₁ = (h₀ + 180) mod 360`
  - Start with `L₁ ≈ L₀`, `C₁ ≈ C₀`
  - Then adjust L for contrast if needed:

    - For accessibility, often `L₁` is somewhat higher/lower than L₀.

So the key variable change is **hue jumps by ~180°**; **L and C are similar but can be tuned**.

**RGB intuition:**

- Complement ≠ simple `(255 - R, 255 - G, 255 - B)` if you care about perception.
- In sRGB, you’ll see dominant channels “flip”:

  - Strongly red-ish becomes more cyan-ish, etc.

- It’s the biggest “hue distance” while keeping similar perceived brightness/saturation (if you adjust properly in OKLCH).

---

## 4. Triad

> “Three hues ~120° apart; similar lightness/chroma”

**OKLCH / HCL:**

- Base: `oklch(L₀ C₀ h₀)`
- Triad hues:

  - `h₀` (base)
  - `h₁ = (h₀ + 120) mod 360`
  - `h₂ = (h₀ + 240) mod 360`

- **Lightness L**:

  - Often kept in a similar band, maybe small offsets:

    - `L₁ ≈ L₀`, `L₂ ≈ L₀`
    - Or: set one as main (L₀), the others ± some ΔL.

- **Chroma C**:

  - Usually similar chroma across all three:

    - `C₁ ≈ C₀`, `C₂ ≈ C₀`

  - You might slightly reduce C on secondary accents to prevent visual overload.

**RGB intuition:**

- You’ll get three very distinct RGB mixtures (one often more R-heavy, one more G-heavy, one more B-heavy), all similarly bright and saturated.
- Very “colorful” combination; in UI you often pick **one** as base and let the others be smaller accents.

---

## 5. Split-Complementary

> “Base hue plus two hues flanking the complement”

**OKLCH / HCL:**

- Base: `oklch(L₀ C₀ h₀)`
- Complement hue: `h_comp = (h₀ + 180) mod 360`
- Choose a small offset `δ` (e.g. 20–30°).
- Split-complementary hues:

  - `h₀` (base)
  - `h₁ = h_comp - δ`
  - `h₂ = h_comp + δ`

- **Lightness L**:

  - Keep roughly around L₀; maybe push the split hues slightly lighter/darker for roles:

    - `L₁ ≈ L₀ ± small_delta`
    - `L₂ ≈ L₀ ± small_delta`

- **Chroma C**:

  - Usually comparable to C₀, but you might reduce C on one or both split hues:

    - `C₁ ≈ C₀`, `C₂ ≈ C₀ * 0.8` for softer accents.

So variables: one **base hue** unchanged, and two **hues clustered around (h₀+180°)** instead of on the exact complement.

**RGB intuition:**

- You get contrast similar to complementary, but because the split hues are not exactly opposite, the clash is softer.
- In RGB you’ll see a strong move away from the base’s channel mix, but spread across two different “directions”.

---

## 6. Tetradic (rectangle)

> “Two complementary pairs: four hues in a rectangle on the wheel”

There are a couple of tetradic patterns; a common “rectangle” scheme uses:

**OKLCH / HCL:**

- Base: `oklch(L₀ C₀ h₀)`
- Choose a spacing angle `α` (often ~60°).
- Hues:

  - `h₀`
  - `h₁ = (h₀ + α) mod 360`
  - `h₂ = (h₀ + 180) mod 360`
  - `h3 = (h₀ + 180 + α) mod 360`

- This gives you **two complementary pairs**:

  - `h₀` ↔ `h₂`
  - `h₁` ↔ `h₃`

- **Lightness L**:

  - Common pattern: choose one or two hues as “main” with L near L₀, and push the others lighter/darker:

    - e.g. `L₀` main, `L₁ = L₀ + δ`, `L₂ = L₀ - δ`, `L₃ = L₀ + 2δ`

- **Chroma C**:

  - Keep a similar C band for coherence, maybe lower C for minor accents:

    - `C_i ≈ C₀ * factor_i`, with factors ~0.7–1.0

So tetradic: **multiple hue jumps**, combining both “opposite” and “offset” relationships. Hue is doing most of the work; L/C are sculpted mainly for hierarchy and contrast.

**RGB intuition:**

- The four colors often span very different channel mixes: one might be warm, one cool, etc.
- Without careful L/C control in OKLCH, the palette can feel chaotic in RGB; that’s why you typically **fix or narrow L/C and let hue do the geometry**.

---

## How this maps to your variables in code

If you’re implementing these from a **base OKLCH color**, the core patterns are:

- **Monochromatic**

  - `h = h₀`
  - `L` and `C` vary

- **Analogous**

  - `h = h₀ + Δh_i` where all Δh_i are **small** (e.g. ±20–40°)
  - `L ≈ L₀`, `C ≈ C₀`

- **Complementary**

  - `h = h₀` and `h₁ = h₀ + 180°`
  - `L` and `C` similar, optionally offset for contrast

- **Triad**

  - `h = h₀`, `h₁ = h₀ + 120°`, `h₂ = h₀ + 240°`
  - `L` and `C` mostly similar

- **Split-complementary**

  - `h = h₀`
  - `h₁ = h₀ + 180° - δ`, `h₂ = h₀ + 180° + δ`
  - `L` and `C` similar-ish to base, small adjustments

- **Tetradic**

  - `h₀`, `h₁ = h₀ + α`, `h₂ = h₀ + 180°`, `h₃ = h₀ + 180° + α`
  - `L` and `C` shared band; tweak for hierarchy

If you’d like, next step I can help you define actual **TypeScript helper functions** like:

```ts
function getAnalogousColorsFromOklch(base: Oklch, count = 3): Oklch[] { … }
```

with sensible default spreads (Δh, ΔL, ΔC) for UI design.
