import { pool } from "../../../database/db";

// POST /api/workouts — saves a workout to the database
export async function POST(request) {
    try {
        const { date, split, unit, exercises } = await request.json();

        const result = await pool.query(
            `INSERT INTO workouts (date, split, unit, exercises)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [date, split, unit, JSON.stringify(exercises)]
        );

        return Response.json({ success: true, workout: result.rows[0] }, { status: 201 });
    } catch (err) {
        console.error("Error saving workout:", err);
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}

// GET /api/workouts — retrieves all saved workouts
export async function GET() {
    try {
        const result = await pool.query(
            `SELECT * FROM workouts ORDER BY date DESC`
        );
        return Response.json({ success: true, workouts: result.rows });
    } catch (err) {
        console.error("Error fetching workouts:", err);
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}
