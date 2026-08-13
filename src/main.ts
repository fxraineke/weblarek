import "./scss/styles.scss";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { Catalog } from "./components/models/Catalog";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { WebLarekApi } from "./components/WebLarekApi";
import { API_URL, CDN_URL } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { CardCatalog } from "./components/views/Card/CardCatalog";
import { CardPreview } from "./components/views/Card/CardPreview";
import { CardBasket } from "./components/views/Card/CardBasket";
import { Basket } from "./components/views/Basket";
import { Modal } from "./components/views/Modal";
import { Page } from "./components/views/Page";
import { Header } from "./components/views/Header";
import { OrderForm } from "./components/views/Form/OrderForm";
import { ContactsForm } from "./components/views/Form/ContactsForm";
import { Success } from "./components/views/Success";
import { IProduct, IOrderRequest } from "./types";

// брокер событий
const events = new EventEmitter();

// слой данных (Models)
const api = new WebLarekApi(new Api(API_URL));
const catalogModel = new Catalog(events);
const cartModel = new Cart(events);
const buyerModel = new Buyer(events);

// слой представления (Views)
// статические
const page = new Page(document.body);
const header = new Header(ensureElement<HTMLElement>(".header"), {
  onClick: () => events.emit("ui:basket-open"),
});
const modal = new Modal(ensureElement<HTMLElement>("#modal-container"), {
  onClick: () => events.emit("ui:modal-close"),
});

// слой представления (Views)
// шаблонные (template)
const basketView = new Basket(cloneTemplate<HTMLElement>("#basket"), {
  onClick: () => events.emit("ui:order-open"),
});
basketView.items = [];
const orderForm = new OrderForm(cloneTemplate<HTMLElement>("#order"), {
  onClick: (payment) => events.emit("ui:payment-select", { payment }),
  onChange: (field, value) => events.emit("ui:form-change", { field, value }),
  onSubmit: () => events.emit("ui:order-next"),
});
const contactsForm = new ContactsForm(cloneTemplate<HTMLElement>("#contacts"), {
  onChange: (field, value) => events.emit("ui:form-change", { field, value }),
  onSubmit: () => events.emit("ui:contacts-submit"),
});
const successView = new Success(cloneTemplate<HTMLElement>("#success"), {
  onClick: () => events.emit("ui:modal-close"),
});

// фабрики карточек
const cardCatalogFactory = (product: IProduct): HTMLElement =>
  new CardCatalog(cloneTemplate<HTMLElement>("#card-catalog"), {
    onClick: () => events.emit("ui:card-select", { id: product.id }),
  }).render({ ...product, image: CDN_URL + product.image });

const cardPreviewFactory = (product: IProduct, inCart: boolean): HTMLElement =>
  new CardPreview(cloneTemplate<HTMLElement>("#card-preview"), {
    onClick: () => events.emit("ui:card-buy", { id: product.id }),
  }).render({ ...product, image: CDN_URL + product.image, inCart });

const cardBasketFactory = (product: IProduct, index: number): HTMLElement =>
  new CardBasket(cloneTemplate<HTMLElement>("#card-basket"), {
    onClick: () => events.emit("ui:cart-remove", { id: product.id }),
  }).render({ title: product.title, price: product.price, index });

// презентер
// события моделей

// catalog:changed - каталог товаров обновлён
events.on<{ products: IProduct[] }>("catalog:changed", ({ products }) => {
  page.items = products.map(cardCatalogFactory);
});

// cart:changed - корзина изменилась
events.on<{ products: IProduct[]; count: number; total: number }>(
  "cart:changed",
  ({ products, count, total }) => {
    header.counter = count;
    basketView.items = products.map((p, i) => cardBasketFactory(p, i + 1));
    basketView.total = total;
  },
);

// buyer:changed - данные покупателя изменились
events.on<{
  buyer: typeof buyerModel;
  errors: Record<string, string | undefined>;
}>("buyer:changed", ({ errors }) => {
  const orderErrors = [errors.payment, errors.address]
    .filter(Boolean)
    .join("; ");
  const contactsErrors = [errors.email, errors.phone]
    .filter(Boolean)
    .join("; ");

  orderForm.errors = orderErrors;
  orderForm.valid = !errors.payment && !errors.address;

  contactsForm.errors = contactsErrors;
  contactsForm.valid = !errors.email && !errors.phone;
});

// события от представлений

// ui:card-select - выбор карточки товара
events.on<{ id: string }>("ui:card-select", ({ id }) => {
  const product = catalogModel.getProduct(id);
  if (!product) return;
  catalogModel.setSelectedProduct(product);
  modal.content = cardPreviewFactory(product, cartModel.hasProduct(id));
  modal.open();
});

// ui:card-buy - добавление или удаление товара из корзины на карточке товара
events.on<{ id: string }>("ui:card-buy", ({ id }) => {
  const product = catalogModel.getProduct(id);
  if (!product) return;
  if (cartModel.hasProduct(id)) {
    cartModel.removeProductById(id);
  } else {
    cartModel.addProduct(product);
  }
  modal.content = cardPreviewFactory(product, cartModel.hasProduct(id));
});

// ui:cart-remove - удаление товара из корзины
events.on<{ id: string }>("ui:cart-remove", ({ id }) => {
  cartModel.removeProductById(id);
});

// ui:basket-open - открытие корзины
events.on("ui:basket-open", () => {
  modal.content = basketView.render();
  modal.open();
});

// ui:order-open - нажатие кнопки оформления заказа
events.on("ui:order-open", () => {
  modal.content = orderForm.render({
    payment: buyerModel.payment,
    address: buyerModel.address,
  });
  modal.open();
});

// ui:payment-select — выбор способа оплаты
events.on<{ payment: string }>("ui:payment-select", ({ payment }) => {
  buyerModel.payment = payment as "card" | "cash";
  orderForm.payment = payment as "card" | "cash";
});

// ui:form-change — изменение данных в формах
events.on<{ field: string; value: string }>(
  "ui:form-change",
  ({ field, value }) => {
    if (field === "address") buyerModel.address = value;
    if (field === "email") buyerModel.email = value;
    if (field === "phone") buyerModel.phone = value;
  },
);

// ui:order-next - переход ко второй форме оформления заказа
events.on("ui:order-next", () => {
  const errors = buyerModel.validate();
  if (errors.payment || errors.address) return;
  modal.content = contactsForm.render({
    email: buyerModel.email,
    phone: buyerModel.phone,
  });
  modal.open();
});

// ui:contacts-submit - завершение оформления заказа
events.on("ui:contacts-submit", () => {
  const errors = buyerModel.validate();
  if (errors.payment || errors.address || errors.email || errors.phone) return;

  const order: IOrderRequest = {
    ...buyerModel.getBuyer(),
    total: cartModel.getTotal(),
    items: cartModel.getProducts().map((p) => p.id),
  };

  api
    .postOrder(order)
    .then((response) => {
      cartModel.clearCart();
      buyerModel.clearBuyer();
      modal.content = successView.render({ total: response.total });
      modal.open();
    })
    .catch((err) => console.error("Ошибка оформления заказа:", err));
});

// ui:modal-close - закрытие модального окна
events.on("ui:modal-close", () => {
  modal.close();
});

// загрузка каталога
api
  .getProducts()
  .then((response) => catalogModel.setProducts(response.items))
  .catch((err) => console.error("Ошибка загрузки каталога:", err));
