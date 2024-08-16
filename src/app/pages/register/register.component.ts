import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
itemForm!: FormGroup;
isEditing: boolean = false;
currentItemIndex: number | null = null;

private route = inject(Router);
private fb: FormBuilder = inject(FormBuilder);
private productService = inject(ProductService);
private activatedRoute = inject(ActivatedRoute);

ngOnInit(): void {
  this.createForm();

  this.activatedRoute.params.subscribe(params => {
    const index = params['id'];
    if (index !== undefined) {
      this.isEditing = true;
      this.currentItemIndex = +index;
      this.loadItemData(this.currentItemIndex);
    }
  });
}

createForm(): void {
  this.itemForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    unity: ['', Validators.required],
    quantity: [''],
    price: ['', Validators.required],
    perishable_product: [false],
    validate_date: [''],
    initial_date: ['', Validators.required]
  })
}

onClickCancelButton():void {
this.route.navigate(['/home']);
}

onSubmit(): void {
  if (this.itemForm.valid) {
    const formValues = this.itemForm.value;
    const newItem = {
      nome: formValues.name,
      unidadeMedida: formValues.unity,
      quantidade: parseFloat(formValues.quantity),
      preco: formValues.price,
      produtoPerecivel: formValues.perishable_product,
      dataValidade: formValues.validate_date,
      dataFabricacao: formValues.initial_date,
    };

    if (this.isEditing && this.currentItemIndex !== null) {
      this.productService.updateItem(this.currentItemIndex, newItem);
      console.log('Item atualizado:', newItem);
    } else {
      this.productService.addItem(newItem);
    }

    this.route.navigate(['/home']);
  } else {
    console.error('Formulário inválido');
  }
}

loadItemData(index: number): void {
  const items = this.productService.getItem();
  if (index >= 0 && index < items.length) {
    const item = items[index];
    this.itemForm.patchValue({
      name: item.nome,
      unity: item.unidadeMedida,
      quantity: item.quantidade,
      price: item.preco,
      perishable_product: item.produtoPerecivel,
      validate_date: item.dataValidade || '',
      initial_date: item.dataFabricacao,
    });
  }
}
}
