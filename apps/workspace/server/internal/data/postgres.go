package data

import (
	"database/sql"
	"embed"
	"fmt"

	"github.com/lib/pq"

	"github.com/echojs-ecosystem/workspace-server/internal/models"
)

//go:embed migrate.sql
var migrateSQL embed.FS

func migrate(db *sql.DB) error {
	sqlBytes, err := migrateSQL.ReadFile("migrate.sql")
	if err != nil {
		return fmt.Errorf("read migrate.sql: %w", err)
	}
	if _, err := db.Exec(string(sqlBytes)); err != nil {
		return fmt.Errorf("run migrations: %w", err)
	}
	return nil
}

func seedIfEmpty(db *sql.DB) error {
	var count int
	if err := db.QueryRow(`SELECT COUNT(*) FROM users`).Scan(&count); err != nil {
		return fmt.Errorf("count users: %w", err)
	}
	if count > 0 {
		return nil
	}

	tx, err := db.Begin()
	if err != nil {
		return fmt.Errorf("begin seed tx: %w", err)
	}
	defer tx.Rollback()

	for _, user := range SeedUsers() {
		if err := insertUserTx(tx, user); err != nil {
			return err
		}
	}
	for _, order := range SeedOrders() {
		if err := insertOrderTx(tx, order); err != nil {
			return err
		}
	}

	return tx.Commit()
}

func resetDB(db *sql.DB) error {
	if _, err := db.Exec(`TRUNCATE users, orders`); err != nil {
		return fmt.Errorf("truncate tables: %w", err)
	}
	return seedIfEmpty(db)
}

func (s *Store) allUsersDB() ([]models.AdminUser, error) {
	rows, err := s.db.Query(`
		SELECT id, name, role, email, status, department, country, verified, tags, last_active_at, created_at
		FROM users
		ORDER BY created_at DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := make([]models.AdminUser, 0)
	for rows.Next() {
		user, err := scanUser(rows)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, rows.Err()
}

func (s *Store) allOrdersDB() ([]models.AdminOrder, error) {
	rows, err := s.db.Query(`
		SELECT id, customer, total, status, tags
		FROM orders
		ORDER BY id
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	orders := make([]models.AdminOrder, 0)
	for rows.Next() {
		order, err := scanOrder(rows)
		if err != nil {
			return nil, err
		}
		orders = append(orders, order)
	}
	return orders, rows.Err()
}

func (s *Store) findUserDB(id string) (*models.AdminUser, bool) {
	row := s.db.QueryRow(`
		SELECT id, name, role, email, status, department, country, verified, tags, last_active_at, created_at
		FROM users WHERE id = $1
	`, id)
	user, err := scanUser(row)
	if err != nil {
		return nil, false
	}
	return &user, true
}

func (s *Store) findOrderDB(id string) (*models.AdminOrder, bool) {
	row := s.db.QueryRow(`
		SELECT id, customer, total, status, tags
		FROM orders WHERE id = $1
	`, id)
	order, err := scanOrder(row)
	if err != nil {
		return nil, false
	}
	return &order, true
}

func (s *Store) insertUserDB(user models.AdminUser) error {
	_, err := s.db.Exec(`
		INSERT INTO users (id, name, role, email, status, department, country, verified, tags, last_active_at, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
	`, user.ID, user.Name, user.Role, user.Email, user.Status, user.Department, user.Country, user.Verified, pq.Array(user.Tags), user.LastActiveAt, user.CreatedAt)
	return err
}

func (s *Store) updateUserDB(user models.AdminUser) error {
	res, err := s.db.Exec(`
		UPDATE users
		SET name = $2, role = $3, email = $4, status = $5, department = $6,
		    country = $7, verified = $8, tags = $9, last_active_at = $10
		WHERE id = $1
	`, user.ID, user.Name, user.Role, user.Email, user.Status, user.Department, user.Country, user.Verified, pq.Array(user.Tags), user.LastActiveAt)
	if err != nil {
		return err
	}
	n, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if n == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func (s *Store) deleteUserDB(id string) bool {
	res, err := s.db.Exec(`DELETE FROM users WHERE id = $1`, id)
	if err != nil {
		return false
	}
	n, _ := res.RowsAffected()
	return n > 0
}

func (s *Store) emailExistsDB(email, excludeID string) bool {
	var exists bool
	err := s.db.QueryRow(`
		SELECT EXISTS(
			SELECT 1 FROM users
			WHERE LOWER(email) = LOWER($1) AND ($2 = '' OR id <> $2)
		)
	`, email, excludeID).Scan(&exists)
	return err == nil && exists
}

func (s *Store) insertOrderDB(order models.AdminOrder) error {
	_, err := s.db.Exec(`
		INSERT INTO orders (id, customer, total, status, tags)
		VALUES ($1, $2, $3, $4, $5)
	`, order.ID, order.Customer, order.Total, order.Status, pq.Array(order.Tags))
	return err
}

func (s *Store) updateOrderDB(order models.AdminOrder) error {
	res, err := s.db.Exec(`
		UPDATE orders SET customer = $2, total = $3, status = $4, tags = $5
		WHERE id = $1
	`, order.ID, order.Customer, order.Total, order.Status, pq.Array(order.Tags))
	if err != nil {
		return err
	}
	n, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if n == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func (s *Store) deleteOrderDB(id string) bool {
	res, err := s.db.Exec(`DELETE FROM orders WHERE id = $1`, id)
	if err != nil {
		return false
	}
	n, _ := res.RowsAffected()
	return n > 0
}

func insertUserTx(tx *sql.Tx, user models.AdminUser) error {
	_, err := tx.Exec(`
		INSERT INTO users (id, name, role, email, status, department, country, verified, tags, last_active_at, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
	`, user.ID, user.Name, user.Role, user.Email, user.Status, user.Department, user.Country, user.Verified, pq.Array(user.Tags), user.LastActiveAt, user.CreatedAt)
	if err != nil {
		return fmt.Errorf("insert user %s: %w", user.ID, err)
	}
	return nil
}

func insertOrderTx(tx *sql.Tx, order models.AdminOrder) error {
	_, err := tx.Exec(`
		INSERT INTO orders (id, customer, total, status, tags)
		VALUES ($1, $2, $3, $4, $5)
	`, order.ID, order.Customer, order.Total, order.Status, pq.Array(order.Tags))
	if err != nil {
		return fmt.Errorf("insert order %s: %w", order.ID, err)
	}
	return nil
}

type rowScanner interface {
	Scan(dest ...any) error
}

func scanUser(row rowScanner) (models.AdminUser, error) {
	var user models.AdminUser
	var tags pq.StringArray
	err := row.Scan(
		&user.ID, &user.Name, &user.Role, &user.Email, &user.Status, &user.Department,
		&user.Country, &user.Verified, &tags, &user.LastActiveAt, &user.CreatedAt,
	)
	if err != nil {
		return models.AdminUser{}, err
	}
	user.Tags = []string(tags)
	return user, nil
}

func scanOrder(row rowScanner) (models.AdminOrder, error) {
	var order models.AdminOrder
	var tags pq.StringArray
	err := row.Scan(&order.ID, &order.Customer, &order.Total, &order.Status, &tags)
	if err != nil {
		return models.AdminOrder{}, err
	}
	order.Tags = []string(tags)
	return order, nil
}
