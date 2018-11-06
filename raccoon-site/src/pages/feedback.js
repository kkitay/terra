import React, { useState } from 'react';

export default () => {
  const [name, setName] = useState('');

  const changeName = event => {
    console.log(event.target);
    setName(event.target.value);
    
  };

  return (
    <div className="Feedback">
      <p>You have feedback? The Raccoon wants to know.</p>
      <form>
        <label>
          <input
            value={name}
            placeholder="What's your name?"
          />
        </label>
      </form>
    </div>
  );
};
