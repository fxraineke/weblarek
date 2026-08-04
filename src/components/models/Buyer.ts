import { IBuyer, TPayment } from "../../types";

export class Buyer implements IBuyer {
  public payment: TPayment = "";
  public address: string = "";
  public email: string = "";
  public phone: string = "";

  // установить тип оплаты
  public setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  // установить адрес
  public setAddress(address: string): void {
    this.address = address;
  }

  // установить email
  public setEmail(email: string): void {
    this.email = email;
  }

  // установить телефон
  public setPhone(phone: string): void {
    this.phone = phone;
  }

  // получить данные покупателя
  public getBuyer(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  // очистить данные покупателя
  public clearBuyer(): void {
    this.payment = "";
    this.address = "";
    this.email = "";
    this.phone = "";
  }

  // валидация данных покупателя
  public validate(): {
    payment?: string;
    address?: string;
    phone?: string;
    email?: string;
  } {
    let errors: {
      payment?: string;
      address?: string;
      phone?: string;
      email?: string;
    } = {};

    if (!this.payment) {
      errors.payment = "Необходимо выбрать тип оплаты";
    }

    if (!this.address) {
      errors.address = "Необходимо указать адрес";
    } else if (this.address.length < 10) {
      errors.address = "Неверный формат адреса (минимум 10 символов)";
    }

    if (!this.phone) {
      errors.phone = "Необходимо указать телефон";
    } else if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(this.phone)) {
      errors.phone = "Неверный формат телефона (+7 (XXX) XXX-XX-XX)";
    }

    if (!this.email) {
      errors.email = "Необходимо указать email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.email = "Неверный формат email (example@example.com)";
    }

    return errors;
  }

  // проверка валидности всех данных покупателя
  public isValid(): boolean {
    return Object.keys(this.validate()).length === 0;
  }
}
