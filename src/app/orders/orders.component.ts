import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: false,
  
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  fullnames: string[] = []; 
  selectedFullname: string | null = null; 
  orders: any[] = []; 
  private baseUrl: string = 'https://localhost:7212/api/Order'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFullnames(); 
  }

  getFullnames(): void {
    this.fullnames = ['Sam Smith', 'tengo','lado','Dato'];
  }


  getOrdersByFullname(fullname: string): void {
    if (this.selectedFullname === fullname) {
      this.selectedFullname = null;
      this.orders = [];
    } else {
      this.selectedFullname = fullname;
      this.http.get<any[]>(`${this.baseUrl}/${fullname}`).subscribe(
        (response) => {
          this.orders = response;
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    }
  }
}
