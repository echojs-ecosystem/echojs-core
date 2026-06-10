package handlers

import (
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/echojs-ecosystem/workspace-server/internal/data"
	"github.com/echojs-ecosystem/workspace-server/internal/lib"
	"github.com/echojs-ecosystem/workspace-server/internal/models"
)

const version = "0.6.0"

type Handler struct {
	store     *data.Store
	startedAt time.Time
}

func New(store *data.Store, startedAt time.Time) *Handler {
	return &Handler{store: store, startedAt: startedAt}
}

func (h *Handler) Health(c *gin.Context) {
	c.JSON(http.StatusOK, models.APIHealth{
		OK:       true,
		Service:  "workspace-server",
		Version:  version,
		UptimeMs: time.Since(h.startedAt).Milliseconds(),
	})
}

func (h *Handler) Bootstrap(c *gin.Context) {
	role := models.WorkspaceRole(c.DefaultQuery("role", string(models.RoleManager)))
	switch role {
	case models.RoleAdmin, models.RoleManager, models.RoleViewer:
	default:
		role = models.RoleManager
	}
	c.JSON(http.StatusOK, lib.BuildBootstrap(h.store, role))
}

func (h *Handler) DashboardStats(c *gin.Context) {
	payload := lib.BuildBootstrap(h.store, models.RoleManager)
	c.JSON(http.StatusOK, payload.Stats)
}

func (h *Handler) ListUsers(c *gin.Context) {
	c.JSON(http.StatusOK, lib.ListUsers(h.store, lib.UsersListQuery{
		Q:          c.Query("q"),
		Page:       parseIntDefault(c.Query("page"), 1),
		PageSize:   parseIntDefault(c.Query("pageSize"), 0),
		Role:       c.Query("role"),
		Status:     c.Query("status"),
		Department: c.Query("department"),
		Verified:   c.Query("verified"),
		Country:    c.Query("country"),
		Tags:       parseTags(c.Query("tag")),
		Sort:       c.Query("sort"),
		Order:      c.Query("order"),
	}))
}

func (h *Handler) GetUser(c *gin.Context) {
	user, ok := h.store.FindUser(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, models.ErrorResponse{Error: "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}

func (h *Handler) CreateUser(c *gin.Context) {
	time.Sleep(300 * time.Millisecond)

	var input models.CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	if lib.EmailExists(h.store, input.Email, "") {
		c.JSON(http.StatusConflict, models.ErrorResponse{Error: "Email already exists"})
		return
	}

	user := lib.CreateUser(h.store, input)
	c.JSON(http.StatusOK, models.UserResponse{User: user})
}

func (h *Handler) UpdateUser(c *gin.Context) {
	time.Sleep(300 * time.Millisecond)

	var input models.UpdateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	user, ok := lib.UpdateUser(h.store, c.Param("id"), input)
	if !ok {
		c.JSON(http.StatusNotFound, models.ErrorResponse{Error: "User not found"})
		return
	}
	c.JSON(http.StatusOK, models.UserResponse{User: *user})
}

func (h *Handler) DeleteUser(c *gin.Context) {
	time.Sleep(250 * time.Millisecond)

	if !lib.DeleteUser(h.store, c.Param("id")) {
		c.JSON(http.StatusNotFound, models.ErrorResponse{Error: "User not found"})
		return
	}
	c.JSON(http.StatusOK, models.OkResponse{OK: true})
}

func (h *Handler) SuspendUser(c *gin.Context) {
	time.Sleep(200 * time.Millisecond)

	user, ok := lib.SuspendUser(h.store, c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, models.ErrorResponse{Error: "User not found"})
		return
	}
	c.JSON(http.StatusOK, models.UserResponse{User: *user})
}

func (h *Handler) ActivateUser(c *gin.Context) {
	time.Sleep(200 * time.Millisecond)

	user, ok := lib.ActivateUser(h.store, c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, models.ErrorResponse{Error: "User not found"})
		return
	}
	c.JSON(http.StatusOK, models.UserResponse{User: *user})
}

func (h *Handler) GetOrder(c *gin.Context) {
	order, ok := h.store.FindOrder(c.Param("id"))
	if !ok {
		c.JSON(http.StatusNotFound, models.ErrorResponse{Error: "Order not found"})
		return
	}
	c.JSON(http.StatusOK, order)
}

func (h *Handler) ListOrders(c *gin.Context) {
	c.JSON(http.StatusOK, lib.ListOrders(h.store, lib.OrdersListQuery{
		Q:        c.Query("q"),
		Page:     parseIntDefault(c.Query("page"), 1),
		Status:   c.Query("status"),
		Priority: c.Query("priority") == "true",
		Tags:     parseTags(c.Query("tag")),
	}))
}

func (h *Handler) CreateOrder(c *gin.Context) {
	time.Sleep(300 * time.Millisecond)

	var input models.CreateOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}
	if input.Total <= 0 {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Total must be positive"})
		return
	}

	order := lib.CreateOrder(h.store, input)
	c.JSON(http.StatusOK, models.OrderResponse{Order: order})
}

func (h *Handler) UpdateOrder(c *gin.Context) {
	time.Sleep(300 * time.Millisecond)

	var input models.UpdateOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: err.Error()})
		return
	}

	order, ok := lib.UpdateOrder(h.store, c.Param("id"), input)
	if !ok {
		c.JSON(http.StatusNotFound, models.ErrorResponse{Error: "Order not found"})
		return
	}
	c.JSON(http.StatusOK, models.OrderResponse{Order: *order})
}

func (h *Handler) DeleteOrder(c *gin.Context) {
	time.Sleep(250 * time.Millisecond)

	if !lib.DeleteOrder(h.store, c.Param("id")) {
		c.JSON(http.StatusNotFound, models.ErrorResponse{Error: "Order not found"})
		return
	}
	c.JSON(http.StatusOK, models.OkResponse{OK: true})
}

func (h *Handler) RefundOrder(c *gin.Context) {
	time.Sleep(400 * time.Millisecond)

	order, ok := lib.RefundOrder(h.store, c.Param("id"))
	if !ok {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{Error: "Refund not allowed"})
		return
	}
	c.JSON(http.StatusOK, models.OrderResponse{Order: *order})
}

func (h *Handler) ResetDemo(c *gin.Context) {
	h.store.Reset()
	c.JSON(http.StatusOK, models.OkResponse{OK: true})
}

func parseIntDefault(value string, fallback int) int {
	if value == "" {
		return fallback
	}
	parsed, err := strconv.Atoi(value)
	if err != nil {
		return fallback
	}
	return parsed
}

func parseTags(value string) []string {
	if strings.TrimSpace(value) == "" {
		return nil
	}
	parts := strings.Split(value, ",")
	tags := make([]string, 0, len(parts))
	for _, part := range parts {
		tag := strings.TrimSpace(part)
		if tag != "" {
			tags = append(tags, tag)
		}
	}
	return tags
}
