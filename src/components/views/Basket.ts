import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface IBasketActions {
  onClick: () => void;
}

interface IBasket {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasket> {
  protected listElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IBasketActions) {
    super(container);

    this.listElement = ensureElement<HTMLElement>(
      ".basket__list",
      this.container,
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );

    if (actions?.onClick) {
      this.buttonElement.addEventListener("click", actions.onClick);
    }
  }

  set items(value: HTMLElement[]) {
    this.listElement.replaceChildren(...value);
    this.buttonElement.disabled = value.length === 0;
  }

  set total(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }
}
