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
    function addBookButtonListener(event) {
        event.preventDefault();
        if(addBookTitleField.value){
            addBookToLibrary(addBookTitleField.value,addBookAuthorField.value,addBookPagesField.value,addBookReadCheckbox.checked);
        }

    }
    myLibrary.forEach(book => book.displayBook()); //this needs testing
}
//library setup
var myLibrary = [];

function addBookToLibrary(title,author,pages,read){
    let position = myLibrary.push(new Book(title,author,pages,read));
    myLibrary[position-1].displayBook();
}

//book object + its methods declared on the prototype
function Book(title,author,noPages,readState){
    this.title = title;
    this.author = author;
    this.noPages = noPages;
    this.readState = readState||false;
    Book.prototype.displayBook = function (insertDestination=null){
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            const bookCardTitle = document.createElement("h3");
            bookCardTitle.classList.add("title-display");
            const bookCardAuthor = document.createElement("h4");
            bookCardAuthor.classList.add("author-display");
            const bookCardPages = document.createElement("p");
            const bookCardRead = document.createElement("p");
            const bookCardDelete = document.createElement("button");
            bookCardTitle.appendChild(document.createTextNode(this.title));
            bookCardAuthor.appendChild(document.createTextNode(this.author));
            bookCardPages.appendChild(document.createTextNode(this.noPages||"unknown"));
            bookCardRead.appendChild(document.createTextNode((this.readState?"read":"not read")));
            bookCardDelete.appendChild(document.createTextNode('Delete book'));
            bookCardDelete.classList.add("delete-button");
            bookCardRead.classList.add("read-button");
            if(this.readState){
                bookCardRead.classList.add("read");
            }
            bookCard.appendChild(bookCardTitle);
            bookCard.appendChild(bookCardAuthor);
            bookCard.appendChild(bookCardPages);
            bookCard.appendChild(bookCardRead);
            bookCard.appendChild(bookCardDelete);
            bookCardDelete.addEventListener("click", deleteBook, false);
            function deleteBook() {
                bookCard.remove();
            }
            bookCardRead.addEventListener("click", ()=>{
               this.changeReadState();
            });
            this.bookCard = bookCard;
            document.getElementsByClassName('library')[0].insertBefore(bookCard,insertDestination);
    }
    Book.prototype.changeReadState = function(){
        if(this.readState){
            this.readState = false;
        }
        else{
            this.readState = true;
        }
        let oldBookCard = this.bookCard; //remembering this cause displayBook will overwrite it
        this.displayBook(oldBookCard);
        oldBookCard.remove();

    }
}

