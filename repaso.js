const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// Cargar los libros desde el archivo JSON
const booksPath = path.join(__dirname, "data", "books.json");
let books = [];

try {
  const booksData = fs.readFileSync(booksPath, "utf8");
  books = JSON.parse(booksData);
} catch (err) {
  console.error("Error al leer el archivo books.json:", err);
}

// Ejericio 1 - Crea una ruta /all para obtener todos los libros
app.get("/books/all", (req, res) => {
  res.json(books);
});

// Ejercicio 2 - Crea una ruta /first para obtener el primer libro
app.get("books/first", (req, res) => {
  res.json(books[0]);
});

// Ejercicio 3 - Crea una ruta /last para obtener el último libro
app.get("books/last", (req, res) => {
  res.json(books[books.length - 1]);
});

// Ejercicio 4 - Crea una ruta /middle para obtener el libro en la mitad (número 50 en el array)
app.get("books/middle", (req, res) => {
  res.json(books);
});

// Ejercicio 5 - Crea una ruta /author/dante-alighieri para obtener SÓLO EL TÍTULO del libro de Dante Alighieri
app.get("author/dante-alighieri", (req, res) => {
const danteBook = books.find (book) = book.title === "Dante Alighieri";
    if (danteBook) {
        res.status(200).json(danteBook); // devuelve el libro con el título Harry Potter
    } else {
      // si el libro no existe
      res.status(404).json({ msj: "Libro no encontrado" }); // devuelve un mensaje de error
    }
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
