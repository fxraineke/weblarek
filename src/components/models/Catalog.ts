import { IProduct } from "../../types";

export class Catalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  public setProducts(products: IProduct[]): void {
    this.products = products;
    this.selectedProduct = null;
  }

  public getProducts(): IProduct[] {
    return this.products;
  }

  public getProduct(id: string): IProduct | null {
    return this.products.find((p) => p.id === id) ?? null;
  }

  public setSelectedProduct(product: IProduct | null): void {
    this.selectedProduct = product ?? null;
  }

  public getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }

  public clearSelectedProduct(): void {
    this.selectedProduct = null;
  }
}
