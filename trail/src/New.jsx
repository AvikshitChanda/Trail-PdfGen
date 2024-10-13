// DivorceForm.js
import React, { useState } from 'react';
import './new.css';  // Import the CSS file

const New = () => {
  const [formData, setFormData] = useState({
    party1: '',
    party2: '',
    marriageDate: '',
    separationDate: '',
    childCustody: '',
    propertyDivision: '',
    spousalSupport: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    setError(''); // Reset any previous error message

    // Simple validation
    if (!formData.party1 || !formData.party2 || !formData.marriageDate || !formData.separationDate) {
      setError('Please fill in all required fields.');
      setLoading(false); // Reset loading state
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/generate-divorce-document', { // Ensure full URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        window.open(result.downloadLink, '_blank'); // Open download link in a new tab
      } else {
        setError('Error generating document: ' + result.message); // Display error message from the backend
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while generating the document. Please try again.');
    } finally {
      setLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Divorce Settlement Form</h2>

      {/* Error message display */}
      {error && <div className="error-message">{error}</div>}

      <label>Party 1 Name:</label>
      <input
        type="text"
        name="party1"
        placeholder="Party 1 Name"
        value={formData.party1}
        onChange={handleChange}
        required
      />
      <label>Party 2 Name:</label>
      <input
        type="text"
        name="party2"
        placeholder="Party 2 Name"
        value={formData.party2}
        onChange={handleChange}
        required
      />
      <label>Marriage Date:</label>
      <input
        type="date"
        name="marriageDate"
        value={formData.marriageDate}
        onChange={handleChange}
        required
      />
      <label>Separation Date:</label>
      <input
        type="date"
        name="separationDate"
        value={formData.separationDate}
        onChange={handleChange}
        required
      />
      <label>Child Custody Terms:</label>
      <textarea
        name="childCustody"
        placeholder="Child Custody Terms"
        value={formData.childCustody}
        onChange={handleChange}
      />
      <label>Property Division Terms:</label>
      <textarea
        name="propertyDivision"
        placeholder="Property Division Terms"
        value={formData.propertyDivision}
        onChange={handleChange}
      />
      <label>Spousal Support Terms:</label>
      <textarea
        name="spousalSupport"
        placeholder="Spousal Support Terms"
        value={formData.spousalSupport}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Divorce Settlement Document'}
      </button>
    </form>
  );
};

export default New;
