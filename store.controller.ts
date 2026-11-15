import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller()
export class StoreController {
  constructor(private readonly store: StoreService) {}

  @Get()
  home() { return { message: 'Welcome to ApnaCart API' }; }

  @Get('products')
  products() { return this.store.getProducts(); }

  @Get('products/:id')
  product(@Param('id') id: string) { return this.store.getProduct(Number(id)); }

  @Post('products')
  addProduct(@Body() body: any) { return this.store.addProduct(body); }

  @Put('products/:id')
  updateProduct(@Param('id') id: string, @Body() body: any) {
    return this.store.updateProduct(Number(id), body);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) { return this.store.deleteProduct(Number(id)); }

  @Get('cart')
  cart() { return this.store.getCart(); }

  @Post('cart')
  addCart(@Body() body: any) { return this.store.addToCart(body); }

  @Put('cart/:id')
  editCart(@Param('id') id: string, @Body() body: any) {
    return this.store.editCart(Number(id), body);
  }

  @Delete('cart/:id')
  removeCart(@Param('id') id: string) { return this.store.removeFromCart(Number(id)); }

  @Post('checkout')
  checkout(@Body() body: any) { return this.store.checkout(body); }

  @Get('orders')
  orders() { return this.store.getOrders(); }
}
