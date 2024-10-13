const PDFDocument = require('pdfkit');
const fs = require('fs');

const createDivorceDocument = (data, filePath, callback) => {
  const { party1, party2, marriageDate, separationDate, childCustody, propertyDivision, spousalSupport } = data;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  console.log('Starting to write PDF content'); // Log when PDF content writing starts

  doc.fontSize(18).text('Divorce Settlement Agreement', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`This Divorce Settlement Agreement is made between ${party1} and ${party2}.`, { align: 'left' });
  doc.moveDown();
  doc.text(`Date of Marriage: ${marriageDate}`);
  doc.text(`Date of Separation: ${separationDate}`);
  doc.moveDown();

  doc.text('Child Custody Terms:', { underline: true });
  doc.text(childCustody || 'No specific terms provided.');
  doc.moveDown();

  doc.text('Property Division Terms:', { underline: true });
  doc.text(propertyDivision || 'No specific terms provided.');
  doc.moveDown();

  doc.text('Spousal Support Terms:', { underline: true });
  doc.text(spousalSupport || 'No specific terms provided.');
  doc.moveDown();

  doc.text('By signing this document, both parties agree to the terms outlined above.');
  doc.moveDown();
  
  doc.text('Party 1: _________________________', { align: 'left' });
  doc.text('Party 2: _________________________', { align: 'left' });

  doc.end();  // Finalize the PDF document

  // Ensure callback is called after the document is finished
  doc.on('finish', () => {
    console.log('PDF writing finished'); // Log when PDF writing is finished
    callback();
  });

  doc.on('error', (error) => {
    console.error("Error generating PDF:", error); // Log any errors during PDF generation
  });
};

module.exports = { createDivorceDocument };
