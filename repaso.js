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

// Ejercicio 6 - Crea una ruta /country/charles-dickens para obtener SÓLO EL PAÍS del libro de Charles Dickens
app.get("country/charles-dickens", (req, res) => {
    const charlesDickensBook = books.find((book) => book.author === "Charles Dickens");
  
    if (charlesDickensBook) {
      res.status(200).json({ country: charlesDickensBook.country }); // Devuelve el país del libro
    } else {
      res.status(404).json({ msj: "País no encontrado" }); // Mensaje si no se encuentra
    }
  });

// Ejercicio 7 - Crea una ruta /year&pages/cervantes para obtener LAS PÁGINAS Y EL AÑO del libro de Miguel de Cervantes, Ejemplo de respuesta: { pages: ..., year: ... }
app.get("/year&pages/cervantes", (req, res) => {
    const author = books.find (book) = book.author === "Miguel de Cervantes";
        
    if (author) {
            res.status(200).json({pages: book.pages, year: book.year}); // devuelve el libro con el título Harry Potter
        } else {
          // si el libro no existe
          res.status(404).json({ msj: "Libro no encontrado" }); // devuelve un mensaje de error
        }
      });

// Ejercicio 8 - Crea una ruta /country/count/spain para obtener EL NÚMERO DE LIBROS de España
app.get("/country/count/spain", (req, res) => {
    const spain = books.filter((book) => book.country === "Spain");
        
    if (spain.length > 0) {
            res.status(200).json({libros: spain.length}); // devuelve el libro con el título Harry Potter
        } else {
          // si el libro no existe
          res.status(404).json({ msj: "Pais no encontrado" }); // devuelve un mensaje de error
        }
      });
  
// Ejercicio 9 - Crea una ruta /country/at-least/germany para obtener VERDADERO O FALSO dependiendo de si hay o no un libro de Alemania
app.get("/country/at-least/germany", (req, res) => {
    const bookGermany = books.find((book) => book.country === "Germany");
        
    if (bookGermany) {
            res.status(200).json({respuesta: true}); // devuelve el libro con el título Harry Potter
        } else {
          // si el libro no existe
          res.status(404).json({ respuesta: false }); // devuelve un mensaje de error
        }
      });

// Ejercicio 10 - Crea una ruta /pages/all-greater/200 para obtener VERDADERO O FALSO dependiendo de si todos los libros tienen más de 200 páginas
app.get("/pages/all-greater/200", (req, res) => {
    const bookPages = books.filter((book) => book.pages === pages);
        
    if (bookPages >= 200) {
            res.status(200).json({respuesta: true}); // devuelve el libro con el título Harry Potter
        } else {
          // si el libro no existe
          res.status(404).json({ respuesta: false }); // devuelve un mensaje de error
        }
      });

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
