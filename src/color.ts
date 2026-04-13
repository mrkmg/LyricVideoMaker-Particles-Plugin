import type { ColorMode } from "./types.js";

/**
 * Parse a hex color to [r, g, b] (0-255).
 */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16) || 0,
    parseInt(h.substring(2, 4), 16) || 0,
    parseInt(h.substring(4, 6), 16) || 0,
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    "#" +
    clamp(r).toString(16).padStart(2, "0") +
    clamp(g).toString(16).padStart(2, "0") +
    clamp(b).toString(16).padStart(2, "0")
  );
}

function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex(
    ar + (br - ar) * t,
    ag + (bg - ag) * t,
    ab + (bb - ab) * t,
  );
}

function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

/**
 * Resolve an array of colors based on the color mode and options.
 * Returns an array of hex strings that particles index into.
 */
export function resolveColors(
  colorMode: ColorMode,
  primaryColor: string,
  secondaryColor: string,
  paletteColors: string,
  count: number,
): string[] {
  const n = Math.max(count, 1);

  switch (colorMode) {
    case "single":
      return [primaryColor];

    case "gradient-blend": {
      if (n === 1) return [primaryColor];
      const colors: string[] = [];
      for (let i = 0; i < n; i++) {
        colors.push(lerpColor(primaryColor, secondaryColor, i / (n - 1)));
      }
      return colors;
    }

    case "rainbow": {
      const colors: string[] = [];
      for (let i = 0; i < n; i++) {
        colors.push(hslToHex((i / n) * 360, 0.85, 0.6));
      }
      return colors;
    }

    case "palette": {
      const parsed = paletteColors
        .split(",")
        .map((c) => c.trim())
        .filter((c) => /^#[0-9a-fA-F]{6}$/.test(c));
      return parsed.length > 0 ? parsed : [primaryColor];
    }

    default:
      return [primaryColor];
  }
}
