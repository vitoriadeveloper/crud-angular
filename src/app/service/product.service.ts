import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private storageKey = 'items';

  getItem(): Observable<Product[]> {
    const savedItems = sessionStorage.getItem(this.storageKey);
    const items = savedItems ? JSON.parse(savedItems) : [];
    return of(items);
  }

  saveItems(items: Product[]): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  addItem(item: Product): Observable<void> {
    return new Observable(observer => {
      const items = this.getItem().subscribe(existingItems => {
        existingItems.push(item);
        this.saveItems(existingItems);
        observer.next();
        observer.complete();
      });
    });
  }

  updateItem(index: number, item: Product): Observable<void> {
    return new Observable(observer => {
      this.getItem().subscribe(items => {
        if (index >= 0 && index < items.length) {
          items[index] = item;
          this.saveItems(items);
          observer.next();
          observer.complete();
        } else {
          observer.error('Índice fora dos limites');
        }
      });
    });
  }

  deleteItem(index: number): Observable<void> {
    return new Observable(observer => {
      this.getItem().subscribe(items => {
        if (index >= 0 && index < items.length) {
          items.splice(index, 1);
          this.saveItems(items);
          observer.next();
          observer.complete();
        } else {
          observer.error('Índice fora dos limites');
        }
      });
    });
  }
}
