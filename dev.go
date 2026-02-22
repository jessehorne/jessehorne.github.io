package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	directory := "."
	port := ":8080"

	http.Handle("/", http.FileServer(http.Dir(directory)))

	fmt.Printf("Serving %s on http://localhost%s\n", directory, port)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
