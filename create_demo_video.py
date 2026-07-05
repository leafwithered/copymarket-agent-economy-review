from __future__ import annotations

import struct
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path.cwd()
QA = ROOT / "qa" / "deck"
OUT = ROOT / "CopyMarket_demo_video.avi"
GIF_OUT = ROOT / "CopyMarket_demo_preview.gif"

WIDTH = 1280
HEIGHT = 720
FPS = 1


SEGMENTS = [
    (0, 20, 0, "Problem: agents can reason and pay, but most paid work still expects a human sales cycle."),
    (20, 45, 1, "Customer: a software buyer or founder workflow that needs sharper landing-page copy before launch."),
    (45, 70, 2, "Market loop: WANT -> BID -> AWARD -> DEPOSITED -> DELIVERED -> RELEASED."),
    (70, 100, 3, "Product: the seller returns hero copy, CTA, section rewrites, conversion notes, and risk controls."),
    (100, 125, 3, "The delivery is structured JSON, so another agent can use it without parsing a vague chat response."),
    (125, 150, 4, "Proof: seller-agent and buyer-agent typechecks pass; 29 tests pass across both agents."),
    (150, 170, 4, "Economy: sellers, brokers, verifiers, and resellers can form a graph of paid B2B services."),
    (170, 180, 0, "Submission package includes source, pitch deck, demo script, sample output, and upload checklist."),
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


TITLE_FONT = font(28, True)
CAPTION_FONT = font(24)
SMALL_FONT = font(16)


def wrap_text(draw: ImageDraw.ImageDraw, text: str, max_width: int, fnt: ImageFont.ImageFont) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        if draw.textbbox((0, 0), trial, font=fnt)[2] <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def load_slides() -> list[Image.Image]:
    slides = []
    for idx in range(1, 6):
        path = QA / f"slide-{idx:02d}.png"
        img = Image.open(path).convert("RGB").resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
        slides.append(img)
    return slides


def make_frame(base: Image.Image, second: int, caption: str) -> Image.Image:
    frame = base.copy()
    draw = ImageDraw.Draw(frame, "RGBA")
    draw.rectangle((0, HEIGHT - 118, WIDTH, HEIGHT), fill=(255, 255, 255, 235))
    draw.rectangle((0, HEIGHT - 120, WIDTH, HEIGHT - 118), fill=(255, 107, 53, 255))
    draw.text((42, HEIGHT - 100), "CopyMarket demo", fill=(0, 0, 0, 255), font=TITLE_FONT)
    draw.text((1110, HEIGHT - 98), f"{second:03d}s / 180s", fill=(85, 85, 85, 255), font=SMALL_FONT)
    lines = wrap_text(draw, caption, 1040, CAPTION_FONT)[:2]
    y = HEIGHT - 62
    for line in lines:
        draw.text((42, y), line, fill=(36, 36, 36, 255), font=CAPTION_FONT)
        y += 30
    return frame


def chunk(fourcc: bytes, data: bytes) -> bytes:
    pad = b"\0" if len(data) % 2 else b""
    return fourcc + struct.pack("<I", len(data)) + data + pad


def list_chunk(kind: bytes, data: bytes) -> bytes:
    return b"LIST" + struct.pack("<I", len(data) + 4) + kind + data + (b"\0" if len(data) % 2 else b"")


def encode_jpeg(img: Image.Image) -> bytes:
    buf = BytesIO()
    img.save(buf, format="JPEG", quality=86, optimize=False)
    return buf.getvalue()


def write_mjpeg_avi(frames: list[bytes]) -> None:
    total = len(frames)
    max_frame = max(len(frame) for frame in frames)
    avih = struct.pack(
        "<IIIIIIIIIIIIIIII",
        int(1_000_000 / FPS),
        max_frame * FPS,
        0,
        0x10,
        total,
        0,
        1,
        max_frame,
        WIDTH,
        HEIGHT,
        0,
        0,
        0,
        0,
        0,
        0,
    )[:56]
    strh = struct.pack(
        "<4s4sIHHIIIIIIIIiiii",
        b"vids",
        b"MJPG",
        0,
        0,
        0,
        0,
        1,
        FPS,
        0,
        total,
        max_frame,
        0xFFFFFFFF,
        0,
        0,
        0,
        WIDTH,
        HEIGHT,
    )
    strf = struct.pack(
        "<IiiHH4sIiiII",
        40,
        WIDTH,
        HEIGHT,
        1,
        24,
        b"MJPG",
        max_frame,
        0,
        0,
        0,
        0,
    )
    hdrl = list_chunk(b"hdrl", chunk(b"avih", avih) + list_chunk(b"strl", chunk(b"strh", strh) + chunk(b"strf", strf)))

    movi = bytearray(b"movi")
    index = bytearray()
    for frame in frames:
        offset = len(movi)
        movi.extend(chunk(b"00dc", frame))
        index.extend(struct.pack("<4sIII", b"00dc", 0x10, offset, len(frame)))

    body = hdrl + list_chunk(b"movi", bytes(movi[4:])) + chunk(b"idx1", bytes(index))
    OUT.write_bytes(b"RIFF" + struct.pack("<I", len(body) + 4) + b"AVI " + body)


def main() -> None:
    slides = load_slides()
    rendered: list[Image.Image] = []
    for second in range(180):
        segment = next(s for s in SEGMENTS if s[0] <= second < s[1])
        rendered.append(make_frame(slides[segment[2]], second + 1, segment[3]))

    write_mjpeg_avi([encode_jpeg(frame) for frame in rendered])

    # Lightweight preview for quick inspection. The AVI is the uploadable demo file.
    preview = [frame.resize((640, 360), Image.Resampling.LANCZOS) for frame in rendered[::10]]
    preview[0].save(GIF_OUT, save_all=True, append_images=preview[1:], duration=1000, loop=0)
    print(OUT)
    print(GIF_OUT)


if __name__ == "__main__":
    main()
