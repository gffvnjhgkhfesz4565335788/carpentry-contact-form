'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    issue: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setStatus('Success! Your message was sent.');
      setFormData({ name: '', email: '', address: '', issue: '' });
    } else {
      setStatus('Error: Failed to send message.');
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Contact Our Carpentry Team</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required type="email" />
        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address (Optional)" rows={3} />
        <textarea name="issue" value={formData.issue} onChange={handleChange} placeholder="Carpentry Issue" required rows={5} />
        <button type="submit">Submit Request</button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </main>
  );
}
