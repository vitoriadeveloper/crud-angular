import { CommonModule  } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { BrDatePipe } from '../../shared/br-date.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, BrDatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{
  products: Product[] = [];
  private route = inject(Router);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts():void {
    this.products = this.productService.getItem();
  }

  editProduct(i: number): void {
    this.route.navigate(['/register', i]);
  }

  deleteProduct(i: number): void {
    if (confirm('Você tem certeza que deseja excluir este item?')) {
      this.productService.deleteItem(i);
    }
    this.getProducts();
  }

}
