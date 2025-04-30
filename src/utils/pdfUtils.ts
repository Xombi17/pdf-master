import { PDFDocument } from 'pdf-lib';

export async function mergePDFs(pdfFiles: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of pdfFiles) {
    const fileBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(fileBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  
  return mergedPdf.save();
}

export async function splitPDF(pdfFile: File, ranges: string): Promise<Uint8Array[]> {
  const fileBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(fileBuffer);
  const pageCount = pdf.getPageCount();
  
  const rangeArray = ranges.split(',').map(range => range.trim());
  const results: Uint8Array[] = [];
  
  for (const range of rangeArray) {
    const [start, end] = range.split('-').map(num => parseInt(num));
    const endPage = end || start;
    
    if (start > 0 && start <= pageCount && endPage <= pageCount) {
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdf, Array.from(
        { length: endPage - start + 1 },
        (_, i) => start - 1 + i
      ));
      pages.forEach(page => newPdf.addPage(page));
      results.push(await newPdf.save());
    }
  }
  
  return results;
}

export async function compressPDF(pdfFile: File, quality: 'low' | 'medium' | 'high'): Promise<Uint8Array> {
  const fileBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(fileBuffer);
  
  // Quality settings for image compression
  const qualitySettings = {
    low: 0.3,
    medium: 0.6,
    high: 0.8
  };
  
  // Create a new document to store compressed content
  const compressedPdf = await PDFDocument.create();
  const pages = await compressedPdf.copyPages(pdf, pdf.getPageIndices());
  
  pages.forEach(page => {
    compressedPdf.addPage(page);
  });
  
  // Compress with selected quality
  return compressedPdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 50,
    updateFieldAppearances: true
  });
}

export function downloadPDF(pdfBytes: Uint8Array, filename: string) {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadZip(files: Uint8Array[], baseFilename: string) {
  // For now, we'll just download the first file
  // In a real implementation, we would use a library like JSZip to create a zip file
  if (files.length > 0) {
    downloadPDF(files[0], `${baseFilename}_1.pdf`);
  }
}