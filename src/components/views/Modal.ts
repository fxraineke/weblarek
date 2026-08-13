import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface IModalData {
  content: HTMLElement;
}

export interface IModalActions {
  onClick: () => void;
}

export class Modal extends Component<IModalData> {
  protected closeButton: HTMLButtonElement;
  protected contentElement: HTMLElement;

  constructor(container: HTMLElement, actions?: IModalActions) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container,
    );
    this.contentElement = ensureElement<HTMLElement>(
      ".modal__content",
      this.container,
    );

    if (actions?.onClick) {
      this.closeButton.addEventListener("click", actions.onClick);
      this._handleClose = actions.onClick;
    }
    this.container.addEventListener("click", (e) => {
      if (e.target === this.container) this._handleClose?.();
    });
  }

  private _handleClose?: () => void;

  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }

  protected _toggleModal(state: boolean) {
    this.container.classList.toggle("modal_active", state);
  }

  open() {
    this._toggleModal(true);
  }

  close() {
    this._toggleModal(false);
  }
}
