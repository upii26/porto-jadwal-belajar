package routes

import (
	"fmt"
	"net/http"
	"porto-jadwal-belajar-api/database"
	"porto-jadwal-belajar-api/handlers"
	"porto-jadwal-belajar-api/model"
	"strings"

	"github.com/gin-gonic/gin"
)

type LecturerRoute struct{}

// LecturerList godoc
//
//	@Summary		menampilkan semua data dosen
//	@Description	mengambil data dosen
//	@Tags			dosen
//	@Accept			json
//	@Produce		json
//	@Router			/dosen [get]
func (sr LecturerRoute) LecturerList(c *gin.Context) {
	defer handlers.RecoverResponse(c.Request.URL.Path, c)

	db := database.Connection()
	rows, _ := db.Query("SELECT nodosen, nama, prodi, email, status FROM lecturers")
	defer rows.Close()

	// variables for lecturer data
	var lecturerDataList []model.Lecturer
	for rows.Next() {
		var (
			noDosen string
			name    string
			prodi   string
			email   string
			status  string
		)
		err := rows.Scan(&noDosen, &name, &prodi, &email, &status)
		if err != nil {
			panic(err)
		}
		tempLecturerData := model.Lecturer{
			NoDosen: noDosen,
			Nama:    name,
			Prodi:   prodi,
			Email:   email,
			Status:  status,
		}
		lecturerDataList = append(lecturerDataList, tempLecturerData)
	}
	if rows.Err() != nil {
		panic(rows.Err())
	}

	// return response
	c.JSON(http.StatusOK, handlers.Response{
		Status:  200,
		Message: "success",
		Data:    lecturerDataList,
	})
}

// LecturerSingleData godoc
//
//	@Summary		menampilkan data dosen
//	@Description	mengambil data berdasarkan NoDosen
//	@Tags			dosen
//	@Accept			json
//	@Produce		json
//	@Param			nim	path		string	true	"NoDosen"
//	@Router			/dosen/{NDS} [get]
func (sr LecturerRoute) LecturerSingleData(c *gin.Context) {
	defer handlers.RecoverResponse(c.Request.URL.Path, c)
	// get noDosen from path & make sure its type integer
	getPath := c.Request.URL.Path
	getNDS := strings.Split(getPath, "/")[3]

	db := database.Connection()
	query := fmt.Sprintf("SELECT nim, nama, prodi, email, status FROM scholars WHERE nodosen='%s'", getNDS)
	rows, _ := db.Query(query)
	defer rows.Close()

	// variables for lecturer data
	var lecturerDataList []model.Lecturer
	for rows.Next() {
		var (
			noDosen string
			name    string
			prodi   string
			email   string
			status  string
		)
		err := rows.Scan(&noDosen, &name, &prodi, &email, &status)
		if err != nil {
			panic(err)
		}
		tempLecturerData := model.Lecturer{
			NoDosen: noDosen,
			Nama:    name,
			Prodi:   prodi,
			Email:   email,
			Status:  status,
		}
		lecturerDataList = append(lecturerDataList, tempLecturerData)
	}
	if rows.Err() != nil {
		panic(rows.Err())
	}

	c.JSON(http.StatusOK, handlers.Response{
		Status:  200,
		Message: "success",
		Data:    lecturerDataList,
	})
}
