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

// Crea una ruta /all para obtener todos los libros
app.get("/books/all", (req, res) => {
  res.json(books);
});

// Crea una ruta /first para obtener el primer libro
app.get("/books/first", (req, res) => {
  res.json(books[0]);
});

// Crea una ruta /last para obtener el último libro
app.get("/books/last", (req, res) => {
  res.json(books[books.length - 1]);
});

// Crea una ruta /middle para obtener el libro en la mitad (número 50 en el array)
app.get("/books/middle", (req, res) => {
  res.json(books[Math.round((books.length - 1) / 2)]);
});

// Crea una ruta /author/dante-alighieri para obtener SÓLO EL TÍTULO del libro de Dante Alighieri
app.get("/author/dante-alighieri", (req, res) => {
  const danteBook = books.find((book) => book.author === "Dante Alighieri");
  if (danteBook) {
    res.json({ title: danteBook.title });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Crea una ruta /country/charles-dickens para obtener SÓLO EL PAÍS del libro de Charles Dickens
app.get("/country/charles-dickens", (req, res) => {
  const author = "Charles Dickens";

  // Busca el libro del autor especificado
  const book = books.find((book) => book.author() === author());

  if (book) {
    // Si se encuentra el libro, responde solo con el país
    res.status(200).json({ country: book.country });
  } else {
    // Si no se encuentra, devuelve un error
    res.status(404).json({ msj: "Libro no encontrado" });
  }
});

// Crea una ruta /year&pages/cervantes para obtener LAS PÁGINAS Y EL AÑO del libro de Miguel de Cervantes, Ejemplo de respuesta: { pages: ..., year: ... }
app.get("/year&pages/cervantes", (req, res) => {
  const author = "Miguel de Cervantes";

  // Busca el libro del autor especificado
  const bookCervantes = books.find((book) => book.author === author);

  if (bookCervantes) {
    // Si se encuentra el libro, responde con páginas y año
    res
      .status(200)
      .json({ pages: bookCervantes.pages, year: bookCervantes.year });
  } else {
    // Si no se encuentra, devuelve un error
    res.status(404).json({ msj: "Libro no encontrado" });
  }
});

// Crea una ruta /country/count/spain para obtener EL NÚMERO DE LIBROS de España
app.get("/country/count/spain", (req, res) => {
  const country = "Spain";

  // Busca el libro del autor especificado
  const librosDeEspaña = books.filter((book) => book.country === country);
  const cantidad = librosDeEspaña.length;

  if (selectedCountry) {
    // Si se encuentra el libro, responde con páginas y año
    res.status(200).json({ Libros: cantidad });
  } else {
    // Si no se encuentra, devuelve un error
    res.status(404).json({ msj: "Libro no encontrado" });
  }
});

// // Crea una ruta /country/count/spain para obtener EL NÚMERO DE LIBROS de España
app.get("/country/count/spain", (req, res) => {
  const country = "Spain";

  // Busca el libro del autor especificado
  const librosDeEspaña = books.filter((book) => book.country === country);
  const cantidad = librosDeEspaña.length;

  if (librosDeEspaña) {
    // Si se encuentra el libro, responde con páginas y año
    res.status(200).json({ Libros: cantidad });
  } else {
    // Si no se encuentra, devuelve un error
    res.status(404).json({ msj: "Libro no encontrado" });
  }
});

// Crea una ruta /country/at-least/germany para obtener VERDADERO O FALSO dependiendo de si hay o no un libro de Alemania
app.get("/country/at-least/germany", (req, res) => {
  const country = "Germany";

  // Busca el libro del autor especificado
  const menosAlemnania = books.filter((book) => book.country === country);
  const alemania = menosAlemnania.length;

  if (menosAlemnania) {
    // Si se encuentra el libro, responde con páginas y año
    res.status(200).json({ exists: true });
  } else {
    res.status(200).json({ exists: false });
    // // Si no se encuentra, devuelve un error
    // res.status(404).json({ msj: "Libro no encontrado" });
  }
});

// Crea una ruta /pages/all-greater/200 para obtener VERDADERO O FALSO dependiendo de si todos los libros tienen más de 200 páginas
app.get("/pages/all-greater/200", (req, res) => {
  const pages = 200;

  // Verifica si todos los libros tienen más de 200 páginas
  const todosMayores = books.every((book) => book.pages > pages);

  // Responde con verdadero o falso
  res.status(200).json({ exists: todosMayores });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
