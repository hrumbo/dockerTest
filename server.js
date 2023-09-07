const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

// Use the body-parser middleware to parse JSON data in the request body
app.use(bodyParser.json());

// Use the cors middleware to enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static("public"));

const newBook1 = {
  id: "1",
  titulo: "100 tipos de Mates",
  autor: "Damian Pereira",
};
const newBook2 = {
  id: "2",
  titulo: "Primeros pasos como Pachano",
  titulo: "Rodri Berasain",
};

let books = [];
let nextBookId = 3;

books.push(newBook1);
books.push(newBook2);

// API endpoint to fetch all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// API endpoint to add a new book
app.post("/api/books", (req, res) => {
  const { titulo, autor } = req.body;
  console.log(`--------------------`);
  console.log(`------> libro: ${titulo}`);
  console.log(`------> req: ${autor}`);

  const id = nextBookId++;
  console.log(`------> nuevo ID: ${id}`);

  const newBook = { id, titulo, autor };
  books.push(newBook);
  res.status(201).json(newBook); // Use status 201 to indicate the resource was created
});
// API endpoint to edit a book
app.put("/api/books/:id", async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { titulo, autor } = req.body;

  console.log(`------- PUT -------------`);
  console.log(`------> libro: ${titulo}`);
  console.log(`------> req: ${autor}`);
  console.log(`------> ID a editar: ${bookId}`);

  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books[index].titulo = titulo;
    books[index].autor = autor;
    res.json(books[index]);
    console.log(
      `------> data del array: ${books[index].titulo} - ${books[index].autor}`
    );
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// API endpoint to delete a book
app.delete("/api/books/:id", async (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    res.sendStatus(204); // No Content
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
