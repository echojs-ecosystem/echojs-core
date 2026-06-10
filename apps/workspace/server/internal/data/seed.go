package data

import (
	"fmt"
	"strings"
	"time"

	"github.com/echojs-ecosystem/workspace-server/internal/models"
)

var (
	departments = []models.AdminUserDepartment{
		models.DeptEngineering,
		models.DeptSales,
		models.DeptSupport,
		models.DeptMarketing,
		models.DeptOps,
	}
	roles = []models.AdminUserRole{
		models.UserRoleAdmin,
		models.UserRoleManager,
		models.UserRoleEditor,
		models.UserRoleViewer,
	}
	countries = []string{"US", "DE", "FR", "GB", "JP", "BR", "IN", "RU", "CA", "AU"}
	tags      = []string{"remote", "on-site", "contract", "full-time", "beta", "vip", "mentor", "new-hire"}
	firstNames = []string{
		"Alice", "Bob", "Carl", "Dana", "Elena", "Felix", "Grace", "Hugo", "Iris", "Jack",
		"Kate", "Leo", "Mia", "Noah", "Olga", "Paul", "Quinn", "Rita", "Sam", "Tina",
		"Uma", "Victor", "Wendy", "Xander", "Yuki", "Zara", "Adam", "Bella", "Chris", "Diana",
		"Ethan", "Fiona", "George", "Hannah", "Ivan", "Julia", "Kevin", "Luna", "Marco", "Nina",
		"Oscar", "Petra", "Ravi", "Sofia", "Tom", "Ursula", "Vera", "Will",
	}
	lastNames = []string{
		"Nguyen", "Smith", "Garcia", "Müller", "Kim", "Brown", "Lee", "Patel", "Wilson",
		"Kowalski", "Chen", "Rossi", "Dubois", "Sato", "Silva",
	}
)

func pick[T any](items []T, index int) T {
	return items[index%len(items)]
}

func isoDaysAgo(days int) string {
	return time.Now().AddDate(0, 0, -days).UTC().Format(time.RFC3339Nano)
}

func SeedUsers() []models.AdminUser {
	users := make([]models.AdminUser, len(firstNames))
	for index, first := range firstNames {
		last := pick(lastNames, index)
		role := pick(roles, index+2)
		status := models.StatusActive
		if index%11 == 0 {
			status = models.StatusSuspended
		} else if index%7 == 0 {
			status = models.StatusInvited
		}
		department := pick(departments, index)
		country := pick(countries, index+3)
		slug := strings.ToLower(fmt.Sprintf("%s.%s", first, last))
		var slugBuilder strings.Builder
		for _, r := range slug {
			if (r >= 'a' && r <= 'z') || r == '.' {
				slugBuilder.WriteRune(r)
			}
		}
		slug = slugBuilder.String()

		userTags := []string{pick(tags, index)}
		if index%3 == 0 {
			userTags = append(userTags, pick(tags, index+4))
		}

		users[index] = models.AdminUser{
			ID:           fmt.Sprintf("u-%03d", index+1),
			Name:         fmt.Sprintf("%s %s", first, last),
			Role:         role,
			Email:        fmt.Sprintf("%s@echo.dev", slug),
			Status:       status,
			Department:   department,
			Country:      country,
			Verified:     status == models.StatusActive && index%5 != 0,
			Tags:         userTags,
			LastActiveAt: isoDaysAgo(index % 30),
			CreatedAt:    isoDaysAgo(90 + index),
		}
	}
	return users
}

func SeedOrders() []models.AdminOrder {
	return []models.AdminOrder{
		{ID: "o-1001", Customer: "Northwind LLC", Total: 1299, Status: models.OrderPaid, Tags: []string{"priority", "eu"}},
		{ID: "o-1002", Customer: "Acme Corp", Total: 420, Status: models.OrderPending, Tags: []string{"trial"}},
		{ID: "o-1003", Customer: "Globex", Total: 89, Status: models.OrderShipped, Tags: []string{"eu"}},
		{ID: "o-1004", Customer: "Initech", Total: 2400, Status: models.OrderPaid, Tags: []string{"priority", "us"}},
		{ID: "o-1005", Customer: "Umbrella", Total: 15, Status: models.OrderRefunded, Tags: []string{}},
		{ID: "o-1006", Customer: "Stark Industries", Total: 9999, Status: models.OrderPaid, Tags: []string{"priority", "us"}},
	}
}
