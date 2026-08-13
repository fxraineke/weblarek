import { IBuyer, TPayment } from "../../types";
import { IEvents } from "../base/Events";

type TErrors = Partial<Record<keyof IBuyer, string>>;

export class Buyer implements IBuyer {
  private _payment: TPayment = "";
  private _address: string = "";
  private _email: string = "";
  private _phone: string = "";

  constructor(private events: IEvents) {}

  get payment(): TPayment {
    return this._payment;
  }
  set payment(value: TPayment) {
    if (this._payment === value) return;
    this._payment = value;
    this.emitChanged();
  }

  get address(): string {
    return this._address;
  }
  set address(value: string) {
    if (this._address === value) return;
    this._address = value;
    this.emitChanged();
  }

  get email(): string {
    return this._email;
  }
  set email(value: string) {
    if (this._email === value) return;
    this._email = value;
    this.emitChanged();
  }

  get phone(): string {
    return this._phone;
  }
  set phone(value: string) {
    if (this._phone === value) return;
    this._phone = value;
    this.emitChanged();
  }

  public getBuyer(): IBuyer {
    return {
      payment: this._payment,
      address: this._address,
      email: this._email,
      phone: this._phone,
    };
  }

  public clearBuyer(): void {
    if (!this._payment && !this._address && !this._email && !this._phone) return;
    this._payment = "";
    this._address = "";
    this._email = "";
    this._phone = "";
    this.emitChanged();
  }

  public validate(): TErrors {
    const errors: TErrors = {};

    if (!this.payment) {
      errors.payment = "Необходимо выбрать тип оплаты";
    }

    if (!this.address) {
      errors.address = "Необходимо указать адрес";
    }

    if (!this.phone) {
      errors.phone = "Необходимо указать телефон";
    }

    if (!this.email) {
      errors.email = "Необходимо указать email";
    }

    return errors;
  }

  private emitChanged(): void {
    this.events.emit<{ buyer: IBuyer; errors: TErrors }>("buyer:changed", {
      buyer: this.getBuyer(),
      errors: this.validate(),
    });
  }
}
