CREATE TABLE IF NOT EXISTS workout (
    workoutId serial PRIMARY KEY,
    workoutName varchar NOT NULL,
    createdAt varchar,
    exercises varchar[]
);