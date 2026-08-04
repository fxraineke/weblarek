import { IProduct } from "../../types";

export class Cart {
  private products: IProduct[] = [];

  public getProducts(): IProduct[] {
    return this.products;
  }

  public addProduct(product: IProduct): void {
    if (this.hasProduct(product.id) || product.price === null) {
      return;
    }
    this.products.push(product);
  }

  public removeProductById(id: string): void {
    this.products = this.products.filter((product) => product.id !== id);
  }

  public clearCart(): void {
    this.products = [];
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
}
