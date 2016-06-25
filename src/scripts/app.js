'use strict';
const disponibility = [];
disponibility[0] = "No";
disponibility[1] = "Yes";
const category = [];
category[1] = "Art";
category[2] = "History";
category[3] = "Fiction";
// A Library Book app.
class LibraryBookApp {
  // Initializes the Library Book app.
  constructor() {
      this.bookContainer = document.getElementById('book-container');
      this.bookForm = document.getElementById('new-book');
      this.bookNameInput = document.getElementById('name');
      this.bookAuthorInput = document.getElementById('author');
      this.bookCategoryInput = document.getElementById('category');
      this.bookCodeBookInput = document.getElementById('code-book');
      this.bookDisponibilityInput = document.getElementsByName('disponibility');
      this.bookBookIdInput = document.getElementsByName('book-id');
      this.addBookButton = document.getElementById('save');
      this.bookSectionTitle = document.getElementById('book-section-title');
      this.bookTableHeader = document.getElementById('book-table-header');
      this.bookTitleFormBook = document.getElementById('title-form-book');
      this.bookListContainer = document.getElementById('list-book');
      this.bookList = document.getElementById('list-book-wp');
      this.menuLinkList = document.getElementById('link-list');
      this.menuLinkAdd = document.getElementById('link-add');
      this.book = {};
      // Validate form on button click.
      this.bookForm.addEventListener('submit', e => this.validateForm(e), false);
      this.menuLinkList.addEventListener('click', e => this.changePage(e, this.menuLinkList), false);
      this.menuLinkAdd.addEventListener('click', e => this.changePage(e, this.menuLinkAdd), false);
      // Loads all the book.
      for (let key in localStorage) {
        this.displayBook(key, localStorage[key]);
      }
      // Listen for updates to book from other windows.
      window.addEventListener('storage', e => this.displayBook(e.key, e.newValue));
    }
    // Saves a new library book on localStorage.
  saveBook(id = null) {
      // Push values in object
      if (this.bookNameInput.value) {
        this.book.name = this.bookNameInput.value;
        this.resetfield(this.bookNameInput);
      }
      if (this.bookAuthorInput.value) {
        this.book.author = this.bookAuthorInput.value;
        this.resetfield(this.bookAuthorInput);
      }
      if (this.bookCategoryInput.value) {
        this.book.category = this.bookCategoryInput.value;
        this.resetfield(this.bookCategoryInput);
      }
      if (this.bookCodeBookInput.value) {
        this.book.codebook = this.bookCodeBookInput.value;
        this.resetfield(this.bookCodeBookInput);
      }
      if (this.getRadioValue(this.bookDisponibilityInput)) {
        this.book.disponibility = this.getRadioValue(this.bookDisponibilityInput);
        this.resetfield(this.bookDisponibilityInput);
      }
      let key;
      if (this.bookBookIdInput.value === '' || typeof this.bookBookIdInput.value === 'undefined') {
        key = Date.now().toString();
      } else {
        key = this.bookBookIdInput.value;
        this.bookBookIdInput.value = '';
      }
      this.addBookButton.textContent = 'New';
      this.bookTitleFormBook.textContent = 'Add a Book';
      this.bookForm.style.display = 'none';
      this.bookList.style.display = 'block';
      this.menuLinkAdd.className = "";
      this.menuLinkList.className = "active";
      localStorage.setItem(key, JSON.stringify(this.book));
      this.displayBook(key, JSON.stringify(this.book));
    }
    // Resets the given Field.
  resetfield(element) {
      if (element.type == 'hidden' || element.type == 'text' || element.tagName == 'SELECT') {
        element.value = '';
      } else {
        this.resetRadioValue(element);
      }
    }
    // Creates/updates/deletes a book.
  displayBook(key, object) {
      let book = document.getElementById(key);
      if (!book) {
        book = document.createElement('library-book');
        book.id = key;
        this.bookListContainer.insertBefore(book, this.bookTableHeader.nextSibling);
      }
      // If the object is null we delete the book.
      if (!object) {
        return book.deleteBook();
      }
      book.setBook(object);
      book.editButton.addEventListener('click', () => book.setInputs(this));
    }
    // validate form
  validateForm(e) {
    e.preventDefault();
    if (this.bookNameInput.value == "" && this.bookNameInput.required) {
      alert("Please provide the book name!");
      this.bookNameInput.focus();
      return false;
    } else if (this.bookAuthorInput.value == "" && this.bookAuthorInput.required) {
      alert("Please provide the author name!");
      this.bookAuthorInput.focus();
      return false;
    } else if (this.bookCodeBookInput.value == "" && this.bookCodeBookInput.required) {
      alert("Please provide the code book!");
      this.bookCodeBookInput.focus();
      return false;
    } else if (this.bookCategoryInput.value == "" && this.bookCategoryInput.required) {
      alert("Please select category!");
      this.bookCategoryInput.focus();
      return false;
    } else if (!this.getRadioValue(this.bookDisponibilityInput) && this.isRadioRequired(this.bookDisponibilityInput)) {
      alert("Please choose disponibility!");
      this.bookDisponibilityInput.focus();
      return false;
    }
    this.saveBook(this.bookBookIdInput.value);
  }
  changePage(e, link) {
      console.log(link.getAttribute("id"))
      if (link.getAttribute("id") == 'link-add') {
        this.bookForm.style.display = 'block';
        this.bookList.style.display = 'none';
        this.menuLinkList.className = "";
        link.className = "active";
      } else if (link.getAttribute("id") == 'link-list') {
        this.bookForm.style.display = 'none';
        this.bookList.style.display = 'block';
        this.menuLinkAdd.className = "";
        link.className = "active";
      }
    }
    // return checked radio value
  getRadioValue(radios) {
      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          return radios[i].value;
          break;
        }
      }
    }
    // check redio 
  setRadioValue(radios, val) {
      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].value == val) {
          radios[i].checked = true;
          break;
        }
      }
    }
    // reset checked radio
  resetRadioValue(radios) {
      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          radios[i].checked = false;
          break;
        }
      }
    }
    // check if radio required
  isRadioRequired(radios) {
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].required) {
        return radios[i].value;
        break;
      }
    }
  }
}
// On load app
window.addEventListener('load', () => new LibraryBookApp());
class LibraryBook extends HTMLElement {
  createdCallback() {
    this.classList.add(...LibraryBook.CLASSES);
    this.innerHTML = LibraryBook.TEMPLATE;
    this.nameElement = this.querySelector('.name');
    this.authorElement = this.querySelector('.author');
    this.categoryElement = this.querySelector('.category');
    this.disponibilityElement = this.querySelector('.disponibility');
    this.codeElement = this.querySelector('.code_book');
    this.deleteButton = this.querySelector('.delete');
    this.editButton = this.querySelector('.edit');
    this.deleteButton.addEventListener('click', () => this.deleteBook());
  }
  attributeChangedCallback(attributeName) {
      if (attributeName == 'id') {
        let date;
        if (this.id) {
          date = new Date(parseInt(this.id));
        } else {
          date = new Date();
        }
        // Format the date 
        let options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false
        };
        let shortDate = date.toLocaleString("de-DE", options);
        //this.dateElement.textContent = `${shortDate}`;
      }
    }
    // Sets the name of the book.
  setBook(object) {
      var obj = JSON.parse(object);
      this.nameElement.textContent = obj.name;
      this.authorElement.textContent = obj.author;
      this.categoryElement.textContent = category[obj.category];
      this.codeElement.textContent = obj.codebook;
      this.disponibilityElement.textContent = disponibility[obj.disponibility];
    }
    // Deletes the book by removing the element.
  deleteBook() {
    localStorage.removeItem(this.id);
    this.parentNode.removeChild(this);
  }
  setInputs(app) {
    var obj = JSON.parse(localStorage.getItem(this.id));
    if (obj.name) {
      app.bookNameInput.value = obj.name;
    }
    if (obj.author) {
      app.bookAuthorInput.value = obj.author;
    }
    if (obj.category) {
      app.bookCategoryInput.value = obj.category;
    }
    if (obj.codebook) {
      app.bookCodeBookInput.value = obj.codebook;
    }
    if (obj.disponibility) {
      app.setRadioValue(app.bookDisponibilityInput, obj.disponibility);
    }
    app.addBookButton.textContent = 'Save';
    app.bookTitleFormBook.textContent = 'Edit Book';
    app.bookBookIdInput.value = this.id;
    app.bookForm.style.display = 'block';
  }
}
// Initial content.
LibraryBook.TEMPLATE = `
    <div class="name"></div>
    <div class="author"></div>
    <div class="category"></div>
    <div class="code_book"></div>
    <div class="disponibility"></div> 
    <button class="delete">
      Delete
    </button>
    <button class="edit">
      Edit
    </button>
    `;
// LibraryBook elements classes.
LibraryBook.CLASSES = ['library-book'];
document.registerElement('library-book', LibraryBook);