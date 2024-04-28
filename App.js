import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [cowCount, setCowCount] = useState('');
  const [buffaloCount, setBuffaloCount] = useState('');
  const [milkProduced, setMilkProduced] = useState('');
  const [foodConsumed, setFoodConsumed] = useState('');
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setUserId(data.userId); // Set userId state after successful login
        setMessage('');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddRecord = async () => {
    try {
      const response = await fetch('http://localhost:5000/addRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, date, cowCount, buffaloCount, milkProduced, foodConsumed }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGetRecord = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getRecord/${date}`);
      const data = await response.json();
      if (data.success) {
        setRecords(data.data);
        setMessage('');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>

      <h1>Add Record</h1>
      <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="number" placeholder="Cow Count" value={cowCount} onChange={(e) => setCowCount(e.target.value)} />
      <input type="number" placeholder="Buffalo Count" value={buffaloCount} onChange={(e) => setBuffaloCount(e.target.value)} />
      <input type="number" placeholder="Milk Produced" value={milkProduced} onChange={(e) => setMilkProduced(e.target.value)} />
      <input type="number" placeholder="Food Consumed" value={foodConsumed} onChange={(e) => setFoodConsumed(e.target.value)} />
      <button onClick={handleAddRecord} disabled={!userId}>Add Record</button>
      <p>{message}</p>

      <h1>Get Record</h1>
      <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleGetRecord}>Get Record</button>
      {records.map((record, index) => (
        <div key={index}>
          <p>{record.date}</p>
          <p>{record.cowCount}</p>
          <p>{record.buffaloCount}</p>
          <p>{record.milkProduced}</p>
          <p>{record.foodConsumed}</p>
        </div>
      ))}
      <p>{message}</p>
    </div>
  );
}

export default App;

