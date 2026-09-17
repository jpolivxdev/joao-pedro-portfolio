// Script único (não faz parte do site em si) para gerar PDF a partir dos
// currículos em .docx. Roda uma vez com `node scripts/convert-resumes.mjs`.
//
// Como o ambiente não tem LibreOffice/Word instalado (que normalmente fazem
// essa conversão com fidelidade 100%), o caminho aqui é: mammoth extrai o
// conteúdo do .docx como HTML simples (parágrafos, negrito, listas,
// títulos), e o pdfkit desenha esse conteúdo num PDF novo, formatado de
// forma limpa. O resultado não é pixel-a-pixel igual ao .docx original,
// mas é 100% legível e correto no conteúdo.

import { readFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import mammoth from "mammoth";
import PDFDocument from "pdfkit";

const files = [
  {
    docx: "public/curriculos/Joao_Pedro_Curriculo_Backend.docx",
    pdf: "public/curriculos/Joao_Pedro_Curriculo_Backend.pdf",
  },
  {
    docx: "public/curriculos/Joao_Pedro_Curriculo_Suporte.docx",
    pdf: "public/curriculos/Joao_Pedro_Curriculo_Suporte.pdf",
  },
];

// Quebra o HTML do mammoth em blocos (parágrafo, título, item de lista),
// já marcando se o bloco inteiro é negrito e se é um título.
function parseBlocks(html) {
  const blocks = [];
  const blockRegex = /<(h[1-6]|p|li)[^>]*>([\s\S]*?)<\/\1>/g;
  let match;
  while ((match = blockRegex.exec(html))) {
    const [, tag, innerHtml] = match;
    const isHeading = /^h[1-6]$/.test(tag);
    const isListItem = tag === "li";
    const fullyBold = /^<strong>[\s\S]*<\/strong>$/.test(innerHtml.trim());
    const text = innerHtml
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
    if (!text) continue;
    blocks.push({ text, isHeading, isListItem, bold: isHeading || fullyBold });
  }
  return blocks;
}

async function convertOne({ docx, pdf }) {
  const absoluteDocx = path.resolve(docx);
  const buffer = await readFile(absoluteDocx);
  const { value: html } = await mammoth.convertToHtml({ buffer });
  const blocks = parseBlocks(html);

  const doc = new PDFDocument({ margin: 56, size: "A4" });
  doc.pipe(createWriteStream(path.resolve(pdf)));

  doc.font("Helvetica");

  for (const block of blocks) {
    if (block.isHeading) {
      doc.moveDown(0.6);
      doc.font("Helvetica-Bold").fontSize(13).fillColor("#111827").text(block.text);
      doc.font("Helvetica").fontSize(10.5).fillColor("#1f2937");
      continue;
    }

    const prefix = block.isListItem ? "•  " : "";
    doc.font(block.bold ? "Helvetica-Bold" : "Helvetica");
    doc.text(prefix + block.text, {
      indent: block.isListItem ? 12 : 0,
      lineGap: 2,
    });
  }

  doc.end();
  console.log(`Gerado: ${pdf}`);
}

for (const file of files) {
  await convertOne(file);
}
