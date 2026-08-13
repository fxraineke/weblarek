import { IProduct } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

type CategoryKey = keyof typeof categoryMap;

export interface ICardActions {
  onClick: () => void;
}

export abstract class Card<T extends Partial<IProduct>> extends Component<T> {
  protected imageElement: HTMLImageElement | null;
  protected categoryElement: HTMLElement | null;
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.imageElement =
      container.querySelector<HTMLImageElement>(".card__image");
    this.categoryElement =
      container.querySelector<HTMLElement>(".card__category");
    this.titleElement = ensureElement<HTMLElement>(
      ".card__title",
      this.container,
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".card__price",
      this.container,
    );
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set category(value: string) {
    if (!this.categoryElement) return;
    this.categoryElement.textContent = value;
    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value,
      );
    }
  }

  set image(value: string) {
    if (!this.imageElement) return;
    this.setImage(
      this.imageElement,
      value,
      this.titleElement.textContent ?? "",
    );
  }

  set price(value: number | null) {
    this.priceElement.textContent =
      value === null ? "Бесценно" : `${value} синапсов`;
  }
}
