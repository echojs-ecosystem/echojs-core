package models

type WorkspaceRole string

const (
	RoleAdmin   WorkspaceRole = "admin"
	RoleManager WorkspaceRole = "manager"
	RoleViewer  WorkspaceRole = "viewer"
)

type AdminUserRole string

const (
	UserRoleAdmin   AdminUserRole = "admin"
	UserRoleManager AdminUserRole = "manager"
	UserRoleEditor  AdminUserRole = "editor"
	UserRoleViewer  AdminUserRole = "viewer"
)

type AdminUserStatus string

const (
	StatusActive    AdminUserStatus = "active"
	StatusInvited   AdminUserStatus = "invited"
	StatusSuspended AdminUserStatus = "suspended"
)

type AdminUserDepartment string

const (
	DeptEngineering AdminUserDepartment = "engineering"
	DeptSales       AdminUserDepartment = "sales"
	DeptSupport     AdminUserDepartment = "support"
	DeptMarketing   AdminUserDepartment = "marketing"
	DeptOps         AdminUserDepartment = "ops"
)

type AdminUser struct {
	ID           string              `json:"id"`
	Name         string              `json:"name"`
	Role         AdminUserRole       `json:"role"`
	Email        string              `json:"email"`
	Status       AdminUserStatus     `json:"status"`
	Department   AdminUserDepartment `json:"department"`
	Country      string              `json:"country"`
	Verified     bool                `json:"verified"`
	Tags         []string            `json:"tags"`
	LastActiveAt string              `json:"lastActiveAt"`
	CreatedAt    string              `json:"createdAt"`
}

type CreateUserInput struct {
	Name       string              `json:"name" binding:"required,min=1"`
	Email      string              `json:"email" binding:"required,email"`
	Role       AdminUserRole       `json:"role" binding:"required,oneof=admin manager editor viewer"`
	Status     AdminUserStatus     `json:"status" binding:"required,oneof=active invited suspended"`
	Department AdminUserDepartment `json:"department" binding:"required,oneof=engineering sales support marketing ops"`
	Country    string              `json:"country" binding:"required,len=2"`
	Verified   bool                `json:"verified"`
	Tags       []string            `json:"tags"`
}

type UpdateUserInput struct {
	Name       *string              `json:"name,omitempty" binding:"omitempty,min=1"`
	Email      *string              `json:"email,omitempty" binding:"omitempty,email"`
	Role       *AdminUserRole       `json:"role,omitempty" binding:"omitempty,oneof=admin manager editor viewer"`
	Status     *AdminUserStatus     `json:"status,omitempty" binding:"omitempty,oneof=active invited suspended"`
	Department *AdminUserDepartment `json:"department,omitempty" binding:"omitempty,oneof=engineering sales support marketing ops"`
	Country    *string              `json:"country,omitempty" binding:"omitempty,len=2"`
	Verified   *bool                `json:"verified,omitempty"`
	Tags       []string             `json:"tags,omitempty"`
}

type UsersListResponse struct {
	Items      []AdminUser `json:"items"`
	Total      int         `json:"total"`
	Page       int         `json:"page"`
	PageSize   int         `json:"pageSize"`
	TotalPages int         `json:"totalPages"`
}

type OrderStatus string

const (
	OrderPending  OrderStatus = "pending"
	OrderPaid     OrderStatus = "paid"
	OrderShipped  OrderStatus = "shipped"
	OrderRefunded OrderStatus = "refunded"
)

type AdminOrder struct {
	ID       string      `json:"id"`
	Customer string      `json:"customer"`
	Total    float64     `json:"total"`
	Status   OrderStatus `json:"status"`
	Tags     []string    `json:"tags"`
}

type CreateOrderInput struct {
	Customer string      `json:"customer" binding:"required,min=1"`
	Total    float64     `json:"total" binding:"gte=0"`
	Status   OrderStatus `json:"status" binding:"required,oneof=pending paid shipped refunded"`
	Tags     []string    `json:"tags"`
}

type UpdateOrderInput struct {
	Customer *string      `json:"customer,omitempty" binding:"omitempty,min=1"`
	Total    *float64     `json:"total,omitempty" binding:"omitempty,gte=0"`
	Status   *OrderStatus `json:"status,omitempty" binding:"omitempty,oneof=pending paid shipped refunded"`
	Tags     []string     `json:"tags,omitempty"`
}

type OrdersListResponse struct {
	Items      []AdminOrder `json:"items"`
	Total      int          `json:"total"`
	Page       int          `json:"page"`
	PageSize   int          `json:"pageSize"`
	TotalPages int          `json:"totalPages"`
}

type DashboardStats struct {
	OpenOrders  int    `json:"openOrders"`
	ActiveUsers int    `json:"activeUsers"`
	Revenue     float64 `json:"revenue"`
	ServerTime  string `json:"serverTime"`
}

type BootstrapPayload struct {
	Stats              DashboardStats `json:"stats"`
	Role               WorkspaceRole  `json:"role"`
	PermissionSnapshot struct {
		Version int                               `json:"version"`
		Ready   bool                              `json:"ready"`
		Rules   map[string]map[string]bool        `json:"rules"`
	} `json:"permissionSnapshot"`
}

type APIHealth struct {
	OK       bool   `json:"ok"`
	Service  string `json:"service"`
	Version  string `json:"version"`
	UptimeMs int64  `json:"uptimeMs"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

type UserResponse struct {
	User AdminUser `json:"user"`
}

type OrderResponse struct {
	Order AdminOrder `json:"order"`
}

type OkResponse struct {
	OK bool `json:"ok"`
}
