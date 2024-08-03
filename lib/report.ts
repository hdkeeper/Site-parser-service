import path from 'path';
import PDFDocument from 'pdfkit';

export function createReport(output: NodeJS.WritableStream, title: string, stats: string[]) {
    const doc = new PDFDocument({ size: 'A4' });
    doc.pipe(output);
    doc.registerFont('default', path.join(__dirname, '../fonts/frabk.ttf'));
    doc.font('default').fontSize(14);
    
    doc.fillColor('blue')
        .text(title, { underline: true })
        .moveDown(1);
    
    doc.fillColor('black');
    stats.forEach((word, i) => doc.text(`${i+1}. ${word}`));
    
    doc.end();
}
