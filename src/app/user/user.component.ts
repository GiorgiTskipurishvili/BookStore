import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  decrementQuantity(book: any) {
    if (book.selectedQuantity > 0) {
      book.selectedQuantity--;
    }
  }

  incrementQuantity(book: any) {
    if (book.selectedQuantity < book.quantity) {
      book.selectedQuantity++;
    }
  }



  isValidToProceed(): boolean {
    return this.fullName.trim().length > 0;
   }


   fullName: string = ''; 
   books: any[] = [];
   basket: any[] = [];
   private baseUrl: string = 'https://localhost:7212/api/BookStore'; 
 
   constructor(private http: HttpClient, private router: Router) {}
 
   ngOnInit(): void {
     this.getBooks();
   }
 
   // get books
   getBooks() {
     this.http.get<any[]>(`${this.baseUrl}`).subscribe(
       (response) => {
         this.books = response.map((book) => ({
           ...book,
           selectedQuantity: 0, 
         }));
         console.log('Books fetched:', this.books);
       },
       (error) => {
         alert('Error fetching books! Please try again later.');
         console.error('Error fetching books:', error);
       }
     );
   }
 
   // adadd book 
   addToBasket(book: any) {
     if (book.selectedQuantity <= 0 || book.selectedQuantity > book.quantity) {
       alert('invalid quantity! pllease check the available stock.');
       return;
     }
 
     const existingItem = this.basket.find((item) => item.id === book.id);
     if (existingItem) {
       existingItem.selectedQuantity += book.selectedQuantity;
     } else {
       this.basket.push({ ...book });
     }
     book.quantity -= book.selectedQuantity;
     book.selectedQuantity = 0; 
   }
 
   // roter to the basket page
   goToBasket() {
     if (this.fullName.trim() === '') {
       alert('გთხოვთ შეიყვანოთ თქვენი სახელი და გვარი!');
       return;
     }
 
     // passing basket and fullname to the basket componentt
     this.router.navigate(['/basket'], {
       state: { basket: this.basket, fullName: this.fullName },
     });
   }

}
