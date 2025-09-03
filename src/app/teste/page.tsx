'use client';

import FallingPetals from '../../components/FallingPetals';

export default function TestePage() {
  return (
    <div>
      <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Scroll down to see the petals</h1>
      </div>
      <FallingPetals />
      <div style={{ height: '100vh', background: '#e0e0e0' }}></div>
    </div>
  );
}