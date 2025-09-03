import React from 'react';

const AnimatedBackground = () => {
  // Crie um array com 10 elementos para renderizar 10 pétalas
  const petals = Array.from({ length: 10 });

  return (
    <div className="petals-container">
      {petals.map((_, index) => (
        <div key={index} className="petal" />
      ))}
    </div>
  );
};

export default AnimatedBackground; 