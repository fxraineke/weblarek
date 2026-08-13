import { IBuyer } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Form, IFormActions } from "./Form";

export type TContacts = Pick<IBuyer, "email" | "phone">;

export class ContactsForm extends Form<TContacts> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, actions?: IFormActions) {
    super(container, actions);

    this.emailInput = ensureElement<HTMLInputElement>(
      'input[name=email]',
      this.container,
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      'input[name=phone]',
      this.container,
    );
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}
