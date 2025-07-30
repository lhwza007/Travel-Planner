import React from 'react';
import Nav from '../components/Nav';

export default function Home() {
    console.log('Home is rendering');
  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h1 className="card-title">Hello from Home Page</h1>
        <p className="card-text">Welcome to the Home page!</p>
      </div>
    </div>
    
  );
}