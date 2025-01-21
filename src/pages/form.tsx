import React, { useState } from 'react';
import styles from '../styles/form.module.css';
import Link from 'next/link';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    cibil_score : '', 
    loan_amount : '', 
    loan_term: '', 
    income_annum : '',
    residential_assets_value: '', 
    no_of_dependents: '', 
  });



  const [results, setResults] = useState<any|null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event: React.MouseEventHandler<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('Form submitted!', formData);
    const url = 'http://18.225.54.164:8000/predict';
    try {
        const resp = await fetch(url , {method : 'POST' , 
                                        //mode: 'cors', 
                                        headers: {
                                                    'Content-Type': 'application/json',
                                                  },
                                        body: JSON.stringify(formData)}
                                        );
        const json = await resp.json();
        console.log('resp', json);
        setResults(JSON.parse(json))
     } catch (error) {
        console.log(`Failed to submit to {url}:`, error); 
     }
  };

  return (
    <div style={{ padding: '20px' }} className={styles.form_page}>
      <h1>Check your eligibility here :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Credit score:</label>
        <input
          type="number"
          id="name"
          name="cibil_score"
          value={formData.cibil_score}
          onChange={handleChange}
          required
        />
        <br /><br />
        <label htmlFor="name">Loan amount:</label>
        <input
          type="number"
          id="name"
          name="loan_amount"
          value={formData.loan_amount}
          onChange={handleChange}
          required
        />
        <br /><br />
        <label htmlFor="name">Loan term in years:</label>
        <input
          type="number"
          id="name"
          name="loan_term"
          value={formData.loan_term}
          onChange={handleChange}
          required
        />
        <br /><br />
        <label htmlFor="name">Annual income:</label>
        <input
          type="number"
          id="name"
          name="income_annum"
          value={formData.income_annum}
          onChange={handleChange}
          required
        />
        <br /><br />
        <label htmlFor="name">Residential value</label>
        <input
          type="number"
          id="name"
          name="residential_assets_value"
          value={formData.residential_assets_value}
          onChange={handleChange}
          required
        />
        <br /><br />
        <label htmlFor="name">Number of dependents:</label>
        <input
          type="number"
          id="name"
          name="no_of_dependents"
          value={formData.no_of_dependents}
          onChange={handleChange}
          required
        />
        <br /><br />
      </form>
        <div className="result">
            { results &&
                <>
                    <p> Results :  </p>
                    <p> Eligible : { results['approved'] * 100 } % </p>
                    <p> Not Eligible : { results['not_approved'] * 100 } % </p>
                    <button onClick = {(e) => {
                        setFormData({
                                    cibil_score : '', 
                                    loan_amount : '', 
                                    loan_term: '', 
                                    income_annum : '',
                                    residential_assets_value: '', 
                                    no_of_dependents: '', 
                                });
                        setResults(null);

                    }}> 
                        Reset 
                    </button>
                </>
            }
        </div>

        <button 
            type="submit" 
            onClick = {handleSubmit}
            style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }}>
            Submit
        </button>
      <Link href="/">
        <button style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>Back</button>
      </Link>
    </div>
  );
};

export default Form;
