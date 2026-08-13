import { IProduct } from "../../../types";
import { Card, ICardActions } from "./Card";

export type TCardCatalog = Pick<IProduct, "category" | "title" | "image" | "price">;

export class CardCatalog extends Card<TCardCatalog> {

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }
}
