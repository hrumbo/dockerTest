// Function to display a book entry
function displayBook(book) {
  const bookList = document.getElementById("bookList");
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.innerHTML = `
      <div>
          <strong>${book.titulo}</strong> by ${book.autor}
      </div>
      <div>
          <button onclick="editBook(${book.id})">Edit</button>
          <button onclick="deleteBook(${book.id})">Delete</button>
      </div>
  `;
  bookList.appendChild(bookDiv);
}

// Function to fetch and display all books
async function fetchBooks() {
  console.log("entro al fetch");
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  try {
    const response = await axios.get("/api/books");
    const books = response.data;
    books.forEach(displayBook);
  } catch (error) {
    console.error("Error fetching libros:", error);
  }
}

// Function to handle form submission
async function addBook(event) {
  console.log("entro al listener");
  event.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;

  console.log("Libro a agregar:", titulo, autor);
  try {
    await axios.post("/api/books", { titulo, autor });
    fetchBooks();
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
  } catch (error) {
    console.error("Error agregando libro:", error);
  }
}

// Function to delete a book
async function deleteBook(bookId) {
  try {
    await axios.delete(`/api/books/${bookId}`);
    fetchBooks();
  } catch (error) {
    console.error("Error borrando libro:", error);
  }
}

// Function to edit a book
async function editBook(bookId) {
  const newTitle = prompt("Ingresa un nuevo título:");
  const newAuthor = prompt("Ingresa un nuevo autor:");
  if (newTitle && newAuthor) {
    try {
      await axios.put(`/api/books/${bookId}`, {
        titulo: newTitle,
        autor: newAuthor,
      });
      fetchBooks();
    } catch (error) {
      console.error("Error editando libro:", error);
    }
  }
}

document.getElementById("bookForm").addEventListener("submit", addBook);

// Initial fetch of books
fetchBooks();
