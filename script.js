class Book {
  static books = [];

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook(book) {
    this.books.push(book);
  }

  static rmvBook(rmvBook) {
    this.books = this.books.filter((book) => book !== rmvBook);
  }
}

const form = document.querySelector('#form');
const title = form.elements[0];
const author = form.elements[1];
const addBtn = document.querySelector('#add-btn');
const bookList = document.querySelector('#book-list');

function saveBooksLocally() {
  localStorage.setItem('books', JSON.stringify(Book.books));
}

const appendBook = (book, index) => {
  const bookElement = document.createElement('div');
  const rmvBtn = document.createElement('button');
  rmvBtn.classList.add('remove-button');
  rmvBtn.innerText = 'Remove';

  bookElement.classList.add('book-element-wrapper');
  bookElement.innerHTML = `<span>${book.title}</span><br><span>${book.author}</span><br>`;
  bookElement.appendChild(rmvBtn);
  bookElement.appendChild(document.createElement('hr'));

  bookList.appendChild(bookElement);
  saveBooksLocally();

  const rmvBook = Book.books[index];
  rmvBtn.addEventListener('click', () => {
    bookElement.remove();
    Book.rmvBook(rmvBook);
    saveBooksLocally();
  });
};

function appendAllBooks() {
  Book.books.forEach((book, index) => {
    appendBook(book, index);
  });
}

window.addEventListener('load', () => {
  Book.books = JSON.parse(localStorage.getItem('books'));
  if (Book.books) {
    appendAllBooks();
  }
});

addBtn.addEventListener('click', () => {
  const newBook = new Book(title.value, author.value);
  Book.addBook(newBook);
  appendBook(newBook, Book.books.length - 1);
});
