window.onload = function(){
    var showFormBtn = document.getElementById('show-form');
    var addBookBtn = document.getElementById('add-book');
    var addBookSection = document.getElementsByClassName('add-book-section')[0];
    var addBookAuthorField = document.getElementById('author');
    var addBookTitleField = document.getElementById('title');
    var addBookPagesField = document.getElementById('pages');
    var addBookReadCheckbox = document.getElementById('read');

    showFormBtn.addEventListener("click", toggleFormVisibility, false);
    addBookBtn.addEventListener("click", addBookButtonListener, false);

    function toggleFormVisibility() {
        if(addBookSection.classList.contains("hidden")){
            addBookSection.classList.remove("hidden");
        }
        else{
            addBookSection.classList.add("hidden");
        }    
        
    }
    const library = new Library;
    function addBookButtonListener(event) {
        event.preventDefault();
        if(addBookTitleField.value){
            library.addBookToLibrary(addBookTitleField.value,addBookAuthorField.value,addBookPagesField.value,addBookReadCheckbox.checked);
        }

    }
    
}
class Library {
    constructor(books=[]){
        this.myLibrary = [];
        for(book of books){
            addBookToLibrary(...book);    
        }
    }
    addBookToLibrary(title,author,pages,read){
        const book = new Book(title,author,pages,read);
        this.myLibrary.push(book);
        const bookCard = new BookCard(book);
        bookCard.displayBook();
    }
}

class Book {
    constructor(title, author, noPages, readState) {
      this.self = this;
      this.title = title;
      this.author = author;
      this.noPages = noPages;
      this.readState = readState;
    }

    displayBook(){
        return {title:this.title,author:this.author,noPages:this.noPages,readState: this.readState}
    }
    toggleReadState(){
        this.readState = !this.readState;
    }
}

class BookCard {
    constructor(book){
        this.book = book;
        this.bookCard="";
        this.self = this;
    }
    updateBookCard(bookCard){
        this.bookCard = bookCard;
    }
    displayBook(position='to_front'){
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        const bookCardTitle = document.createElement("h3");
        bookCardTitle.classList.add("title-display");
        const bookCardAuthor = document.createElement("h4");
        bookCardAuthor.classList.add("author-display");
        const bookCardPages = document.createElement("p");
        const bookCardRead = document.createElement("p");
        const bookCardDelete = document.createElement("button");

        const bookData = this.book.displayBook();
            bookCardTitle.appendChild(document.createTextNode(bookData.title));
            bookCardAuthor.appendChild(document.createTextNode(bookData.author||"unknown"));
            bookCardPages.appendChild(document.createTextNode(bookData.noPages||"unknown"));
            bookCardRead.appendChild(document.createTextNode((bookData.readState?"read":"not read")));
        
        bookCardDelete.appendChild(document.createTextNode('Delete book'));
        bookCardDelete.classList.add("delete-button");
        bookCardRead.classList.add("read-button");
            
            if(bookData.readState){
                bookCardRead.classList.add("read");
            }

        bookCard.appendChild(bookCardTitle);
        bookCard.appendChild(bookCardAuthor);
        bookCard.appendChild(bookCardPages);
        bookCard.appendChild(bookCardRead);
        bookCard.appendChild(bookCardDelete);

        bookCardDelete.addEventListener("click", function(){this.deleteBook(bookCard)}.bind(this.self), false);
        bookCardRead.addEventListener("click", function(e){
                const position = e.originalTarget.closest(".book-card").nextSibling;
                this.changeReadStateCallback(bookCard,position)
            }.bind(this.self));
        this.updateBookCard(bookCard);
        if(position === 'to_front'){
            position = document.getElementsByClassName('library')[0].children[0]
        }
        document.getElementsByClassName('library')[0].insertBefore(bookCard,position);
    }

    deleteBook(bookCard){
        bookCard.remove();
    }
    changeReadStateCallback(bookCard,position){
        this.book.toggleReadState();
        this.deleteBook(bookCard);
        this.displayBook(position);
        
    }
}    

