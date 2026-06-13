CREATE TABLE IF NOT EXISTS users (
    id             TEXT PRIMARY KEY,
    name           TEXT NOT NULL,
    role           TEXT NOT NULL,
    email          TEXT NOT NULL UNIQUE,
    status         TEXT NOT NULL,
    department     TEXT NOT NULL,
    country        TEXT NOT NULL,
    verified       BOOLEAN NOT NULL DEFAULT FALSE,
    tags           TEXT[] NOT NULL DEFAULT '{}',
    last_active_at TEXT NOT NULL,
    created_at     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id       TEXT PRIMARY KEY,
    customer TEXT NOT NULL,
    total    DOUBLE PRECISION NOT NULL,
    status   TEXT NOT NULL,
    tags     TEXT[] NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_users_status ON users (status);
CREATE INDEX IF NOT EXISTS idx_users_role ON users (role);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
