import React, { useState, useEffect } from 'react';
import { dbRef, get } from '../firebase';

function EnrollButtons() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Fetch responses from Firebase when the component mounts
    get(dbRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (data && data.enrollButtons) {
          setResponses(data.enrollButtons);
        }
      })
      .catch((error) => {
        console.error('Error fetching data from Firebase:', error);
      });
  }, []);

  const handleButtonClick = (response) => {
    // Display the response when a button is clicked
    alert(response);
  };

  return (
    <div>
      <h2>Enroll Options</h2>
      {responses.map((response, index) => (
        <button key={index} onClick={() => handleButtonClick(response)}>
          {response}
        </button>
      ))}
    </div>
  );
}

export default EnrollButtons;
