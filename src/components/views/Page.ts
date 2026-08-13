import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IPage {
  items: HTMLElement[];
}

export class Page extends Component<IPage> {
  protected galleryElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.galleryElement = ensureElement<HTMLElement>(
      ".gallery",
      this.container,
    );
  }

  set items(value: HTMLElement[]) {
    this.galleryElement.replaceChildren(...value);
  }
}
