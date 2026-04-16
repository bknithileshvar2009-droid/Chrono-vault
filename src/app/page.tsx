'use client';

export default function Home() {
  return (
    <main style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0070f3' }}>Chrono-vault</h1>
      <p>Welcome to my secure digital vault.</p>
      
      {/* You can start adding your project Apex features here */}
      <div style={{ marginTop: '50px', border: '1px solid #ccc', padding: '20px' }}>
        <h3>Vault Status: Locked</h3>
        <button onClick={() => alert('Developing login...')}>Access Vault</button>
      </div>
    </main>
  );
}
