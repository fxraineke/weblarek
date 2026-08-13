import { IBuyer, TPayment } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Form, IFormActions } from "./Form";

export type TOrder = Pick<IBuyer, "payment" | "address">;

export interface IOrderActions extends IFormActions {
  onClick: (payment: TPayment) => void;
}

export class OrderForm extends Form<TOrder> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLElement, actions?: IOrderActions) {
    super(container, actions);

    this.cardButton = ensureElement<HTMLButtonElement>(
      'button[name=card]',
      this.container,
    );
    this.cashButton = ensureElement<HTMLButtonElement>(
      'button[name=cash]',
      this.container,
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name=address]',
      this.container,
    );

    this.cardButton.addEventListener("click", () => {
      actions?.onClick?.("card");
    });
    this.cashButton.addEventListener("click", () => {
      actions?.onClick?.("cash");
    });
  }

  set payment(value: TPayment) {
    this.cardButton.classList.toggle("button_alt-active", value === "card");
    this.cashButton.classList.toggle("button_alt-active", value === "cash");
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}
