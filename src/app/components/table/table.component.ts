import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  products: Product[] = [];
  private route = inject(Router);
  private productService = inject(ProductService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getItem().pipe(
      tap(items => this.products = items),
      catchError(error => {
        this.showError();
        return of([]);
      })
    ).subscribe();
  }

  editProduct(i: number): void {
    this.route.navigate(['/register', i]);
  }

  showSuccess(): void {
    this.toastr.success('Operação realizada com sucesso!', 'Sucesso', {
      toastClass: 'toast toast-success'
    });
  }

  showError(): void {
    this.toastr.error('Ocorreu um erro!', 'Erro', {
      toastClass: 'toast toast-error'
    });
  }

  deleteProduct(i: number): void {
    if (confirm('Você tem certeza que deseja excluir este item?')) {
      this.productService.deleteItem(i).pipe(
        tap(() => {
          this.showSuccess();
          this.getProducts();
        }),
        catchError(error => {
          this.showError();
          return of();
        })
      ).subscribe();
    }
  }
}
