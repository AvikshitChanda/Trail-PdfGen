const path = require('path');
const { createDivorceDocument } = require('../utils/pdfUtils');

const generateDivorceDocument = (req, res) => {
  console.log('Request received for document generation'); // Log when the request is received

  try {
    const { party1, party2, marriageDate, separationDate, childCustody, propertyDivision, spousalSupport } = req.body;

    console.log('Request body:', req.body); // Log the request body for debugging

    // Validate required fields
    if (!party1 || !party2 || !marriageDate || !separationDate) {
      console.error('Validation failed: Missing required fields'); // Log validation errors
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Generate PDF document
    const documentName = `divorce_settlement_${Date.now()}.pdf`;
    const filePath = path.resolve('documents', documentName);
    
    console.log(`Generating PDF at: ${filePath}`); // Log the file path where the PDF will be saved

    createDivorceDocument(req.body, filePath, () => {
      console.log('PDF generated successfully'); // Log when PDF generation is successful
      res.json({ success: true, downloadLink: `http://localhost:5000/documents/${documentName}` });
    });

  } catch (error) {
    console.error("Error in document generation:", error); // Log any errors that occur during execution
    res.status(500).json({ error: 'An error occurred while generating the document.' });
  }
};

module.exports = { generateDivorceDocument };
