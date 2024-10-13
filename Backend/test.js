const { createDivorceDocument } = require('./utils/pdfUtils');

const testData = {
  party1: 'John Doe',
  party2: 'Jane Smith',
  marriageDate: '2010-06-15',
  separationDate: '2023-01-10',
  childCustody: 'Joint custody of two children.',
  propertyDivision: 'Equal division of all assets.',
  spousalSupport: '$2000 per month for 5 years.'
};

createDivorceDocument(testData, './documents/test_document.pdf', () => {
  console.log('Test document generated successfully');
});
