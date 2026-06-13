package lib

import (
	"time"

	"github.com/echojs-ecosystem/workspace-server/internal/data"
	"github.com/echojs-ecosystem/workspace-server/internal/models"
)

var roleTemplates = map[models.WorkspaceRole]map[string]map[string]bool{
	models.RoleAdmin: {
		"dashboard": {"view": true},
		"user":      {"read": true, "update": true, "delete": true},
		"order":     {"read": true, "refund": true},
		"catalog":   {"read": true, "edit": true, "delete": true},
		"settings":  {"read": true, "update": true},
	},
	models.RoleManager: {
		"dashboard": {"view": true},
		"user":      {"read": true, "update": true, "delete": false},
		"order":     {"read": true, "refund": true},
		"catalog":   {"read": true, "edit": true, "delete": false},
		"settings":  {"read": true, "update": false},
	},
	models.RoleViewer: {
		"dashboard": {"view": true},
		"user":      {"read": true, "update": false, "delete": false},
		"order":     {"read": true, "refund": false},
		"catalog":   {"read": true, "edit": false, "delete": false},
		"settings":  {"read": true, "update": false},
	},
}

func BuildBootstrap(store *data.Store, role models.WorkspaceRole) models.BootstrapPayload {
	if role == "" {
		role = models.RoleManager
	}

	orders, _ := store.AllOrders()
	users, _ := store.AllUsers()

	openOrders := 0
	for _, order := range orders {
		if order.Status != models.OrderRefunded {
			openOrders++
		}
	}

	activeUsers := 0
	for _, user := range users {
		if user.Status == models.StatusActive {
			activeUsers++
		}
	}

	var revenue float64
	for _, order := range orders {
		revenue += order.Total
	}

	rules, ok := roleTemplates[role]
	if !ok {
		rules = roleTemplates[models.RoleManager]
	}

	payload := models.BootstrapPayload{
		Role: role,
		Stats: models.DashboardStats{
			OpenOrders:  openOrders,
			ActiveUsers: activeUsers,
			Revenue:     revenue,
			ServerTime:  time.Now().UTC().Format(time.RFC3339Nano),
		},
	}
	payload.PermissionSnapshot.Version = 1
	payload.PermissionSnapshot.Ready = true
	payload.PermissionSnapshot.Rules = rules

	return payload
}
