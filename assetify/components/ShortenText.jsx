import React, { useState, useEffect, useRef } from 'react';

const ShortenText = ({ text, maxLength = 10 }) => {
  const [shortenedText, setShortenedText] = useState('');
  const textRef = useRef(null);

  useEffect(() => {
    const updateText = () => {
      if (text.length > maxLength) {
        const start = text.substring(0, 3);
        const end = text.substring(text.length - 4);
        setShortenedText(`${start}..${end}`);
      } else {
        setShortenedText(text);
      }
    };

    updateText();
    const resizeObserver = new ResizeObserver(updateText);
    resizeObserver.observe(textRef.current);

    return () => resizeObserver.disconnect();
  }, [text, maxLength]);

  return <div ref={textRef}>{shortenedText}</div>;
};

export default ShortenText;
