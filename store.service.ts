import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {
  products = [
    { id: 1, name: 'Wireless Earbuds', price: 3499 },
    { id: 2, name: 'Power Bank', price: 2999 },
    { id: 3, name: 'Smart Watch', price: 4999 },
    { id: 4, name: 'Bluetooth Speaker', price: 2499 },
  ];

  cart = [];
  orders = [];

  getProducts() {
    return this.products;
  }

  getProduct(id: number) {
    return this.products.find(p => p.id === id) || { message: 'Product not found' };
  }

  addProduct(body: any) {
    const product = { id: Date.now(), name: body.name, price: Number(body.price) };
    this.products.push(product);
    return product;
  }

  updateProduct(id: number, body: any) {
    const product = this.products.find(p => p.id === id);
    if (!product) return { message: 'Product not found' };
    if (body.name !== undefined) product.name = body.name;
    if (body.price !== undefined) product.price = Number(body.price);
    return product;
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    return { message: 'Product deleted' };
  }

  getCart() {
    return this.cart;
  }

  addToCart(body: any) {
    const product = this.products.find(p => p.id === Number(body.productId));
    if (!product) return { message: 'Product not found' };
    const item = this.cart.find(p => p.id === product.id);
    if (item) item.quantity++;
    else this.cart.push({ ...product, quantity: 1 });
    return this.cart;
  }

  editCart(id: number, body: any) {
    const item = this.cart.find(p => p.id === id);
    if (!item) return { message: 'Item not found' };
    item.quantity = Number(body.quantity);
    return this.cart;
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(p => p.id !== id);
    return this.cart;
  }

  checkout(body: any) {
    if (this.cart.length === 0) return { message: 'Cart is empty' };
    const total = this.cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const order = { id: Date.now(), customer: body.name, address: body.address, items: [...this.cart], total };
    this.orders.push(order);
    this.cart = [];
    return order;
  }

  getOrders() {
    return this.orders;
  }
}
