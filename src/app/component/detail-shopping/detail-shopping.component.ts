import { Component, OnInit } from '@angular/core';
import { Products } from '../../model/products';
import { CartShoppingService } from '../../service/cart-shopping.service';

@Component({
  selector: 'app-detail-shopping',
  templateUrl: './detail-shopping.component.html',
  styleUrls: ['./detail-shopping.component.scss']
})
export class DetailShoppingComponent implements OnInit {

  readonly PRICE = 'Valor unitario';
  readonly TOTALPRICE = 'Valor total';
  readonly YOURPRODUCTS = 'Tus Productos';
  readonly PRODUCT = 'Producto';
  readonly QUANTITY = 'Cantidad';
  readonly DELETE = 'Eliminar';
  readonly TOTALPURCHASE = 'Valor total de la compra';
  readonly BUY = 'Comprar';
  readonly NOPRODUCTS ='*No se han agregado productos al carrito de compras'
  readonly BUYSUCCESS ='!Tu compra fue realizada correcta mente'

  public productOnCart: any[] = [];
  public quantity: number;
  public priceItem: number;
  public showAlert: string = 'false';

  constructor(private cartShoppingService: CartShoppingService) { }

  ngOnInit() {
    this.getJsonStorage();
    this.refreshCart();
  }

  getJsonStorage() {
    if (localStorage.getItem("shoppingCart")) {
      this.productOnCart = JSON.parse(localStorage.getItem("shoppingCart"));
    }
    else {
      this.productOnCart = [];
    }
    
  }

  refreshCart() {
    this.cartShoppingService.refreshCart$.subscribe(() => {
      this.getJsonStorage();
    });
  }

  deleteToCart(product: Products): void {    
    this.productOnCart = this.productOnCart.filter(item => item.id != product.id);
    localStorage.setItem("shoppingCart", JSON.stringify(this.productOnCart));
    this.getJsonStorage();   
  }

  deleteCart(): void {    
    localStorage.clear();
    this.getJsonStorage(); 
    this.showAlert = 'true';  
  }

}
