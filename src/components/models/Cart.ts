import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
  private products: IProduct[] = [];

  constructor(private events: IEvents) {}

  public getProducts(): IProduct[] {
    return this.products;
  }

  public addProduct(product: IProduct): void {
    if (this.hasProduct(product.id) || product.price === null) {
      return;
    }
    this.products.push(product);
    this.emitChanged();
  }

  public removeProductById(id: string): void {
    if (!this.hasProduct(id)) return;
    this.products = this.products.filter((product) => product.id !== id);
    this.emitChanged();
  }

  public clearCart(): void {
    if (this.products.length === 0) return;
    this.products = [];
    this.emitChanged();
  }

  public getCount(): number {
    return this.products.length;
  }

  public getTotal(): number {
    return this.products.reduce(
      (sum, product) => sum + (product.price ?? 0),
      0,
    );
  }

  public hasProduct(id: string): boolean {
    return this.products.some((product) => product.id === id);
  }

  private emitChanged(): void {
    this.events.emit<{ products: IProduct[]; count: number; total: number }>(
      "cart:changed",
      {
        products: this.products,
        count: this.getCount(),
        total: this.getTotal(),
      },
    );
  }
}
