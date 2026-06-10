package data

import (
	"github.com/echojs-ecosystem/workspace-server/internal/models"
)

type Store struct {
	Users  []models.AdminUser
	Orders []models.AdminOrder
}

func NewStore() *Store {
	return &Store{
		Users:  cloneUsers(SeedUsers()),
		Orders: cloneOrders(SeedOrders()),
	}
}

func (s *Store) FindUser(id string) (*models.AdminUser, bool) {
	for i := range s.Users {
		if s.Users[i].ID == id {
			return &s.Users[i], true
		}
	}
	return nil, false
}

func (s *Store) FindOrder(id string) (*models.AdminOrder, bool) {
	for i := range s.Orders {
		if s.Orders[i].ID == id {
			return &s.Orders[i], true
		}
	}
	return nil, false
}

func (s *Store) Reset() {
	s.Users = cloneUsers(SeedUsers())
	s.Orders = cloneOrders(SeedOrders())
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
