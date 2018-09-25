import { Component, OnInit } from '@angular/core';
import { CartShoppingService } from '../../service/cart-shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  readonly TITLE = 'El Baratón';

  constructor(private cartShoppingService: CartShoppingService) { }

  ngOnInit() {

  }

  cartOpen(){
    this.cartShoppingService.refreshCart();
  }

}
