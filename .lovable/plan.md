
# Add Actual Car Images to Product Preview

Replace the emoji placeholders with real vehicle photos to make the dashboard mockup more professional and realistic.

---

## Approach

Use high-quality stock photos from Unsplash that match the vehicle types shown:

| Vehicle | Current | Replacement Image |
|---------|---------|-------------------|
| 2022 Honda Accord Sport | 🚗 emoji | White/silver sedan photo |
| 2021 Toyota Tacoma TRD | 🛻 emoji | Pickup truck photo |
| 2020 Ford Explorer XLT | 🚙 emoji | SUV photo |

---

## Changes

### File: `src/components/landing/ProductPreview.tsx`

1. **Card 1 (Honda Accord)** - Replace the emoji div with an `<img>` tag:
   - Use a professional sedan photo from Unsplash
   - Add `object-cover` class for proper aspect ratio handling
   - Include alt text for accessibility

2. **Card 2 (Toyota Tacoma)** - Replace the emoji div with an `<img>` tag:
   - Use a pickup truck photo from Unsplash
   - Maintain the "Under Market" badge overlay

3. **Card 3 (Ford Explorer)** - Replace the emoji div with an `<img>` tag:
   - Use an SUV photo from Unsplash

---

## Technical Details

```text
Current structure (emoji):
+---------------------------+
| div.aspect-[4/3]          |
|   div.text-6xl  🚗        |
+---------------------------+

New structure (image):
+---------------------------+
| div.aspect-[4/3]          |
|   img.object-cover        |
|   (full width/height)     |
+---------------------------+
```

- Images will be loaded from `images.unsplash.com` with appropriate sizing parameters for fast loading
- `object-cover` ensures images fill the container without distortion
- Fallback gradient background retained in case images fail to load
