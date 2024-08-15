import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
private storageKey  = 'items';

getItem(): Product[]{
const savedItems = sessionStorage.getItem(this.storageKey);
return savedItems ? JSON.parse(savedItems) : [];
}

saveItems (items: Product[]):void{
sessionStorage.setItem(this.storageKey, JSON.stringify(items));
}

addItem(item: any){
const items = this.getItem();
items.push(item);
this.saveItems(items);
}

updateItem(index: number, item: Product): void {
  const items = this.getItem();
  if(index >= 0 && index < items.length){
    items[index] = item;
    this.saveItems(items);
  }
}

  deleteItem(index: number): void {
    const items = this.getItem();
    if(index >= 0 && index < items.length){
      items.splice(index, 1);
      this.saveItems(items);
    }
  }
}
