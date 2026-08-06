import { IProduct } from "../../types";

export class Catalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  public setProducts(products: IProduct[]): void {
    this.products = products;
  }

  public getProducts(): IProduct[] {
    return this.products;
  }

  public getProduct(id: string): IProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  public setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  public getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
