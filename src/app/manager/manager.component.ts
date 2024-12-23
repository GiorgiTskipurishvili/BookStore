import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  standalone: false,
  
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})

export class ManagerComponent implements OnInit {
  baseUrl: string = 'https://localhost:7212/api/BookStore';
  books: any[] =[]

  isAddingBook: boolean = false;

  selectedBook: any = null;

  newBook: any ={
    title: '',
    price: 0,
    author: '',
    quantity: 0
  };

  constructor(private http : HttpClient){}


  ngOnInit(): void {
    this.getBooks();
  }

//get books from database
  getBooks(){
    this.http.get<any[]>(`${this.baseUrl}`).subscribe(
      (response) => {
        this.books = response;
        console.log('books showing')
      },
      (error) =>{
        console.error("error books:",error);
      }
    );
  }


// 
  toggleAddBook() {
    this.isAddingBook = !this.isAddingBook;
  }

  incrementQuantity() {
    this.newBook.quantity++;
  }

  decrementQuantity() {
    if (this.newBook.quantity > 0) {
      this.newBook.quantity--;
    }
  }

  // for add book
  addBook() {
    console.log('attempting to add book:', this.newBook); 
  
    this.http.post(this.baseUrl, this.newBook).subscribe(
      (response) => {
        console.log('book added successfully:', response);
        this.isAddingBook = false; 
        this.newBook = { title: '', price: 0, author: '', quantity: 0 }; 
        this.getBooks(); 
      },
      (error) => {
        console.error('error adding book:', error);
      }
    );
  }
  

  selectBookForEdit(book: any) {
    this.selectedBook = { ...book }; 
  }


  // for update
  updateBook() {
    if (this.selectedBook) {
      this.http.put(`${this.baseUrl}/${this.selectedBook.id}`, this.selectedBook).subscribe(
        (response) => {
          alert('updateed');
          this.getBooks();
          this.selectedBook = null; 
        },
        (error) => {
          console.error('error updating:', error);
        }
      );
    }
  }
  // for deletestvis
  deleteBook() {
    if (confirm('do u want delete????')) {
      this.http.delete(`${this.baseUrl}/${this.selectedBook.id}`).subscribe(
        (response) => {
          alert('deleted successfully:');
          this.getBooks(); 
          this.selectedBook = null; 
        },
        (error) => {
          console.error('error deleting :', error);
        }
      );
    }
  }
}
