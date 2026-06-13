package data

import (
	"database/sql"
	"fmt"
	"strings"

	_ "github.com/jackc/pgx/v5/stdlib"

	"github.com/echojs-ecosystem/workspace-server/internal/models"
)

type Store struct {
	db *sql.DB

	users  []models.AdminUser
	orders []models.AdminOrder
}

func NewStore() *Store {
	return &Store{
		users:  cloneUsers(SeedUsers()),
		orders: cloneOrders(SeedOrders()),
	}
}

func NewStoreFromURL(databaseURL string) (*Store, error) {
	db, err := sql.Open("pgx", databaseURL)
	if err != nil {
		return nil, fmt.Errorf("open database: %w", err)
	}

	if err := db.Ping(); err != nil {
		_ = db.Close()
		return nil, fmt.Errorf("ping database: %w", err)
	}

	if err := migrate(db); err != nil {
		_ = db.Close()
		return nil, err
	}
	if err := seedIfEmpty(db); err != nil {
		_ = db.Close()
		return nil, err
	}

	return &Store{db: db}, nil
}

func (s *Store) Close() error {
	if s.db == nil {
		return nil
	}
	return s.db.Close()
}

func (s *Store) UsesDatabase() bool {
	return s.db != nil
}

func (s *Store) AllUsers() ([]models.AdminUser, error) {
	if s.db != nil {
		return s.allUsersDB()
	}
	return cloneUsers(s.users), nil
}

func (s *Store) AllOrders() ([]models.AdminOrder, error) {
	if s.db != nil {
		return s.allOrdersDB()
	}
	return cloneOrders(s.orders), nil
}

func (s *Store) FindUser(id string) (*models.AdminUser, bool) {
	if s.db != nil {
		return s.findUserDB(id)
	}
	for i := range s.users {
		if s.users[i].ID == id {
			user := s.users[i]
			user.Tags = append([]string(nil), user.Tags...)
			return &user, true
		}
	}
	return nil, false
}

func (s *Store) FindOrder(id string) (*models.AdminOrder, bool) {
	if s.db != nil {
		return s.findOrderDB(id)
	}
	for i := range s.orders {
		if s.orders[i].ID == id {
			order := s.orders[i]
			order.Tags = append([]string(nil), order.Tags...)
			return &order, true
		}
	}
	return nil, false
}

func (s *Store) AddUser(user models.AdminUser) error {
	if s.db != nil {
		return s.insertUserDB(user)
	}
	s.users = append([]models.AdminUser{user}, s.users...)
	return nil
}

func (s *Store) SaveUser(user models.AdminUser) error {
	if s.db != nil {
		return s.updateUserDB(user)
	}
	for i := range s.users {
		if s.users[i].ID == user.ID {
			s.users[i] = user
			return nil
		}
	}
	return sql.ErrNoRows
}

func (s *Store) DeleteUser(id string) bool {
	if s.db != nil {
		return s.deleteUserDB(id)
	}
	for i, user := range s.users {
		if user.ID == id {
			s.users = append(s.users[:i], s.users[i+1:]...)
			return true
		}
	}
	return false
}

func (s *Store) EmailExists(email, excludeID string) bool {
	if s.db != nil {
		return s.emailExistsDB(email, excludeID)
	}
	return emailExistsMemory(s.users, email, excludeID)
}

func (s *Store) AddOrder(order models.AdminOrder) error {
	if s.db != nil {
		return s.insertOrderDB(order)
	}
	s.orders = append([]models.AdminOrder{order}, s.orders...)
	return nil
}

func (s *Store) SaveOrder(order models.AdminOrder) error {
	if s.db != nil {
		return s.updateOrderDB(order)
	}
	for i := range s.orders {
		if s.orders[i].ID == order.ID {
			s.orders[i] = order
			return nil
		}
	}
	return sql.ErrNoRows
}

func (s *Store) DeleteOrder(id string) bool {
	if s.db != nil {
		return s.deleteOrderDB(id)
	}
	for i, order := range s.orders {
		if order.ID == id {
			s.orders = append(s.orders[:i], s.orders[i+1:]...)
			return true
		}
	}
	return false
}

func (s *Store) Reset() error {
	if s.db != nil {
		return resetDB(s.db)
	}
	s.users = cloneUsers(SeedUsers())
	s.orders = cloneOrders(SeedOrders())
	return nil
}

func cloneUsers(users []models.AdminUser) []models.AdminUser {
	out := make([]models.AdminUser, len(users))
	for i, user := range users {
		out[i] = user
		out[i].Tags = append([]string(nil), user.Tags...)
	}
	return out
}

func cloneOrders(orders []models.AdminOrder) []models.AdminOrder {
	out := make([]models.AdminOrder, len(orders))
	for i, order := range orders {
		out[i] = order
		out[i].Tags = append([]string(nil), order.Tags...)
	}
	return out
}

func emailExistsMemory(users []models.AdminUser, email, excludeID string) bool {
	for _, user := range users {
		if excludeID != "" && user.ID == excludeID {
			continue
		}
		if strings.EqualFold(user.Email, email) {
			return true
		}
	}
	return false
}
