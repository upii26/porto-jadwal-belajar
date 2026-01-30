package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func Connection() *sql.DB {
	var (
		dbhost = os.Getenv("DBHOST")
		dbport = os.Getenv("DBPORT")
		dbuser = os.Getenv("DBUSER")
		dbpass = os.Getenv("DBPASS")
		dbname = os.Getenv("DBNAME")
	)
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=require", dbhost, dbport, dbuser, dbpass, dbname)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("db conn failed,", err)
	}
	return db
}
