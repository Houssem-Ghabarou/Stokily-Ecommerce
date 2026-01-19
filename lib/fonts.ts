// Font configuration for dynamic store customization
// This system supports any Google Font sent from the mobile app

export interface FontOption {
  name: string;
  value: string;
  category: "serif" | "sans-serif" | "display";
}

// Predefined font options for mobile app UI selection
export const HEADING_FONTS: FontOption[] = [
  { name: "Playfair Display", value: "Playfair Display", category: "serif" },
  { name: "Poppins", value: "Poppins", category: "sans-serif" },
  { name: "Montserrat", value: "Montserrat", category: "sans-serif" },
  { name: "Oswald", value: "Oswald", category: "display" },
  { name: "Merriweather", value: "Merriweather", category: "serif" },
  { name: "Raleway", value: "Raleway", category: "sans-serif" },
  { name: "Lora", value: "Lora", category: "serif" },
  { name: "Bebas Neue", value: "Bebas Neue", category: "display" },
  { name: "Cormorant Garamond", value: "Cormorant Garamond", category: "serif" },
  { name: "Quicksand", value: "Quicksand", category: "sans-serif" },
];

export const BODY_FONTS: FontOption[] = [
  { name: "Inter", value: "Inter", category: "sans-serif" },
  { name: "Open Sans", value: "Open Sans", category: "sans-serif" },
  { name: "Roboto", value: "Roboto", category: "sans-serif" },
  { name: "Lato", value: "Lato", category: "sans-serif" },
  { name: "Source Sans 3", value: "Source Sans 3", category: "sans-serif" },
  { name: "Nunito", value: "Nunito", category: "sans-serif" },
  { name: "Work Sans", value: "Work Sans", category: "sans-serif" },
  { name: "DM Sans", value: "DM Sans", category: "sans-serif" },
  { name: "Cabin", value: "Cabin", category: "sans-serif" },
  { name: "Karla", value: "Karla", category: "sans-serif" },
];

// All fonts combined for lookup
export const ALL_FONTS: FontOption[] = [...HEADING_FONTS, ...BODY_FONTS];

// Known serif fonts for fallback detection
const SERIF_FONTS = [
  "Playfair Display",
  "Merriweather",
  "Lora",
  "Cormorant Garamond",
  "Libre Baskerville",
  "Crimson Text",
  "EB Garamond",
  "Noto Serif",
  "PT Serif",
  "Source Serif Pro",
  "Bitter",
  "Domine",
];

// Known display fonts for fallback detection
const DISPLAY_FONTS = [
  "Oswald",
  "Bebas Neue",
  "Anton",
  "Righteous",
  "Archivo Black",
  "Passion One",
  "Titan One",
];

// Default fonts if none specified
export const DEFAULT_HEADING_FONT = "Poppins";
export const DEFAULT_BODY_FONT = "Inter";

// Get the fallback font family based on font name
function getFallback(font: string): string {
  // First check our predefined list
  const fontOption = ALL_FONTS.find(
    (f) => f.value.toLowerCase() === font.toLowerCase()
  );

  if (fontOption) {
    switch (fontOption.category) {
      case "serif":
        return "Georgia, 'Times New Roman', serif";
      case "display":
        return "Impact, Haettenschweiler, sans-serif";
      default:
        return "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    }
  }

  // Check known serif fonts
  if (SERIF_FONTS.some((f) => font.toLowerCase().includes(f.toLowerCase()))) {
    return "Georgia, 'Times New Roman', serif";
  }

  // Check known display fonts
  if (DISPLAY_FONTS.some((f) => font.toLowerCase().includes(f.toLowerCase()))) {
    return "Impact, Haettenschweiler, sans-serif";
  }

  // Default to sans-serif for unknown fonts
  return "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
}

// Generate Google Fonts URL for the given fonts
// Supports any Google Font name sent from the mobile app
export function getGoogleFontsUrl(
  headingFont?: string,
  bodyFont?: string
): string {
  const fonts: string[] = [];
  const heading = headingFont?.trim() || DEFAULT_HEADING_FONT;
  const body = bodyFont?.trim() || DEFAULT_BODY_FONT;

  // Add heading font with display weights
  fonts.push(`family=${encodeURIComponent(heading)}:wght@400;500;600;700;800`);

  // Add body font with text weights (only if different from heading)
  if (body.toLowerCase() !== heading.toLowerCase()) {
    fonts.push(`family=${encodeURIComponent(body)}:wght@300;400;500;600;700`);
  }

  return `https://fonts.googleapis.com/css2?${fonts.join("&")}&display=swap`;
}

// Generate CSS variables for fonts
export function getFontCssVariables(
  headingFont?: string,
  bodyFont?: string
): string {
  const heading = headingFont?.trim() || DEFAULT_HEADING_FONT;
  const body = bodyFont?.trim() || DEFAULT_BODY_FONT;

  const headingFallback = getFallback(heading);
  const bodyFallback = getFallback(body);

  return `
    --font-heading: '${heading}', ${headingFallback};
    --font-body: '${body}', ${bodyFallback};
  `;
}

// Check if a font is in our predefined list
export function isKnownFont(fontName: string): boolean {
  return ALL_FONTS.some(
    (f) => f.value.toLowerCase() === fontName.toLowerCase()
  );
}

// Get font option by name
export function getFontOption(fontName: string): FontOption | undefined {
  return ALL_FONTS.find(
    (f) => f.value.toLowerCase() === fontName.toLowerCase()
  );
}
