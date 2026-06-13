package lib

import (
	"fmt"
	"sort"
	"strings"
	"time"

	"github.com/echojs-ecosystem/workspace-server/internal/data"
	"github.com/echojs-ecosystem/workspace-server/internal/models"
)

const defaultUserPageSize = 12

type UsersListQuery struct {
	Q          string
	Page       int
	PageSize   int
	Role       string
	Status     string
	Department string
	Verified   string
	Country    string
	Tags       []string
	Sort       string
	Order      string
}

func FilterUsers(users []models.AdminUser, query UsersListQuery) []models.AdminUser {
	q := strings.ToLower(strings.TrimSpace(query.Q))
	role := query.Role
	if role == "" {
		role = "all"
	}
	status := query.Status
	if status == "" {
		status = "all"
	}
	department := query.Department
	if department == "" {
		department = "all"
	}
	verified := query.Verified
	if verified == "" {
		verified = "all"
	}
	country := strings.ToUpper(strings.TrimSpace(query.Country))
	sortField := query.Sort
	if sortField == "" {
		sortField = "name"
	}
	order := query.Order
	if order == "" {
		order = "asc"
	}

	filtered := make([]models.AdminUser, 0, len(users))
	for _, user := range users {
		if role != "all" && string(user.Role) != role {
			continue
		}
		if status != "all" && string(user.Status) != status {
			continue
		}
		if department != "all" && string(user.Department) != department {
			continue
		}
		if verified == "true" && !user.Verified {
			continue
		}
		if verified == "false" && user.Verified {
			continue
		}
		if country != "" && strings.ToUpper(user.Country) != country {
			continue
		}
		if len(query.Tags) > 0 && !hasAnyTag(user.Tags, query.Tags) {
			continue
		}
		if q != "" {
			if !strings.Contains(strings.ToLower(user.Name), q) &&
				!strings.Contains(strings.ToLower(user.Email), q) &&
				!strings.Contains(strings.ToLower(user.ID), q) &&
				!strings.Contains(strings.ToLower(string(user.Department)), q) {
				continue
			}
		}
		filtered = append(filtered, user)
	}

	sort.Slice(filtered, func(i, j int) bool {
		left := userSortValue(filtered[i], sortField)
		right := userSortValue(filtered[j], sortField)
		cmp := strings.Compare(strings.ToLower(left), strings.ToLower(right))
		if order == "desc" {
			return cmp > 0
		}
		return cmp < 0
	})

	return filtered
}

func userSortValue(user models.AdminUser, sortField string) string {
	switch sortField {
	case "email":
		return user.Email
	case "createdAt":
		return user.CreatedAt
	case "lastActiveAt":
		return user.LastActiveAt
	default:
		return user.Name
	}
}

func ListUsers(store *data.Store, query UsersListQuery) models.UsersListResponse {
	pageSize := query.PageSize
	if pageSize == 0 {
		pageSize = defaultUserPageSize
	}
	if pageSize < 5 {
		pageSize = 5
	}
	if pageSize > 50 {
		pageSize = 50
	}

	users, _ := store.AllUsers()
	filtered := FilterUsers(users, query)
	totalPages := max(1, (len(filtered)+pageSize-1)/pageSize)
	page := query.Page
	if page < 1 {
		page = 1
	}
	if page > totalPages {
		page = totalPages
	}
	start := (page - 1) * pageSize
	end := min(start+pageSize, len(filtered))

	items := []models.AdminUser{}
	if start < len(filtered) {
		items = filtered[start:end]
	}

	return models.UsersListResponse{
		Items:      items,
		Total:      len(filtered),
		Page:       page,
		PageSize:   pageSize,
		TotalPages: totalPages,
	}
}

func CreateUser(store *data.Store, input models.CreateUserInput) models.AdminUser {
	user := models.AdminUser{
		ID:           fmt.Sprintf("u-%d", time.Now().UnixMilli()),
		Name:         input.Name,
		Email:        input.Email,
		Role:         input.Role,
		Status:       input.Status,
		Department:   input.Department,
		Country:      strings.ToUpper(input.Country),
		Verified:     input.Verified,
		Tags:         append([]string(nil), input.Tags...),
		CreatedAt:    time.Now().UTC().Format(time.RFC3339Nano),
		LastActiveAt: time.Now().UTC().Format(time.RFC3339Nano),
	}
	_ = store.AddUser(user)
	return user
}

func UpdateUser(store *data.Store, id string, input models.UpdateUserInput) (*models.AdminUser, bool) {
	user, ok := store.FindUser(id)
	if !ok {
		return nil, false
	}
	if input.Name != nil {
		user.Name = *input.Name
	}
	if input.Email != nil {
		user.Email = *input.Email
	}
	if input.Role != nil {
		user.Role = *input.Role
	}
	if input.Status != nil {
		user.Status = *input.Status
	}
	if input.Department != nil {
		user.Department = *input.Department
	}
	if input.Country != nil {
		user.Country = strings.ToUpper(*input.Country)
	}
	if input.Verified != nil {
		user.Verified = *input.Verified
	}
	if input.Tags != nil {
		user.Tags = append([]string(nil), input.Tags...)
	}
	user.LastActiveAt = time.Now().UTC().Format(time.RFC3339Nano)
	if err := store.SaveUser(*user); err != nil {
		return nil, false
	}
	return user, true
}

func DeleteUser(store *data.Store, id string) bool {
	return store.DeleteUser(id)
}

func SuspendUser(store *data.Store, id string) (*models.AdminUser, bool) {
	status := models.StatusSuspended
	return UpdateUser(store, id, models.UpdateUserInput{Status: &status})
}

func ActivateUser(store *data.Store, id string) (*models.AdminUser, bool) {
	status := models.StatusActive
	verified := true
	return UpdateUser(store, id, models.UpdateUserInput{Status: &status, Verified: &verified})
}

func EmailExists(store *data.Store, email string, excludeID string) bool {
	return store.EmailExists(email, excludeID)
}

func hasAnyTag(userTags, filterTags []string) bool {
	for _, tag := range filterTags {
		for _, userTag := range userTags {
			if userTag == tag {
				return true
			}
		}
	}
	return false
}
