const libraryContainer = document.querySelector(".library__container");
const addBtn = document.querySelector(".add-book-btn")
const form = document.querySelector(".form")
const closedBtn = document.querySelector(".closed-btn")
const submitBtn = document.querySelector('.submit-btn')

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read')

const myLibrary = [];


function Book(title, author, pages, read) {
    this.id = crypto.randomUUID(); //Genera un ID único automático para cada libro
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}


const viewBooks = () => {
    libraryContainer.innerHTML = '';
    
    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const removeBookBtn = document.createElement('button');
        removeBookBtn.classList.add('remove-book-btn');

        const removeIcon = document.createElement('ion-icon')
        removeIcon.setAttribute('name', 'trash-outline')
        
        removeBookBtn.appendChild(removeIcon);

        const title = document.createElement('h2');
        title.textContent = book.title;
        
        const author = document.createElement('p')
        const authorSpan = document.createElement('span');
        authorSpan.textContent = 'Author: ';
        author.append(authorSpan, book.author);

        const pages = document.createElement('p');

        const pagesSpan = document.createElement('span');
        pagesSpan.textContent = 'Pages: ';
        
        pages.append(pagesSpan, book.pages);

        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('toggle-read-btn');

        toggleBtn.textContent = book.read ? 'READ' : 'UNREAD';
        
        bookDiv.appendChild(removeBookBtn);
        bookDiv.appendChild(title)
        bookDiv.appendChild(author)
        bookDiv.appendChild(pages)
        bookDiv.appendChild(toggleBtn);
        
        libraryContainer.appendChild(bookDiv)
        
        if(book.read) {
            toggleBtn.classList.add('read__text--green');
        } else {
            toggleBtn.classList.add('read__text--red');
        }
        
        toggleBtn.addEventListener('click', () => {
            book.toggleRead();
            viewBooks();
        });
        

        removeBookBtn.addEventListener('click', () => {
            const index = myLibrary.findIndex(item => item.id === book.id);

            if(index !== -1) {
                myLibrary.splice(index, 1);
                viewBooks();
            }
        })
        
    });
}


//DEMO
addBookToLibrary('El Hobbit', 'J.R.R. Tolkien', 310, false);
addBookToLibrary('The Da Vinci Code', 'Dan Brown', 489, true);
addBookToLibrary('Divergent', 'Veronica Roth', 487, false);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 432, true);
addBookToLibrary('Paper Towns', 'John Green', 336, true);
addBookToLibrary('The Evil Wears Prada', 'Lauren Weisberger', 416, true);
addBookToLibrary('Our Chemical Hearts', 'Krystal Sutherland', 299, false);

viewBooks();


const overlay = document.createElement('div');
overlay.classList.add('overlay')

document.body.appendChild(overlay);

overlay.appendChild(form)

addBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
    form.style.display = 'flex'; 
})


closedBtn.addEventListener("click", () => {
    form.style.display = "none";
    overlay.style.display = "none";
})


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = Number(pagesInput.value); 
    const read = readInput.checked;


    addBookToLibrary(title, author, pages, read);
    viewBooks()

    form.reset();

    overlay.style.display = 'none';
})