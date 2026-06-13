package main

import (
	"fmt"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/echojs-ecosystem/workspace-server/internal/data"
	"github.com/echojs-ecosystem/workspace-server/internal/handlers"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3003"
	}

	startedAt := time.Now()

	var store *data.Store
	if databaseURL := os.Getenv("DATABASE_URL"); databaseURL != "" {
		var err error
		store, err = data.NewStoreFromURL(databaseURL)
		if err != nil {
			panic(fmt.Errorf("database: %w", err))
		}
		defer store.Close()
		fmt.Println("workspace-server → PostgreSQL")
	} else {
		store = data.NewStore()
		fmt.Println("workspace-server → in-memory store (set DATABASE_URL for PostgreSQL)")
	}

	h := handlers.New(store, startedAt)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:    []string{"Origin", "Content-Type", "Accept", "Authorization"},
	}))

	api := router.Group("/api")
	{
		api.GET("/health", h.Health)
		api.GET("/bootstrap", h.Bootstrap)
		api.GET("/dashboard/stats", h.DashboardStats)

		api.GET("/users", h.ListUsers)
		api.GET("/users/:id", h.GetUser)
		api.POST("/users", h.CreateUser)
		api.PUT("/users/:id", h.UpdateUser)
		api.DELETE("/users/:id", h.DeleteUser)
		api.POST("/users/:id/suspend", h.SuspendUser)
		api.POST("/users/:id/activate", h.ActivateUser)

		api.GET("/orders", h.ListOrders)
		api.GET("/orders/:id", h.GetOrder)
		api.POST("/orders", h.CreateOrder)
		api.PUT("/orders/:id", h.UpdateOrder)
		api.DELETE("/orders/:id", h.DeleteOrder)
		api.POST("/orders/:id/refund", h.RefundOrder)

		api.POST("/demo/reset", h.ResetDemo)
	}

	addr := fmt.Sprintf(":%s", port)
	fmt.Printf("workspace-server → http://localhost:%s\n", port)
	if err := router.Run(addr); err != nil {
		panic(err)
	}
}
