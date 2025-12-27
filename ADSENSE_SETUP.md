# Google AdSense Integration - Quick Setup

## ⚡ Quick Start (3 Steps)

### Step 1: Get Your AdSense Info
1. Sign up at [Google AdSense](https://www.google.com/adsense/)
2. Get your **Publisher ID** (format: `ca-pub-1234567890123456`)
3. Create **Ad Units** and get their **Ad Slot IDs** (format: `1234567890`)

### Step 2: Update Configuration Files

**File 1: `index.html`**
Replace line 20 with your actual Publisher ID:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ACTUAL_ID"
 crossorigin="anonymous"></script>
```

**File 2: `src/components/atoms/Advertisement.tsx`**
Replace the default values (lines 12-16 and line 20):

```tsx
const DEFAULT_AD_SLOTS = {
  top: "YOUR_BANNER_SLOT_ID",      // Horizontal banner (728x90 or responsive)
  sidebar: "YOUR_SIDEBAR_SLOT_ID",  // Vertical rectangle (300x600)
  bottom: "YOUR_BOTTOM_SLOT_ID",    // Bottom banner (728x90)
  square: "YOUR_SQUARE_SLOT_ID",    // Square (300x250)
};

// Line 20:
adClient = "ca-pub-YOUR_ACTUAL_ID",
```

### Step 3: Done! 
All **40+ ad placements** across your site will now show **real Google AdSense ads**!

---

## 📍 Current Ad Placements

**40+ Google AdSense ads** strategically placed across all pages:

- **HomePage**: 6 ads (hero banner, between sections, footer)
- **AboutPage**: 7 ads (spread across mission, values, stats, team sections)
- **ContactPage**: 3 ads (top banner, square ad, footer)
- **PlannerPage**: 5 ads (header banners, sidebar, mid-content)
- **WorkoutsPage**: 5 ads (category overview, exercise listings)
- **ResourcesPage**: 12+ ads (calculator, blog, nutrition, FAQ sections)
- **LegalPage**: 3 ads (top, mid-content, footer)

All ads are **responsive** and **mobile-optimized**.

---

## 🎯 Ad Types Used

1. **Horizontal Banners** (`position="top"` or `"bottom"`)
   - Best for: Between content sections
   - Recommended size: 728x90, 970x90, or responsive
   
2. **Sidebar Ads** (`position="sidebar"`)  
   - Best for: Desktop right column
   - Recommended size: 300x600, 160x600, or responsive

3. **Square Ads** (`position="square"`)
   - Best for: Content breaks
   - Recommended size: 300x250, 336x280

---

## 💡 Pro Tips

✅ Use **Auto ads** for optimal performance (AdSense will auto-place additional ads)
✅ Enable **responsive ad units** in AdSense dashboard
✅ Monitor performance in AdSense → Reports
✅ Test with AdSense preview before going live

---

## 🔧 Custom Ad Slots (Optional)

Want different ad units per page? Override the default:

```tsx
<Advertisement 
  position="top" 
  adSlot="CUSTOM_SLOT_ID"  // Override default
/>
```

---

## ⚠️ Important Notes

- **Test Mode**: AdSense shows blank/test ads until your site is approved
- **Approval**: Can take 24-48 hours after adding code
- **Revenue**: Starts accumulating after approval
- **Payment**: Minimum $100 threshold via AdSense payment settings
- **Placeholder Display**: Until AdSense is configured, ads show as styled placeholder cards with sparkle icon and "Advertisement" text
