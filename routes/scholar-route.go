package routes

import (
	"fmt"
	"net/http"
	"porto-jadwal-belajar-api/database"
	"porto-jadwal-belajar-api/handlers"
	"porto-jadwal-belajar-api/model"
	"strconv"
	"strings"

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
//	@Router			/mahasiswa [get]
func (sr ScholarRoute) ScholarList(c *gin.Context) {
	defer handlers.RecoverResponse(c.Request.URL.Path, c)

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
			panic(err)
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
		panic(rows.Err())
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
//	@Param			nim	path		string	true	"NIM"
//	@Router			/mahasiswa/{nim} [get]
func (sr ScholarRoute) ScholarSingleData(c *gin.Context) {
	defer handlers.RecoverResponse(c.Request.URL.Path, c)
	// get nim from path & make sure its type integer
	getPath := c.Request.URL.Path
	getNIM, getNIMErr := strconv.Atoi(strings.Split(getPath, "/")[3])
	if getNIMErr != nil {
		panic("NIM hanya boleh angka")
	}

	db := database.Connection()
	query := fmt.Sprintf("SELECT nim, nama, prodi, gender, email, status FROM scholars WHERE nim='%s'", strconv.Itoa(getNIM))
	rows, _ := db.Query(query)
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
			panic("[err scan]" + err.Error())
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
		panic("[err rows]" + rows.Err().Error())
	}

	c.JSON(http.StatusOK, handlers.Response{
		Status:  200,
		Message: "success",
		Data:    scholarDataList,
	})
}
