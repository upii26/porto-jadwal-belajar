package handlers

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Status  int `json:"status"`
	Message any `json:"message"`
	Data    any `json:"data"`
}

type HTTPError struct {
	Status  int    `json:"status" example:"400"`
	Message string `json:"message" example:"bad request"`
}

func RecoverResponse(processName string, c *gin.Context) {
	// recover == catch error,
	// must place in defer function
	var message = recover()
	if message != nil {
		errorMessage := fmt.Sprint(message)
		fmt.Println(fmt.Printf("error %s: %s", processName, errorMessage))
		c.JSON(400, Response{
			Status:  400,
			Message: errorMessage,
			Data:    []any{},
		})
	}
}
