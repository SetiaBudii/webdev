package productmodel

import (
	"go-project/config"
	"go-project/entities"
)

func GetAll() []entities.Product{
	rows , err:= config.DB.Query("SELECT * FROM product")
	if err != nil {
		panic(err.Error())
	}
	
	defer rows.Close()

	var products []entities.Product

	for rows.Next() {
		var product entities.Product
		rows.Scan(&product.Id, &product.Name)
		products = append(products, product)
	}

	return products

}

func Insert(product entities.Product) bool{
	result, err:= config.DB.Exec("INSERT INTO product VALUES (?, ?)", product.Id, product.Name)
	if err != nil {
		panic(err.Error())
	}
	lastinsertid, err := result.LastInsertId()
	if err != nil {
		panic(err.Error())
	}
	return lastinsertid > 0
}

func Detail(id string) entities.Product{
	row := config.DB.QueryRow("SELECT * FROM product WHERE id = ?", id)
	var product entities.Product
	row.Scan(&product.Id, &product.Name)
	return product
}

func Update(id string, product entities.Product) bool{
	query, err:= config.DB.Exec("UPDATE product SET name = ? WHERE id = ?", product.Name, id)

	if err != nil {
		panic(err.Error())
	}

	result, err := query.RowsAffected()
	if err != nil {
		panic(err.Error())
	}	

	return result > 0
}

func Delete(id string) error{
	_, err:= config.DB.Exec("DELETE FROM product WHERE id = ?", id)
	return err
}