import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Card, ICardActions } from "./Card";

export type TCardPreview = Pick<
  IProduct,
  "image" | "category" | "title" | "description" | "price"
> & { inCart: boolean };

export class CardPreview extends Card<TCardPreview> {
  protected textElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.textElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );

    if (actions?.onClick) {
      this.buttonElement.addEventListener("click", actions.onClick);
    }
  }

  set description(value: string) {
    this.textElement.textContent = value;
  }

  set inCart(value: boolean) {
    const available = this.priceElement.textContent !== "Бесценно";
    if (!available) return;
    this.buttonElement.textContent = value ? "Удалить из корзины" : "В корзину";
  }

  set price(value: number | null) {
    super.price = value;
    const available = value !== null;
    this.buttonElement.disabled = !available;
    this.buttonElement.textContent = available ? "В корзину" : "Недоступно";
  }
}
