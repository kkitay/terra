import React from 'react';
import Typist from 'react-typist';

const Typewriter = ({ name, doneTyping = null, children }) => {
  return (
    <Typist
      className={name}
      avgTypingDelay={15}
      stdTypingDelay={0}
      cursor={{ show: false }}
      onTypingDone={doneTyping ? () => doneTyping(name) : null}
    >
      {children}
    </Typist>
  );
};

export default Typewriter;
