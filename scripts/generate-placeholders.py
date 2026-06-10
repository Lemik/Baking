#!/usr/bin/env python3
"""Generate warm-toned WebP product placeholders."""

from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    raise SystemExit("Pillow required: pip install Pillow")

OUT = Path(__file__).resolve().parent.parent / "public" / "images" / "products"
OUT.mkdir(parents=True, exist_ok=True)

PRODUCTS = {
    "lemon-loaf": {
        "bg": ("#FFFDE7", "#FDE047"),
        "accent": "#EAB308",
        "shape": "loaf",
    },
    "poppy-seed-roll": {
        "bg": ("#FAF7F2", "#8B7355"),
        "accent": "#5C4033",
        "shape": "roll",
    },
}


def lerp_color(c1: str, c2: str, t: float) -> tuple[int, int, int]:
    def parse(h: str) -> tuple[int, int, int]:
        h = h.lstrip("#")
        return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)

    a, b = parse(c1), parse(c2)
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def draw_loaf(draw: ImageDraw.ImageDraw, accent: str) -> None:
    draw.rounded_rectangle((140, 220, 660, 520), radius=80, fill=accent, outline="#5C4033", width=4)
    draw.ellipse((220, 250, 580, 340), fill=(255, 255, 255, 40))
    draw.ellipse((280, 200, 520, 260), fill="#FEF08A")


def draw_roll(draw: ImageDraw.ImageDraw, accent: str) -> None:
    draw.rounded_rectangle((120, 260, 680, 480), radius=40, fill="#E8DCC8", outline="#5C4033", width=4)
    for i in range(6):
        x = 180 + i * 80
        draw.arc((x, 220, x + 120, 500), start=200, end=340, fill=accent, width=18)
    for x, y in [(220, 340), (300, 360), (380, 330), (460, 350), (540, 340)]:
        draw.ellipse((x, y, x + 6, y + 6), fill="#111827")


def main() -> None:
    for slug, cfg in PRODUCTS.items():
        img = Image.new("RGB", (800, 600))
        draw = ImageDraw.Draw(img)
        c1, c2 = cfg["bg"]
        for y in range(600):
            color = lerp_color(c1, c2, y / 599)
            draw.line([(0, y), (799, y)], fill=color)
        if cfg["shape"] == "loaf":
            draw_loaf(draw, cfg["accent"])
        else:
            draw_roll(draw, cfg["accent"])
        img.save(OUT / f"{slug}.webp", format="WEBP", quality=82)
        print(f"Wrote {slug}.webp")

    for old in (
        "country-sourdough.webp",
        "multigrain-morning.webp",
        "chocolate-chip.webp",
        "lavender-shortbread.webp",
    ):
        path = OUT / old
        if path.exists():
            path.unlink()
            print(f"Removed {old}")


if __name__ == "__main__":
    main()
