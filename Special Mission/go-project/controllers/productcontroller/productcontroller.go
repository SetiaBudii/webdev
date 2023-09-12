package productcontroller

import (
	"net/http"
	"html/template"
	"go-project/models/productmodel"
	"go-project/entities"
	"encoding/json"
)

func Index(w http.ResponseWriter, r *http.Request) {
	products := productmodel.GetAll()
	data:= map[string]any{
		"products": products,
	}

	temp, err := template.ParseFiles("views/product/index.html")
	if err != nil {
		panic(err.Error())
	}

	temp.Execute(w, data)

	
}

func Add(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		temp, err:= template.ParseFiles("views/product/create.html")
		
		if err != nil {
			panic(err.Error())
		}
	
		temp.Execute(w, nil)
	}

	if r.Method == "POST" {
		var product entities.Product

		product.Name = r.FormValue("name")
		product.Id = r.FormValue("id")

		if ok:= productmodel.Insert(product); !ok {
			temp, _ := template.ParseFiles("views/product/create.html")
			temp.Execute(w, nil)
	}

	http.Redirect(w, r, "/product", http.StatusSeeOther)

	}
}

func Edit(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var product entities.Product

		product.Name = r.FormValue("name")
		product.Id = r.FormValue("id")

		if ok:= productmodel.Update(product.Id, product); !ok {
			http.Redirect(w,r,r.Header.Get("Referer"), http.StatusSeeOther)
			return
		}

		http.Redirect(w, r, "/product", http.StatusSeeOther)

}
}

func Delete(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")

	if err:= productmodel.Delete(id); err != nil {
		panic(err.Error())
	}

	http.Redirect(w, r, "/product", http.StatusSeeOther)
}

func GetProducts(w http.ResponseWriter, r *http.Request) {
    products := productmodel.GetAll() // Replace with your logic to fetch products from the database

    // Serialize products to JSON
    jsonData, err := json.Marshal(products)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // Set the Content-Type header to application/json
    w.Header().Set("Content-Type", "application/json")

    // Write the JSON response
    w.Write(jsonData)
}