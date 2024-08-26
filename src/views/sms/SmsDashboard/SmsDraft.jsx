import React, { useState } from 'react';


// {companyName}

// Dear {customerName},
// Thank you for your purchase!

// Invoice ID: {invoiceId}
// Total Amount: {totalAmount}
// Paid: {paidAmount}
// Due: {dueAmount}

// Please settle the due amount at your earliest convenience.
// Thank you for choosing us!

const SmsDraft = () => {
  const [template, setTemplate] = useState('');
  const [charCount, setCharCount] = useState(0);

  // Example dynamic content
  const dynamicContent = {
    companyName: '-- PARASH ENTERRPRISE --',
    customerName: 'John Doe',
    invoiceId: '123456',
    totalProductList: 'Product1, Product2, Product3',
    totalAmount: '5000',
    paidAmount: '3000',
    dueAmount: '2000'
  };

  // Function to replace placeholders and handle line breaks
  const replacePlaceholders = (template) => {
    // Replace placeholders with dynamic content
    let replacedText = template.replace(/{(\w+)}/g, (_, key) => dynamicContent[key] || `{${key}}`);

    // Replace newlines with <br/> tags
    replacedText = replacedText.replace(/\n/g, '<br/>');

    return replacedText;
  };

  // Update character count and template
  const handleChange = (e) => {
    const newTemplate = e.target.value;
    setTemplate(newTemplate);
    setCharCount(newTemplate.length);
  };

  return (
    <div>
      <h3>Enter SMS Template:</h3>
      <textarea value={template} onChange={handleChange} placeholder="Paste your template here" rows="10" cols="50" />

      <h3>Character Count: {charCount}</h3>

      <h3>SMS Preview:</h3>
      <p dangerouslySetInnerHTML={{ __html: replacePlaceholders(template) }} />
    </div>
  );
};

export default SmsDraft;
