package main

import (
	"fmt"
	_ "porto-jadwal-belajar-api/docs"
	"porto-jadwal-belajar-api/routes"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

//	@title			Swagger Example API
//	@version		1.0
//	@description	This is a sample server celler server.
//	@termsOfService	http://swagger.io/terms/

//	@contact.name	API Support
//	@contact.url	http://www.swagger.io/support
//	@contact.email	support@swagger.io

//	@license.name	Apache 2.0
//	@license.url	http://www.apache.org/licenses/LICENSE-2.0.html

//	@host		localhost:8080
//	@BasePath	/api

func main() {
	fmt.Println("hello bapak")

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	api := router.Group("/api")

	{
		sr := routes.ScholarRoute{}
		scholarRoutes := api.Group("/mahasiswa")
		scholarRoutes.GET(":id", sr.ScholarList)
	}

	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.Run(":8080")
}
