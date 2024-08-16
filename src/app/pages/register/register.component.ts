import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BrDatePipe } from '../../shared/br-date.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BrDatePipe, NgxMaskDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  itemForm!: FormGroup;
  isEditing: boolean = false;
  currentItemIndex: number | null = null;
  isExpired: boolean = false;
  isInvalidDateRange: boolean = false;

  private route = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);
  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  private datePipe = new BrDatePipe();

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

    this.itemForm.valueChanges.subscribe(() => {
      this.updateErrorStates();
    });
  }

  createForm(): void {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      unity: ['', Validators.required],
      quantity: [''],
      price: ['', Validators.required],
      perishable_product: [false],
      validate_date: [''],
      initial_date: ['', [Validators.required]],
    }, { validators: [this.dateValidator()] });
  }

  dateValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      if (!(form instanceof FormGroup)) {
        return null;
      }

      const validateDate = form.get('validate_date')?.value;
      const initialDate = form.get('initial_date')?.value;
      const isPerishable = form.get('perishable_product')?.value;
      const today = new Date();

      const validateDateParsed = validateDate ? new Date(validateDate) : null;
      const initialDateParsed = initialDate ? new Date(initialDate) : null;

      if (validateDateParsed && initialDateParsed) {
        if (validateDateParsed < today) {
          return { expired: true };
        }

        if (isPerishable && initialDateParsed > validateDateParsed) {
          return { invalidDateRange: true };
        }
      }

      return null;
    };
  }

  updateErrorStates(): void {
    this.isExpired = this.itemForm.hasError('expired');
    this.isInvalidDateRange = this.itemForm.hasError('invalidDateRange');
  }

  onClickCancelButton(): void {
    this.route.navigate(['/home']);
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const formValues = this.itemForm.value;
      const newItem: Product = {
        nome: formValues.name,
        unidadeMedida: formValues.unity,
        quantidade: formValues.quantity,
        preco: formValues.price,
        produtoPerecivel: formValues.perishable_product,
        dataValidade: this.datePipe.transform(formValues.validate_date),
        dataFabricacao: this.datePipe.transform(formValues.initial_date)
      };

      const saveOperation = this.isEditing && this.currentItemIndex !== null
        ? this.productService.updateItem(this.currentItemIndex, newItem)
        : this.productService.addItem(newItem);

      saveOperation.pipe(
        switchMap(() => of(this.route.navigate(['/home']))),
        catchError(error => {
          this.toastr.error('Erro ao salvar o item.', 'Erro');
          return of(null);
        })
      ).subscribe(() => {
        this.toastr.success('Item salvo com sucesso!', 'Sucesso');
      });

    } else {
      this.toastr.error('Formulário inválido', 'Erro');
    }
  }

  loadItemData(index: number): void {
    this.productService.getItem().pipe(
      switchMap(items => {
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
        return of(null);
      }),
      catchError(error => {
        this.toastr.error('Erro ao carregar os dados do item.', 'Erro');
        return of(null);
      })
    ).subscribe();
  }
}
