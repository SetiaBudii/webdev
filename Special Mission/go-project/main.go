package main

import (
	"go-project/config"
	"go-project/controllers/homecontroller"
	"go-project/controllers/productcontroller"
	"net/http"
	"github.com/rs/cors"
)

func main() {
	config.ConnectDB()

	http.HandleFunc("/", homecontroller.Welcome)

	http.HandleFunc("/product", productcontroller.Index)
	http.HandleFunc("/product/edit", productcontroller.Edit)
	http.HandleFunc("/product/delete", productcontroller.Delete)
	http.HandleFunc("/product/add", productcontroller.Add)
	http.HandleFunc("/productlist", productcontroller.GetProducts)

	c := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:3000"}, // Replace with your frontend URL
        AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders: []string{"*"},
    })

    // Use the CORS middleware with your router (replace "http.DefaultServeMux" with your router if using gorilla/mux)
    handler := c.Handler(http.DefaultServeMux)

    // Start your server
    http.ListenAndServe(":8080", handler)
	
}
