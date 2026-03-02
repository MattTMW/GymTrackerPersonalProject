//Client HomePage

"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";

const phrases = [
  "Minimal Tracking",
  "Less Distractions",
  "Better Lifting",
  "Progress Made Simple",
];


export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      setTimeout(() => {
        // Swap text, then fade in
        setIndex((prev) => (prev + 1) % phrases.length);
        setVisible(true);
      }, 400);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
        <span className="text-lg font-bold tracking-tight">AYG.</span> 
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="/workouts" className="hover:text-zinc-900 transition-colors">Workouts</Link>
          <Link href="/goals" className="hover:text-zinc-900 transition-colors">Goals</Link>
          <Link href="/progress" className="rounded-full bg-zinc-900 text-white px-4 py-1.5 hover:bg-zinc-700 transition-colors">
            Log in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="py-32 text-center">
        <h1
          className="text-4xl font-bold transition-opacity duration-400"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {phrases[index]}
        </h1>
        <p className="mt-4 text-zinc-600"> By an athlete. For all athletes.</p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="/workouts" className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-700 hover:text-white transition-colors">
            Workouts
          </a>
          <a href="/goals" className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-700 hover:text-white transition-colors">
            Goals
          </a>
        </div>
      </div>
    </div>
  );
};