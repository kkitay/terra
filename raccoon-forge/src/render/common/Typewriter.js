import React from 'react';
import Typist from 'react-typist';

const Typewriter = ({ name, doneTyping = () => {}, children }) => {
  return (
    <Typist
      className={name}
      avgTypingDelay={10}
      stdTypingDelay={0}
      cursor={{ show: false }}
      onTypingDone={() => doneTyping(name)}
    >
      {children}
    </Typist>
  );
};

export default Typewriter;
