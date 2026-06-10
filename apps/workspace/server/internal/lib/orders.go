package lib

import (
	"fmt"
	"strings"
	"time"

	"github.com/echojs-ecosystem/workspace-server/internal/data"
	"github.com/echojs-ecosystem/workspace-server/internal/models"
)

const orderPageSize = 4

type OrdersListQuery struct {
	Q        string
	Page     int
	Status   string
	Priority bool
	Tags     []string
}

func FilterOrders(orders []models.AdminOrder, query OrdersListQuery) []models.AdminOrder {
	q := strings.ToLower(strings.TrimSpace(query.Q))
	status := query.Status
	if status == "" {
		status = "all"
	}

	filtered := make([]models.AdminOrder, 0, len(orders))
	for _, order := range orders {
		if status != "all" && string(order.Status) != status {
			continue
		}
		if query.Priority && !hasAnyTag(order.Tags, []string{"priority"}) {
			continue
		}
		if len(query.Tags) > 0 && !hasAnyTag(order.Tags, query.Tags) {
			continue
		}
		if q != "" {
			if !strings.Contains(strings.ToLower(order.ID), q) &&
				!strings.Contains(strings.ToLower(order.Customer), q) {
				continue
			}
		}
		filtered = append(filtered, order)
	}
	return filtered
}

func ListOrders(store *data.Store, query OrdersListQuery) models.OrdersListResponse {
	filtered := FilterOrders(store.Orders, query)
	totalPages := max(1, (len(filtered)+orderPageSize-1)/orderPageSize)
	page := query.Page
	if page < 1 {
		page = 1
	}
	if page > totalPages {
		page = totalPages
	}
	start := (page - 1) * orderPageSize
	end := min(start+orderPageSize, len(filtered))

	items := []models.AdminOrder{}
	if start < len(filtered) {
		items = filtered[start:end]
	}

	return models.OrdersListResponse{
		Items:      items,
		Total:      len(filtered),
		Page:       page,
		PageSize:   orderPageSize,
		TotalPages: totalPages,
	}
}

func CreateOrder(store *data.Store, input models.CreateOrderInput) models.AdminOrder {
	order := models.AdminOrder{
		ID:       fmt.Sprintf("o-%d", time.Now().UnixMilli()),
		Customer: input.Customer,
		Total:    input.Total,
		Status:   input.Status,
		Tags:     append([]string(nil), input.Tags...),
	}
	store.Orders = append([]models.AdminOrder{order}, store.Orders...)
	return order
}

func UpdateOrder(store *data.Store, id string, input models.UpdateOrderInput) (*models.AdminOrder, bool) {
	for i := range store.Orders {
		if store.Orders[i].ID != id {
			continue
		}
		order := &store.Orders[i]
		if input.Customer != nil {
			order.Customer = *input.Customer
		}
		if input.Total != nil {
			order.Total = *input.Total
		}
		if input.Status != nil {
			order.Status = *input.Status
		}
		if input.Tags != nil {
			order.Tags = append([]string(nil), input.Tags...)
		}
		return order, true
	}
	return nil, false
}

func DeleteOrder(store *data.Store, id string) bool {
	for i, order := range store.Orders {
		if order.ID == id {
			store.Orders = append(store.Orders[:i], store.Orders[i+1:]...)
			return true
		}
	}
	return false
}

func RefundOrder(store *data.Store, id string) (*models.AdminOrder, bool) {
	for i := range store.Orders {
		if store.Orders[i].ID != id {
			continue
		}
		if store.Orders[i].Status == models.OrderRefunded {
			return nil, false
		}
		store.Orders[i].Status = models.OrderRefunded
		return &store.Orders[i], true
	}
	return nil, false
}
