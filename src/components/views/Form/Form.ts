import { IBuyer } from "../../../types";
import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

export interface IFormActions {
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

export abstract class Form<T extends Partial<IBuyer>> extends Component<T> {
  protected errorsElement: HTMLElement;
  protected submitButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected actions?: IFormActions,
  ) {
    super(container);

    this.errorsElement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );
    this.submitButton = ensureElement<HTMLButtonElement>(
      "button[type=submit]",
      this.container,
    );

    this.container.addEventListener("input", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      this.actions?.onChange?.(target.name, target.value);
    });
    this.container.addEventListener("submit", (e) => {
      e.preventDefault();
      this.actions?.onSubmit?.();
    });
  }

  set errors(value: string) {
    this.errorsElement.textContent = value;
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }
}
