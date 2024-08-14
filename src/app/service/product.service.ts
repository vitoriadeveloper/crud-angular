import { Injectable } from '@angular/core';

interface FormRequest {
  nome: string;
  unidade_medida: 'lt' | 'kg' | 'un';
  quantidade: number;
  preco: string;
  produto_perecivel: boolean;
  data_validade?: string;
  data_fabricacao: string;

}
@Injectable({
  providedIn: 'root'
})

export class ProductService {
private storageKey  = 'items';

getItem(): FormRequest[]{
const savedItems = sessionStorage.getItem(this.storageKey);
return savedItems ? JSON.parse(savedItems) : [];
}

saveItems (items: FormRequest[]):void{
sessionStorage.setItem(this.storageKey, JSON.stringify(items));
}

addItem(item: any){
const items = this.getItem();
items.push(item);
this.saveItems(items);
}

updateItem(index: number, item: FormRequest): void {
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
