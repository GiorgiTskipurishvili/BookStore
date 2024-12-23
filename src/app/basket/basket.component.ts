import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  standalone: false,
  
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent  implements OnInit{
  fullName: string = ''; // Full name passed from the UserComponent
  basket: any[] = [];
  private baseUrl: string = 'https://localhost:7212/api/Order';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const state = history.state;
    this.basket = state.basket || [];
    this.fullName = state.fullName || '';
    console.log('Basket items:', this.basket);
    console.log('Full name:', this.fullName);
  }

  
  getTotalPrice(): number {
    return this.basket.reduce(
      (total, item) => total + item.selectedQuantity * item.price,
      0
    );
  }


  orderering() {
    if (this.basket.length === 0) {
      alert('კალათა ცარიელია!');
      return;
    }

    if (this.fullName.trim() === '') {
      alert('გთხოვთ შეიყვანოთ თქვენი სახელი და გვარი!');
      return;
    }

    const orders = this.basket.map((item) => ({
      fullName: this.fullName, 
      orderQuantity: item.selectedQuantity,
      bookId: item.id,
    }));

    this.http.post(this.baseUrl, orders).subscribe(
      () => {
        alert('შეკვეთა წარმატებით შესრულდა!');
        this.basket = [];
      },
      (error) => {
        console.error('Error placing order:', error);
        alert('შეკვეთის შესრულებისას მოხდა შეცდომა.');
      }
    );
  }

  // Clear orders
  cancelOrder() {
    if (confirm('დარწმუნებული ხართ რომ გსურთ შეკვეთის გაუქმება?')) {
      this.basket = [];
    }
  }

  selectItemForEdit(item: any) {
    console.log('Selected item for edit:', item);
  }
}
