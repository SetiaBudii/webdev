package config

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func ConnectDB() {
	db, err := sql.Open("mysql", "root:@/product_go")
	if err != nil {
		panic(err.Error())
	}

	DB = db
}
