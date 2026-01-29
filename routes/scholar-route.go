package routes

import (
	"log"
	"net/http"
	"porto-jadwal-belajar-api/database"
	"porto-jadwal-belajar-api/handlers"
	"porto-jadwal-belajar-api/model"

	"github.com/gin-gonic/gin"
)

type ScholarRoute struct{}

// ScholarList godoc
//
//	@Summary		menampilkan semua data mahasiswa
//	@Description	mengambil data mahasiswa
//	@Tags			mahasiswa
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	model.Scholar
//	@Failure		400	{object}	handlers.HTTPError
//	@Failure		404	{object}	handlers.HTTPError
//	@Failure		500	{object}	handlers.HTTPError
//	@Router			/mahasiswa [get]
func (sr ScholarRoute) ScholarList(c *gin.Context) {
	db := database.Connection()
	rows, _ := db.Query("SELECT nim, nama, prodi, gender, email, status FROM scholars")
	defer rows.Close()

	// variables for scholar data
	var scholarDataList []model.Scholar
	for rows.Next() {
		var (
			nim    string
			name   string
			prodi  string
			gender string
			email  string
			status string
		)
		err := rows.Scan(&nim, &name, &prodi, &gender, &email, &status)
		if err != nil {
			log.Fatal("data error,", err)
		}
		tempScholarData := model.Scholar{
			NIM:    nim,
			Nama:   name,
			Prodi:  prodi,
			Gender: gender,
			Email:  email,
			Status: status,
		}
		scholarDataList = append(scholarDataList, tempScholarData)
	}
	if rows.Err() != nil {
		log.Fatal("rows error,", rows.Err())
	}

	// return response
	c.JSON(http.StatusOK, handlers.Response{
		Status:  200,
		Message: "success",
		Data:    scholarDataList,
	})
}

// ScholarSingleData godoc
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
func (sr ScholarRoute) ScholarSingleData(c *gin.Context) {
	c.JSON(http.StatusOK, handlers.Response{
		Status:  200,
		Message: "success",
		Data:    []any{},
	})
}
