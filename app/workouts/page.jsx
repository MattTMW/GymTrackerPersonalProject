"use client";

import { useState } from "react";

const SPLITS = ["Push", "Pull", "Legs", "Upper", "Lower", "Full Body", "Cardio", "Other"];
const emptySet = () => ({ reps: "", weight: "", note: "" });
const emptyExercise = () => ({ name: "", sets: [emptySet()] });

export default function WorkoutsPage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [split, setSplit] = useState("");
  const [unit, setUnit] = useState("lbs");
  const [exercises, setExercises] = useState([emptyExercise()]);
  const [saved, setSaved] = useState(false);

  const updateName = (ei, val) => {
    setSaved(false);
    setExercises((p) => p.map((ex, i) => i === ei ? { ...ex, name: val } : ex));
  };

  const updateSet = (ei, si, field, val) => {
    setSaved(false);
    setExercises((p) =>
      p.map((ex, i) =>
        i !== ei ? ex : {
          ...ex,
          sets: ex.sets.map((s, j) => j === si ? { ...s, [field]: val } : s),
        }
      )
    );
  };

  const addSet = (ei) => {
    setSaved(false);
    setExercises((p) =>
      p.map((ex, i) => {
        if (i !== ei) return ex;
        const last = ex.sets[ex.sets.length - 1];
        return { ...ex, sets: [...ex.sets, { reps: last.reps, weight: "", note: "" }] };
      })
    );
  };

  const removeSet = (ei, si) => {
    setSaved(false);
    setExercises((p) =>
      p.map((ex, i) =>
        i !== ei || ex.sets.length === 1 ? ex : { ...ex, sets: ex.sets.filter((_, j) => j !== si) }
      )
    );
  };

  const removeExercise = (ei) => {
    if (exercises.length === 1) return;
    setSaved(false);
    setExercises((p) => p.filter((_, i) => i !== ei));
  };

  return (
    <div className="min-h-screen text-zinc-800" style={{ backgroundColor: "#f7f7f5", fontFamily: "'Georgia', serif" }}>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-zinc-100">
        <a href="/" className="text-lg font-bold tracking-tight">AYG.</a>
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <a href="/workouts" className="text-zinc-900 font-medium">Workouts</a>
          <a href="/goals" className="hover:text-zinc-900 transition-colors">Goals</a>
          <a href="/progress" className="rounded-full bg-zinc-900 text-white px-4 py-1.5 hover:bg-zinc-700 transition-colors">
            Log in
          </a>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-5 py-16">

        {/* Page title */}
        <div className="mb-10">
          <p className="text-xs tracking-widest text-zinc-400 uppercase mb-1">Log</p>
          <h1 className="text-2xl font-bold text-zinc-900">Workout Entry</h1>
        </div>

        {/* Meta card */}
        <div className="bg-white rounded-2xl border border-zinc-100 px-6 py-5 mb-4 shadow-sm">
          <div className="flex items-center gap-4 mb-5">
            <label className="text-xs tracking-widest text-zinc-400 uppercase w-10">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => { setDate(e.target.value); setSaved(false); }}
              className="text-sm text-zinc-700 bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex items-start gap-4 mb-5">
            <label className="text-xs tracking-widest text-zinc-400 uppercase w-10 pt-1">Split</label>
            <div className="flex gap-2 flex-wrap">
              {SPLITS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSplit(s); setSaved(false); }}
                  className="text-xs px-3 py-1 rounded-full border transition-all"
                  style={{
                    borderColor: split === s ? "#18181b" : "#e5e7eb",
                    backgroundColor: split === s ? "#18181b" : "transparent",
                    color: split === s ? "#fff" : "#a1a1aa",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-xs tracking-widest text-zinc-400 uppercase w-10">Unit</label>
            <div className="flex gap-2">
              {["lbs", "kg"].map((u) => (
                <button
                  key={u}
                  onClick={() => { setUnit(u); setSaved(false); }}
                  className="text-xs px-3 py-1 rounded-full border transition-all"
                  style={{
                    borderColor: unit === u ? "#18181b" : "#e5e7eb",
                    backgroundColor: unit === u ? "#18181b" : "transparent",
                    color: unit === u ? "#fff" : "#a1a1aa",
                  }}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Exercise cards */}
        <div className="space-y-3 mb-3">
          {exercises.map((ex, ei) => (
            <div key={ei} className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">

              {/* Card header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-zinc-50">
                <input
                  type="text"
                  placeholder="Exercise name"
                  value={ex.name}
                  onChange={(e) => updateName(ei, e.target.value)}
                  className="text-base font-semibold bg-transparent placeholder-zinc-300 focus:outline-none flex-1 tracking-tight"
                />
                {exercises.length > 1 && (
                  <button
                    onClick={() => removeExercise(ei)}
                    className="text-zinc-300 hover:text-zinc-500 transition-colors text-xl leading-none ml-3"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Set rows */}
              <div className="px-6 py-3">
                {/* Column labels */}
                <div className="grid gap-2 mb-2" style={{ gridTemplateColumns: "32px 1fr 1fr 1.4fr 24px" }}>
                  {["Set", "Reps", unit, "Note", ""].map((h, i) => (
                    <span key={i} className="text-xs tracking-widest text-zinc-300 uppercase text-center first:text-left">{h}</span>
                  ))}
                </div>

                <div className="space-y-2">
                  {ex.sets.map((s, si) => (
                    <div
                      key={si}
                      className="grid gap-2 items-center group/row"
                      style={{ gridTemplateColumns: "32px 1fr 1fr 1.4fr 24px" }}
                    >
                      {/* Set number badge */}
                      <span
                        className="text-xs font-medium w-6 h-6 rounded-full flex items-center justify-center mx-auto"
                        style={{ backgroundColor: "#f4f4f5", color: "#a1a1aa" }}
                      >
                        {si + 1}
                      </span>

                      {/* Reps */}
                      <input
                        type="number"
                        min="0"
                        placeholder="—"
                        value={s.reps}
                        onChange={(e) => updateSet(ei, si, "reps", e.target.value)}
                        className="text-sm text-center bg-zinc-50 rounded-lg py-1.5 focus:outline-none focus:bg-zinc-100 transition-colors w-full placeholder-zinc-300"
                      />

                      {/* Weight */}
                      <input
                        type="number"
                        min="0"
                        placeholder="—"
                        value={s.weight}
                        onChange={(e) => updateSet(ei, si, "weight", e.target.value)}
                        className="text-sm text-center bg-zinc-50 rounded-lg py-1.5 focus:outline-none focus:bg-zinc-100 transition-colors w-full placeholder-zinc-300"
                      />

                      {/* Note */}
                      <input
                        type="text"
                        placeholder="warm-up, PR…"
                        value={s.note}
                        onChange={(e) => updateSet(ei, si, "note", e.target.value)}
                        className="text-xs bg-zinc-50 rounded-lg py-1.5 px-2 focus:outline-none focus:bg-zinc-100 transition-colors w-full placeholder-zinc-300 text-zinc-500"
                      />

                      {/* Remove set */}
                      <button
                        onClick={() => removeSet(ei, si)}
                        className="text-zinc-300 hover:text-zinc-500 transition-colors text-base leading-none opacity-0 group-hover/row:opacity-100 mx-auto"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add set */}
                <button
                  onClick={() => addSet(ei)}
                  className="mt-3 w-full py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-all flex items-center justify-center gap-1 border border-dashed border-zinc-200 hover:border-zinc-300"
                >
                  + add set
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add exercise */}
        <button
          onClick={() => { setExercises((p) => [...p, emptyExercise()]); setSaved(false); }}
          className="w-full py-4 rounded-2xl border border-dashed border-zinc-200 hover:border-zinc-400 text-sm text-zinc-400 hover:text-zinc-600 transition-all mb-10"
        >
          + Add Exercise
        </button>

        {/* Save */}
        <div className="flex items-center justify-between">
          <span
            className="text-sm text-zinc-400 transition-opacity duration-300"
            style={{ opacity: saved ? 1 : 0 }}
          >
            Saved ✓
          </span>
          <button
            onClick={() => setSaved(true)}
            className="rounded-full bg-zinc-900 text-white text-sm px-8 py-2.5 hover:bg-zinc-700 transition-colors"
          >
            Save Workout
          </button>
        </div>

      </div>
    </div>
  );
}