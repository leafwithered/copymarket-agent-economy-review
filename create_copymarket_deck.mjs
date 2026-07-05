import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "CopyMarket_Agent_Economy_Pitch.pptx");
const QA_DIR = path.join(ROOT, "qa", "deck");
const W = 1280;
const H = 720;
const ink = "#000000";
const muted = "#555555";
const panel = "#EDEDED";
const rule = "#B8BCC4";
const highlight = "#FF6B35";

async function writeBlob(file, blob) {
  await fs.writeFile(file, new Uint8Array(await blob.arrayBuffer()));
}

function addText(slide, text, position, style = {}, name = undefined) {
  const box = slide.shapes.add({
    geometry: "textbox",
    name,
    position,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  box.text = text;
  box.text.style = {
    fontFace: "Helvetica Neue",
    fontSize: 22,
    color: ink,
    ...style,
  };
  return box;
}

function addPanel(slide, position, fill = panel, name = undefined) {
  return slide.shapes.add({
    geometry: "rect",
    name,
    position,
    fill,
    line: { style: "solid", fill: "none", width: 0 },
  });
}

function addRule(slide, left, top, width) {
  slide.shapes.add({
    geometry: "rect",
    position: { left, top, width, height: 1 },
    fill: rule,
    line: { style: "solid", fill: "none", width: 0 },
  });
}

function footer(slide, n) {
  addText(slide, `CopyMarket / ${n}`, { left: 1030, top: 660, width: 200, height: 30 }, {
    fontSize: 15,
    color: muted,
    alignment: "right",
  });
}

function title(slide, text, sub, n) {
  addText(slide, text, { left: 42, top: 36, width: 980, height: 112 }, {
    fontSize: 46,
    bold: true,
    color: ink,
  });
  if (sub) {
    addText(slide, sub, { left: 42, top: 152, width: 760, height: 66 }, {
      fontSize: 22,
      color: muted,
    });
  }
  footer(slide, n);
}

function metric(slide, value, label, left, top) {
  addPanel(slide, { left, top, width: 255, height: 142 });
  addText(slide, value, { left: left + 22, top: top + 20, width: 210, height: 54 }, {
    fontSize: 42,
    bold: true,
  });
  addText(slide, label, { left: left + 22, top: top + 84, width: 210, height: 40 }, {
    fontSize: 17,
    color: muted,
  });
}

function step(slide, label, body, left, top, width = 176) {
  addPanel(slide, { left, top, width, height: 112 });
  addText(slide, label, { left: left + 14, top: top + 16, width: width - 28, height: 28 }, {
    fontSize: 20,
    bold: true,
  });
  addText(slide, body, { left: left + 14, top: top + 52, width: width - 28, height: 48 }, {
    fontSize: 15,
    color: muted,
  });
}

function arrow(slide, left, top) {
  addText(slide, "->", { left, top, width: 34, height: 28 }, {
    fontSize: 23,
    bold: true,
    color: highlight,
    alignment: "center",
  });
}

const deck = Presentation.create({ slideSize: { width: W, height: H } });

{
  const slide = deck.slides.add();
  slide.background.fill = "#FFFFFF";
  addText(slide, "CopyMarket", { left: 42, top: 44, width: 640, height: 92 }, {
    fontSize: 72,
    bold: true,
  });
  addText(slide, "Agents buy landing-page clarity and settle on-chain", {
    left: 42,
    top: 148,
    width: 750,
    height: 82,
  }, { fontSize: 30, color: muted });
  addPanel(slide, { left: 812, top: 44, width: 384, height: 532 });
  addText(slide, "WANT -> BID -> AWARD -> DEPOSITED -> DELIVERED -> RELEASED", {
    left: 852,
    top: 112,
    width: 304,
    height: 130,
  }, { fontSize: 31, bold: true });
  addText(slide, "A seller agent delivers a paid copy rescue only after escrow is funded. The buyer releases payment after delivery.", {
    left: 852,
    top: 282,
    width: 304,
    height: 128,
  }, { fontSize: 23, color: muted });
  metric(slide, "1", "service sold: copyrescue", 42, 396);
  metric(slide, "0.001 SOL", "demo buyer budget", 318, 396);
  metric(slide, "16", "seller tests passing", 594, 396);
  footer(slide, 1);
}

{
  const slide = deck.slides.add();
  slide.background.fill = "#FFFFFF";
  title(slide, "Agents need useful work they can buy without a human sales cycle", "The customer is a software buyer that wants a commercial artifact, not a meeting.", 2);
  addPanel(slide, { left: 42, top: 264, width: 360, height: 250 });
  addText(slide, "Customer", { left: 70, top: 292, width: 300, height: 38 }, { fontSize: 26, bold: true });
  addText(slide, "An autonomous buyer agent, founder tool, or broker that needs landing-page copy advice before it spends on traffic or outreach.", {
    left: 70,
    top: 350,
    width: 300,
    height: 116,
  }, { fontSize: 21, color: muted });
  addPanel(slide, { left: 460, top: 264, width: 360, height: 250 });
  addText(slide, "What it sells", { left: 488, top: 292, width: 300, height: 38 }, { fontSize: 26, bold: true });
  addText(slide, "A compact copy rescue: clearer hero, CTA, three offer sections, conversion notes, and risk controls.", {
    left: 488,
    top: 350,
    width: 300,
    height: 116,
  }, { fontSize: 21, color: muted });
  addPanel(slide, { left: 878, top: 264, width: 360, height: 250 });
  addText(slide, "Why now", { left: 906, top: 292, width: 300, height: 38 }, { fontSize: 26, bold: true });
  addText(slide, "Escrow lets agents transact for small deliverables at machine speed while keeping payment conditional on delivery.", {
    left: 906,
    top: 350,
    width: 300,
    height: 116,
  }, { fontSize: 21, color: muted });
  addRule(slide, 42, 590, 1196);
}

{
  const slide = deck.slides.add();
  slide.background.fill = "#FFFFFF";
  title(slide, "The product is a paid endpoint with settlement as the proof moment", "Judges can watch the market clear, the vault fund, and the copy rescue arrive after deposit.", 3);
  const y = 300;
  step(slide, "WANT", "Buyer asks for copyrescue.", 42, y);
  arrow(slide, 226, y + 42);
  step(slide, "BID", "Seller prices within budget.", 264, y);
  arrow(slide, 448, y + 42);
  step(slide, "AWARD", "Best-value seller wins.", 486, y);
  arrow(slide, 670, y + 42);
  step(slide, "DEPOSITED", "Vault escrow is funded.", 708, y);
  arrow(slide, 892, y + 42);
  step(slide, "DELIVERED", "Copy rescue JSON ships.", 930, y);
  addText(slide, "The key moment: the buyer decides to pay before it sees the final artifact, and escrow makes the decision observable.", {
    left: 42,
    top: 520,
    width: 1040,
    height: 70,
  }, { fontSize: 26, bold: true });
}

{
  const slide = deck.slides.add();
  slide.background.fill = "#FFFFFF";
  title(slide, "The delivery is concrete enough for another agent to use immediately", "The seller returns structured JSON rather than a vague chat response.", 4);
  addPanel(slide, { left: 42, top: 244, width: 520, height: 322 });
  addText(slide, "Sample hero", { left: 70, top: 274, width: 460, height: 36 }, { fontSize: 24, bold: true });
  addText(slide, "Turn crypto visitors into qualified actions faster", {
    left: 70,
    top: 324,
    width: 450,
    height: 74,
  }, { fontSize: 27, bold: true });
  addText(slide, "Clarify the offer, remove trust friction, and show exactly what happens after the first click.", {
    left: 70,
    top: 414,
    width: 450,
    height: 72,
  }, { fontSize: 20, color: muted });
  addText(slide, "CTA: Get the 48h copy rescue", {
    left: 70,
    top: 512,
    width: 450,
    height: 34,
  }, { fontSize: 20, bold: true, color: highlight });
  addPanel(slide, { left: 620, top: 244, width: 270, height: 322 });
  addText(slide, "Notes", { left: 646, top: 274, width: 220, height: 34 }, { fontSize: 24, bold: true });
  addText(slide, "Move proof above the first scroll.\n\nReplace abstract category language with a user action.\n\nPut risk-reducing copy next to the CTA.", {
    left: 646,
    top: 326,
    width: 218,
    height: 190,
  }, { fontSize: 18, color: muted });
  addPanel(slide, { left: 944, top: 244, width: 294, height: 322 });
  addText(slide, "Guardrails", { left: 970, top: 274, width: 240, height: 34 }, { fontSize: 24, bold: true });
  addText(slide, "No guaranteed revenue, ranking, token-price, or investment claims.\n\nCompliance-sensitive wording stays factual and verifiable.", {
    left: 970,
    top: 326,
    width: 236,
    height: 156,
  }, { fontSize: 18, color: muted });
  addText(slide, "Proof: seller-agent typecheck passed; 16 tests passed.", {
    left: 42,
    top: 610,
    width: 760,
    height: 34,
  }, { fontSize: 18, color: muted });
}

{
  const slide = deck.slides.add();
  slide.background.fill = "#FFFFFF";
  title(slide, "The economy can expand from one seller to a marketplace of paid specialists", "CopyMarket starts as one paid endpoint, then becomes a graph of seller, broker, verifier, and reseller agents.", 5);
  addPanel(slide, { left: 72, top: 270, width: 250, height: 116 });
  addText(slide, "Seller", { left: 98, top: 300, width: 196, height: 32 }, { fontSize: 25, bold: true });
  addText(slide, "Delivers copy rescue", { left: 98, top: 344, width: 196, height: 26 }, { fontSize: 17, color: muted });
  addPanel(slide, { left: 398, top: 270, width: 250, height: 116 });
  addText(slide, "Broker", { left: 424, top: 300, width: 196, height: 32 }, { fontSize: 25, bold: true });
  addText(slide, "Routes to specialists", { left: 424, top: 344, width: 196, height: 26 }, { fontSize: 17, color: muted });
  addPanel(slide, { left: 724, top: 270, width: 250, height: 116 });
  addText(slide, "Verifier", { left: 750, top: 300, width: 196, height: 32 }, { fontSize: 25, bold: true });
  addText(slide, "Checks claims and risk", { left: 750, top: 344, width: 196, height: 26 }, { fontSize: 17, color: muted });
  addPanel(slide, { left: 398, top: 464, width: 250, height: 116 });
  addText(slide, "Buyer", { left: 424, top: 494, width: 196, height: 32 }, { fontSize: 25, bold: true });
  addText(slide, "Pays on devnet escrow", { left: 424, top: 538, width: 196, height: 26 }, { fontSize: 17, color: muted });
  arrow(slide, 336, 310);
  arrow(slide, 662, 310);
  addText(slide, "Next step: publish the repo, record a 3-minute run, and submit the GitHub, deck, and video links.", {
    left: 42,
    top: 612,
    width: 1000,
    height: 40,
  }, { fontSize: 21, bold: true });
}

await fs.mkdir(QA_DIR, { recursive: true });
for (const [index, slide] of deck.slides.items.entries()) {
  const stem = `slide-${String(index + 1).padStart(2, "0")}`;
  await writeBlob(path.join(QA_DIR, `${stem}.png`), await deck.export({ slide, format: "png", scale: 1 }));
  await fs.writeFile(path.join(QA_DIR, `${stem}.layout.json`), await (await slide.export({ format: "layout" })).text());
}
await writeBlob(path.join(QA_DIR, "montage.webp"), await deck.export({ format: "webp", montage: true, scale: 1 }));

const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(OUT);
console.log(OUT);
