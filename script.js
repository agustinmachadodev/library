const libraryContainer = document.querySelector(".library__container");
const addBtn = document.querySelector(".add-book-btn")
const form = document.querySelector(".form")
const closedBtn = document.querySelector(".closed-btn")
const submitBtn = document.querySelector('.submit-btn')


const myLibrary = [];


function Book(name, author, pages, read) {
    this.id = crypto.randomUUID(); //Genera un ID único automático para cada libro
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


function addBookToLibrary(name, author, pages, read) {
    const newBook = new Book(name, author, pages, read)
    myLibrary.push(newBook);
}


const viewBooks = () => {
    libraryContainer.innerHTML = ''; // limpiar
    
    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        
        const title = document.createElement('h2');
        title.textContent = book.name;
        
        const author = document.createElement('p')
        author.textContent = `Author: ${book.author}`;
        
        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;
        
        const read = document.createElement('p');
        read.textContent = book.read ? 'Leìdo' : 'No leído';
        
        bookDiv.appendChild(title)
        bookDiv.appendChild(author)
        bookDiv.appendChild(pages)
        bookDiv.appendChild(read)
        
        libraryContainer.appendChild(bookDiv)
    });
}

addBookToLibrary('Harry Potter y la piedra filosofal', 'J. K. Rowling', 120, true);
addBookToLibrary('Paper Towns', 'John Green', 200, false);
addBookToLibrary('Harry Potter y la piedra filosofal', 'J. K. Rowling', 120, true);
addBookToLibrary('Paper Towns', 'John Green', 200, false);
addBookToLibrary('Harry Potter y la piedra filosofal', 'J. K. Rowling', 120, true);
addBookToLibrary('Paper Towns', 'John Green', 200, false);

viewBooks();

const overlay = document.createElement('div');
overlay.classList.add('overlay')

document.body.appendChild(overlay);

overlay.appendChild(form)

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    overlay.style.display = 'flex';
    form.style.display = 'flex'; 
})


closedBtn.addEventListener("click", () => {
    form.style.display = "none";
    overlay.style.display = "none";
})

