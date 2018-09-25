import { Component, OnInit } from '@angular/core';
import { CartShoppingService } from '../../service/cart-shopping.service';
import { Products } from '../../model/products';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  readonly DETAILS = 'Ver más..';
  readonly AVAILABILITY = 'Disponible';
  readonly QUANTITY = 'Cantidad';
  readonly PRICE = 'Precio';

  public products: Products[] = [];
  public tempProducts: Array<Products> = [];

  constructor(private cartShoppingService: CartShoppingService) { }

  ngOnInit() {
    this.getProducts();

  }

  getProducts() {
    this.cartShoppingService.getProducts().subscribe((data => { this.products = data;}));
  }

  viewProduct(product: Products) {
    let setAlert: string = 'true';
    this.cartShoppingService.setviewProduct(product);
    this.cartShoppingService.setviewAlert(setAlert);
  }

}
