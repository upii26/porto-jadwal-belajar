package routes

import (
	"net/http"
	"porto-jadwal-belajar-api/handlers"

	"github.com/gin-gonic/gin"
)

type ScholarRoute struct{}

// ScholarList godoc
//
//	@Summary		menampilkan data mahasiswa
//	@Description	mengambil data berdasarkan NIM
//	@Tags			mahasiswa
//	@Accept			json
//	@Produce		json
//	@Param			id	path		int	true	"NIM"
//	@Success		200	{object}	model.Scholar
//	@Failure		400	{object}	handlers.HTTPError
//	@Failure		404	{object}	handlers.HTTPError
//	@Failure		500	{object}	handlers.HTTPError
//	@Router			/mahasiswa/{id} [get]
func (sr ScholarRoute) ScholarList(c *gin.Context) {
	c.JSON(http.StatusOK, handlers.Response{
		Status:  200,
		Message: "success",
		Data:    []any{},
	})
}
