
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id TEXT NOT NULL,

    title VARCHAR(255) NOT NULL,
    description TEXT,

    completed BOOLEAN NOT NULL DEFAULT FALSE,

    due_date TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_tasks_user
        FOREIGN KEY (user_id)
        REFERENCES "user"(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_tasks_user_id
    ON tasks(user_id);

CREATE INDEX idx_tasks_completed
    ON tasks(completed);