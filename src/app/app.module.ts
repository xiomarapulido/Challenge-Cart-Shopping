import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { ContentComponent } from './component/content/content.component';
import { FilterComponent } from './component/filter/filter.component';
import { BodyComponent } from './component/body/body.component';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import { DetailShoppingComponent } from './component/detail-shopping/detail-shopping.component';
import { CartShoppingService } from './service/cart-shopping.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FilterComponent,
    BodyComponent,
    DetailProductComponent,
    DetailShoppingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    CartShoppingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
