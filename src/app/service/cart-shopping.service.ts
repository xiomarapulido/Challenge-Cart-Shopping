import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { map, filter, scan } from 'rxjs/operators';
import { Products } from '../model/products';
import { Filter } from '../model/filter';

@Injectable()
export class CartShoppingService {

  viewProduct: Subject<any> = new Subject<any>();
  viewAlert: Subject<any> = new Subject<any>();
  totalValue: Subject<number> = new Subject<number>();
  productsSubject: Subject<any> = new Subject<any>();
  productsObservable: Observable<Products[]>;

  filtersSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  filters$ = this.filtersSubject.asObservable();

  refreshCartSubject: Subject<any> = new Subject<any>();
  refreshCart$ = this.refreshCartSubject.asObservable();

  constructor(private http: HttpClient) { }

  public filtersEmiter(filters: Array<any>) {
    this.filtersSubject.next(filters);
  }

  public refreshCart() {
    this.refreshCartSubject.next();
  }

  public getCategories(): Observable<any> {
    return this.http.get('../assets/data/categories.json');
  }

  public getProducts(filter?: Filter[]): Observable<any> {
    this.getProductsFilter(filter);
    return this.productsSubject;
  }

  public sharedProducts(filterName?: string) {
    filterName = filterName || '';
    this.productsObservable
      .pipe(
        map((products) => products.filter((product) => product.name.toUpperCase().indexOf(filterName.toUpperCase()) >= 0))
      )
      .subscribe((products) => this.productsSubject.next(products));
  }


  public getProductsFilter(filters?: Filter[]) {
    this.productsObservable = this.http.get('../assets/data/products.json')
      .pipe(
        map((res: any) => res.products)
      );

    if (filters) {
      filters.forEach((filter) => {

        if (filter.value === 'sublevel_id') {
          if (filter.name === '-1') {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.filter((product) => product.sublevel_id))
              );
          } else {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.filter((product) => product.sublevel_id == filter.name))
              );
          }

          this.productsObservable.subscribe((products) => this.productsSubject.next(products));
        }

        if (filter.value === 'available') {
          if (filter.name === '1') {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.filter((product) => product.available === true))
              );
          }

          if (filter.name === '0') {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.filter((product) => product.available === false))
              );
          }

          if (filter.name === '-1') {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.filter((product) => product.available))
              );
          }

          this.productsObservable.subscribe((products) => this.productsSubject.next(products));
        }

        if (filter.value === 'quantity') {
          
          if (filter.name === '-1' || filter.name == null) {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.filter((product) => product.quantity))
              );
          } else {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.filter((product) => product.quantity == filter.name))
              );
          }

          this.productsObservable.subscribe((products) => this.productsSubject.next(products));

        }

        if (filter.value === 'minPrice') {
          if (filter.name === '-1') {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.filter((product) => product.price))
              );

            this.productsObservable.subscribe((products) => this.productsSubject.next(products));

          }
          else {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.filter((product) => parseInt(product.price.replace('$', '')) > parseInt(filter.name)))
              );

            this.productsObservable.subscribe((products) => this.productsSubject.next(products));

          }
        }

        if (filter.value === 'maxPrice') {
          if (filter.name === '-1') {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.filter((product) => product.price))
              );

            this.productsObservable.subscribe((products) => this.productsSubject.next(products));

          }
          else {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.filter((product) => parseInt(product.price.replace('$', '')) < parseInt(filter.name)))
              );

            this.productsObservable.subscribe((products) => this.productsSubject.next(products));

          }
        }

        if (filter.value === 'order') {
          if (filter.name === 'available') {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.sort( p => p.available? 1:0))
              );

            this.productsObservable.subscribe((products) => this.productsSubject.next(products));

          }
         
        }

        if (filter.value === 'order') {
          if (filter.name === 'quantity') {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.sort( (a, b) => (+a.quantity - +b.quantity)))
              );

            this.productsObservable.subscribe((products) => this.productsSubject.next(products));

          }         
        }

        if (filter.value === 'order') {
          if (filter.name === 'price') {
            this.productsObservable = this.productsObservable
              .pipe(
                map((products) => products.sort( (a, b) => (+a.price.replace('$', '').replace(',', '') - +b.price.replace('$', '').replace(',', ''))))
              );

            this.productsObservable.subscribe((products) => this.productsSubject.next(products));

          }         
        }

      });
    }
    else {
      this.productsObservable.subscribe((products) => this.productsSubject.next(products));
    }
  }



  setviewProduct(product: Products) {
    return this.viewProduct.next(product);
  }

  getviewAlert() {
    return this.viewAlert;
  }

  setviewAlert(action: string) {
    return this.viewAlert.next(action);
  }

  getviewProduct() {
    return this.viewProduct;
  }

  getTotalValue(step: number): Observable<number> {
    this.totalValue.next(step);
    return this.totalValue;
  }

}

