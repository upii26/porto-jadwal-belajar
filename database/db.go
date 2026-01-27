package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func Connection() {
	var (
		dbhost = ""
		dbport = ""
		dbuser = ""
		dbpass = ""
		dbname = ""
	)
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=require", dbhost, dbport, dbuser, dbpass, dbname)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("db conn failed,", err)
	}
	rows, _ := db.Query("SELECT id, nama FROM scholars")
	defer rows.Close()

	for rows.Next() {
		var id int
		var name string
		err := rows.Scan(&id, &name)
		if err != nil {
			log.Fatal("data error,", err)
		}
		fmt.Println("id:", id, "nama:", name)
	}
	if rows.Err() != nil {
		log.Fatal("rows error,", rows.Err())
	}
}
