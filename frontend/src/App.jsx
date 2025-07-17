import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <header className="w-full py-6 shadow-sm bg-white">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Ronsare</h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#api" className="hover:text-blue-600">API</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Build Fast, Deploy Faster</h2>
          <p className="text-gray-600 mb-6">
            Ronsare combines the power of FastAPI and React to help you build scalable applications faster than ever. 
            Focus on your product — we’ll handle the boilerplate.
          </p>
          <a
            href="/api"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} Ronsare. All rights reserved.
      </footer>
    </div>
  );
}
