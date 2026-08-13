import { IProduct } from "../../../types";
import { Card, ICardActions } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { categoryMap } from "../../../utils/constants";

type CategoryKey = keyof typeof categoryMap;

export type TCardCatalog = Omit<
  Pick<IProduct, "category" | "title" | "image" | "price">,
  "image"
> & {
  image: { src: string; alt: string };
};

export class CardCatalog extends Card<TCardCatalog> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
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

  set image(value: { src: string; alt: string }) {
    if (!this.imageElement) return;
    this.setImage(this.imageElement, value.src, value.alt);
  }
}
