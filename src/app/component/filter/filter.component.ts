import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { CartShoppingService } from '../../service/cart-shopping.service';
import { Category } from '../../model/category';
import { Filter } from '../../model/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          animate(200)
        ]),
        transition(':leave', [
          animate(200)
        ])
      ]
    )
  ]
})

export class FilterComponent implements OnInit {

  readonly CATEGORIES = 'Categorías';
  readonly AVAILABILITY = 'Disponibilidad';
  readonly QUANTITY = 'Cantidad en stock';
  readonly ALL = 'Todos';
  readonly STARTPRICE = 'Precio desde';
  readonly FINISHPRICE = 'Precio hasta';
  readonly PRICERANGE = 'Rango de precios';
  readonly SEARCH = 'search';
  readonly FINDPRODUCT = 'Buscar un producto';
  readonly PRODUCTS = "Productos";
  readonly ORDER = 'Ordenar por';
  readonly RANGEPRICE ='*El rango de precios seleccionado no es correcto'

  public minPrice: string = '0';
  public maxPrice: string = '0';

  public filters: Array<any> = [];
  public category: Array<Category> = [];
  public orderBy: Filter[] = [];
  public available: Filter[] = [];

  public categorySelected: string = '-1';
  public orderBySelected: string = '-1';
  public searchSelected: string = '';
  public availableSelected: string = '-1';
  public quantitySelected: string = '';
  public filtersProducts: Filter[] = [];
  public indexFilter: any; 

  constructor(private cartShoppingService: CartShoppingService) { }

  ngOnInit() {
    this.getFilterCategory();
    this.getFilterOrder();
    this.getFilterAvailable();
  }

  getFilterCategory() {

    this.cartShoppingService.getCategories().subscribe(({ categories }) => {
      this.category = categories;
    });
  }

  getFilterOrder() {
    this.orderBy.push({ value: 'price', name: 'Precio' });
    this.orderBy.push({ value: 'available', name: 'Disponibilidad' });
    this.orderBy.push({ value: 'quantity', name: 'Cantidad' });
  }

  getFilterAvailable() {
    this.available.push({ value: '1', name: 'Disponibles' });
    this.available.push({ value: '0', name: 'Agotados' });
  }

  addFilter(filterValue: string, filterName: string) {
    this.indexFilter = null;
    this.indexFilter = this.filtersProducts.findIndex(fil => fil.value === filterValue);
    if(this.indexFilter != '-1'){
      this.filtersProducts.splice(this.indexFilter, 1);
    }

    this.filtersProducts.push({value: filterValue, name: filterName});
    this.cartShoppingService.getProductsFilter(this.filtersProducts);
  }

  filterProduct() {
    this.cartShoppingService.sharedProducts(this.searchSelected);
  }

}
