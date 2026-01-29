# App Resources

This directory contains source assets for generating iOS and Android app icons and splash screens.

## Required Source Files

Place your source images in this directory:

1. **icon.png** - App icon source (1024x1024 px, PNG, no transparency for iOS)
2. **splash.png** - Splash screen source (2732x2732 px, PNG, centered logo on solid background)

## Generating Assets

### Option 1: Using capacitor-assets (Recommended)

Install the CLI tool:
```bash
npm install -g @capacitor/assets
```

Generate all assets:
```bash
npx capacitor-assets generate --iconBackgroundColor '#000000' --splashBackgroundColor '#000000'
```

### Option 2: Manual Generation

#### iOS Icons (place in ios/App/App/Assets.xcassets/AppIcon.appiconset/)
- 20x20, 29x29, 40x40, 60x60, 76x76, 83.5x83.5, 1024x1024
- @1x, @2x, @3x variants

#### Android Icons (place in android/app/src/main/res/)
- mipmap-mdpi: 48x48
- mipmap-hdpi: 72x72
- mipmap-xhdpi: 96x96
- mipmap-xxhdpi: 144x144
- mipmap-xxxhdpi: 192x192

### Splash Screen

The splash screen is configured in `capacitor.config.ts`. By default it uses:
- Background color: #000000
- Duration: 2000ms
- Auto-hide: enabled

For custom splash screen images, generate platform-specific sizes:

#### iOS Splash Screens
- Place in ios/App/App/Assets.xcassets/Splash.imageset/

#### Android Splash Screens
- Place in android/app/src/main/res/drawable/

## Quick Start

1. Create a 1024x1024 PNG icon and save as `resources/icon.png`
2. Create a 2732x2732 PNG splash and save as `resources/splash.png`
3. Run: `npx capacitor-assets generate`
4. Sync: `npm run cap:sync`
