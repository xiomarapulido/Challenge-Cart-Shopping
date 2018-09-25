import { Component, OnInit, ElementRef } from '@angular/core';
import { CartShoppingService } from '../../service/cart-shopping.service';
import { Products } from '../../model/products';
import { ProductsDetail } from '../../model/productDetail';


declare var jQuery: any;

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  readonly AVAILABILITY = 'Disponible';
  readonly QUANTITYSTOCK = 'Cantidad en stock';
  readonly QUANTITY = 'Cantidad a comprar';
  readonly PRICE = 'Precio unitario';
  readonly TOTALPRICE = 'Valor total';
  readonly ADDCART = 'Añadir al carrito';
  readonly NOTAVAILABLE = '*El producto no se encuentra disponible en el momento';
  readonly SUCCESS = 'El producto fue añadido al carrito correctamente'

  public quantity: number = 1;
  public product: Products;
  public price: number;
  public seeModal: string = 'true';
  public productsDetail: ProductsDetail[] = [];
  //public productOnCart: Products[] = [];
  public productOnCart: any[] = [];

  constructor(private cartShoppingService: CartShoppingService) { }

  ngOnInit() {
    this.loadingProduct();
  }

  loadingProduct() {
    this.cartShoppingService.getviewProduct().subscribe((data: any) => {
      this.product = data;
      this.price = data.price.replace('$', '').replace(',', '');
    });

    this.cartShoppingService.getviewAlert().subscribe((data: any) => {
      this.seeModal = data;
    });
  }

  addToCart(product: Products): void {
    this.productOnCart = this.productOnCart.filter(item => item.id != product.id);
    //this.productOnCart.push(product);

    this.productOnCart.push({ id: product.id, name: product.name, price: this.price, quantity: this.quantity, priceUnit: product.price });

    this.setJsonStorage();


    this.seeModal = 'false';
  }

  setJsonStorage() {
    if (this.productOnCart) {
      localStorage.setItem("shoppingCart", JSON.stringify(this.productOnCart));
    }
  }









}
