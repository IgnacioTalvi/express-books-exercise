const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// Cargar los libros desde el archivo JSON
const booksPath = path.join(__dirname, "data", "books.json");
let books = [];

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
