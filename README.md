# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

#### Данные

Товар:
* идентификатор (`id`): строка (`string`)
* описание (`description`): строка (`string`)
* изображение (`image`): строка (`string`)
* название (`title`): строка (`string`)
* категория (`category`): строка (`string`) 
* цена (`price`): число (`number`) | `null`

Покупатель:
* оплата (`payment`): онлайн (`card`) | при получении (`cash`) | `""`
* почта (`email`): строка (`string`)
* телефон (`phone`): строка (`string`)
* адрес (`address`): строка (`string`)

Единый интерфейс для товара, который используется в каталоге и корзине.
```
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

Тип оплаты для интерфейса покупателя.
```
export type TPayment = typeof PAYMENTS[number];
```

Интерфейс данных покупателя.
```
interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  }
```

#### Модели данных

Класс `Catalog` (Каталог).
```
class Catalog {

  // приватное наполнение каталога
  private products: IProduct[] = [];
  // приватное хранение выбранного товара
  private selectedProduct: IProduct | null = null;

  constructor(private events: IEvents) {}

  // установить товары каталога
  public setProducts(products: IProduct[]): void {
    this.products = products;
    // вызвать событие изменения каталога
    this.events.emit<{ products: IProduct[] }>("catalog:changed", {
      products: this.products,
    });
  }

  // получить товары каталога
  public getProducts(): IProduct[] {
    return this.products;
  }

  // получить товар по id
  public getProduct(id: string): IProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  // установить выбранный товар
  public setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
    // вызвать событие выбора товара
    this.events.emit<{ product: IProduct }>("catalog:select", {
      product: this.selectedProduct,
    });
  }

  // получить выбранный товар
  public getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
```

Класс `Cart` (Корзина).
```
class Cart {

  // приватное наполнение корзины
  private products: IProduct[] = [];

  constructor(private events: IEvents) {}

  // получить товары в корзине
  public getProducts(): IProduct[] {
    return this.products;
  }

  // Добавить товар в корзину
  public addProduct(product: IProduct): void {
    // если товар уже есть в корзине или его цена равна null, то ничего не делаем
    if (this.hasProduct(product.id) || product.price === null) {
      return;
    }
    this.products.push(product);
    // вызываем событие изменения корзины
    this.emitChanged();
  }

  // удалить товар из корзины по id
  public removeProductById(id: string): void {
    // если товара нет в корзине, то ничего не делаем
    if (!this.hasProduct(id)) return;
    this.products = this.products.filter(product => product.id !== id);
    this.emitChanged();
  }
  
  // очистить корзину
  public clearCart(): void {
    // если корзина пуста, то ничего не делаем
    if (this.products.length === 0) return;
    this.products = [];
    this.emitChanged();
  }

  // получить количество товаров в корзине
  public getCount(): number {
    return this.products.length;
  }

  // получить общую стоимость товаров в корзине
  public getTotal(): number {
    return this.products
      .reduce((sum, product) => sum + (product.price ?? 0), 0);
  }

  // проверка наличия товара в корзине
  public hasProduct(id: string): boolean {
    return this.products.some(product => product.id === id);
  }

  // событие изменения корзины
  private emitChanged(): void {
    this.events.emit<{ products: IProduct[]; count: number; total: number }>(
      "cart:changed",
      {
        products: this.products,
        count: this.getCount(),
        total: this.getTotal(),
      },
    );
  }
}
```

Тип ошибки для класса `Buyer`, переиспользует ключи интерфейса `IBuyer`.
```
type TErrors = Partial<Record<keyof IBuyer, string>>;
```

Класс `Buyer` реализует интерфейс `IBuyer` (Покупатель), для управления значениями используются методы get и set, чтобы вызывать событие при изменении значения. Перед выполнением изменения значения проверяем что данные действительно изменились, после чего меняем данные и вызываем событие изменения данных покупателя.

```
class Buyer implements IBuyer {
  private _payment: TPayment = "";
  private _address: string = "";
  private _email: string = "";
  private _phone: string = "";

  constructor(private events: IEvents) {}

  // получить тип оплаты
  get payment(): TPayment {
    return this._payment;
  }

  // установить тип оплаты
  set payment(value: TPayment) {
    // выполняем только при изменении значения
    if (this._payment === value) return;
    this._payment = value;
    // вызвать событие изменения данных покупателя
    this.emitChanged();
  }

  // получить адрес
  get address(): string {
    return this._address;
  }

  // установить адрес
  set address(value: string) {
    if (this._address === value) return;
    this._address = value;
    this.emitChanged();
  }

  // получить email
  get email(): string {
    return this._email;
  }

  // установить email
  set email(value: string) {
    if (this._email === value) return;
    this._email = value;
    this.emitChanged();
  }

  // получить телефон
  get phone(): string {
    return this._phone;
  }

  // установить телефон
  set phone(value: string) {
    if (this._phone === value) return;
    this._phone = value;
    this.emitChanged();
  }

  // получить данные покупателя
  public getBuyer(): IBuyer {
    return {
      payment: this._payment,
      address: this._address,
      email: this._email,
      phone: this._phone,
    };
  }

  // очистить данные покупателя
  public clearBuyer(): void {
    if (!this._payment && !this._address && !this._email && !this._phone) return;
    this._payment = "";
    this._address = "";
    this._email = "";
    this._phone = "";
    this.emitChanged();
  }

  // валидировать данные покупателя
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

  // событие изменения данных покупателя
  private emitChanged(): void {
    this.events.emit<{ buyer: IBuyer; errors: TErrors }>("buyer:changed", {
      buyer: this.getBuyer(),
      errors: this.validate(),
    });
  }
}
```

#### Слой коммуникации

Интерфейс ответа сервера на запрос списка товаров (метод `getProducts`).
```
interface IProductsResponse {
  total: number;
  items: IProduct[];
}
```

Интерфейс для отправки данных заказа на сервер (метод `postOrder`).
```
interface IOrderRequest extends IBuyer {
  total: number;
  items: string[];
}
```

Ответ сервера на успешный заказ (метод `postOrder`).
```
interface IOrderResponse {
  id: string;
  total: number;
}
```

Класс `WebLarekApi` реализует интерфейс слоя коммуникации с API.
```
class WebLarekApi {

  // наследуемый базовый класс API
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  // получить список товаров с сервера
  getProducts(): Promise<IProductsResponse> {
    return this.api.get("/product/");
  }

  // отправить заказ на сервер
  postOrder(data: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>("/order/", data);
  }
}
```

Переиспользование существующих типов: 
* `IProductsResponse.items` основан на `IProduct`
* `IOrderRequest` на `IBuyer`

#### Слой представления (View)

Класс предстваления владеет только своим корневым DOM-элементом и управляет его содержимым.

Действия выполняемые в корневом DOM-элементе через класс представления сообщают только факт события через `IEvents`.

Представления наследуют базовый класс `Component`, который содержит рендер и вызывает дочерние сеттеры для обновления DOM-узлов.

**Базовый класс `Component`**

Является дженериком `Component<T>`, где `T` — тип данных, передаваемых в `render`.

**Представление `Page`**

Корневой элемент `.page`, используется для вставки элементов в `.gallery` галерею.

```
class Page extends Component<IPage> {
  protected galleryElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.galleryElement = ensureElement<HTMLElement>(".gallery", this.container);
  }

  set items(value: HTMLElement[]) {
    this.galleryElement.replaceChildren(...value);
  }
}
```

**Представление `Header`**

Интерфейс счетчика корзины
```
interface IHeader {
  counter: number;
}
```

Корневой элемент `.header`, управляет представлением шапки - счетчик товаров и кнопка корзины.

```
class Header extends Component<IHeader> {
  // элемент счетчика
  protected counterElement: HTMLElement;
  // кнопка корзины
  protected basketButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    actions?: IHeaderActions,
  ) {
    super(container);

    this.counterElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container,
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container,
    );

    // событие клика на кнопку корзины
    if (actions?.onClick) {
      this.basketButton.addEventListener("click", actions.onClick);
    }
  }

  // сеттер счетчика
  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}
```

**Представление `Modal`**

Модальное окно. Отвечает за блок разметки `#modal-container`. Никем не наследуется, вставляет DOM-элемент в `.modal__content`. Существует в двух состояниях открыт (open), закрыт (close).

Наследует базывое представление `Component`.

```
class Modal extends Component<IModalData> {
  // кнопка закрытия модального окна
  protected closeButton: HTMLButtonElement;
  // контент модального окна
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

    // событие клика на кнопку
    if (actions?.onClick) {
      this.closeButton.addEventListener("click", actions.onClick);
      this._handleClose = actions.onClick;
    }
    // событие клика контейнера, который закрывает модальное окно вне области модального окна
    this.container.addEventListener("click", (e) => {
      if (e.target === this.container) this._handleClose?.();
    });
  }

  // обработчик закрытия модального окна
  private _handleClose?: () => void;

  // установить контент модального окна
  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }

  // установить состояние модального окна
  protected _toggleModal(state: boolean) {
    this.container.classList.toggle("modal_active", state);
  }

  // открыть модальное окно
  open() {
    this._toggleModal(true);
  }

  // закрыть модальное окно
  close() {
    this._toggleModal(false);
  }
}

```

**Представление `Card`**

Абстрактный общий класс трёх карточек: `CardCatalog`, `CardPreview`, `CardBasket`. Все они отображают товар `IProduct`. Сам класс `Card` самостоятельно не используется.

Используем `Partial<IProduct>`, чтобы можно было передавать только нужные значения для отображения дочернего класса представления.

Использование ключей `IProduct` в представлениях.

| IProduct | CardCatalog | CardPreview | CardBasket |
|---|:---:|:---:|:---:|
| `id` | — | — | — |
| `image` | + | + | — |
| `category` | + | + | — |
| `title` | + | + | + |
| `price` | + | + | + |
| `description` | — | + | — |

`title` и `price` используются во всех 3-х представлениях, поэтому добавлены в базовый класс `Card`.
`image` и `category` используются только в `CardCatalog` и `CardPreview`, но чтобы избежать дублирование логики, добавлены в базовый класс `Card`.

```
abstract class Card<T extends Partial<IProduct>> extends Component<T> {
  // основные элементы
  protected imageElement: HTMLImageElement | null;
  protected categoryElement: HTMLElement | null;
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    // image и category опциональные, так как для CardBasket не используются. присваиваются через querySelector и могут быть null
    this.imageElement = container.querySelector<HTMLImageElement>(".card__image");
    this.categoryElement = container.querySelector<HTMLElement>(".card__category");
    this.titleElement = ensureElement<HTMLElement>(".card__title", this.container);
    this.priceElement = ensureElement<HTMLElement>(".card__price", this.container);
  }

  // установить заголовок
  set title(value: string) {
    this.titleElement.textContent = value;
  }

  // установить категорию
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

  // установить изображение
  set image(value: string) {
    if (!this.imageElement) return;
    this.setImage(this.imageElement, value, this.titleElement.textContent ?? "");
  }

  // установить цену
  set price(value: number | null) {
    this.priceElement.textContent = value === null
      ? "Бесценно"
      : `${value} синапсов`;
  }
}
```

Представление `CardCatalog` наследует свойства `Card`.

Только используемые значения в DOM-элементах: `category`, `title`, `image`, `price`.

```
type TCardCatalog = Pick<IProduct, "category" | "title" | "image" | "price">;

class CardCatalog extends Card<TCardCatalog> {

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    // событие клика на карточку
    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }
}
```

Представление `CardPreview` наследует свойства `Card`.

Только используемые значения в DOM-элементах: `image`, `category`, `title`, `description`, `price`.

```
type TCardPreview = Pick<
  IProduct,
   "image" | "category" | "title" | "description" | "price"
> & { inCart: boolean };

class CardPreview extends Card<TCardPreview> {
  // элемент описания товара (description)
  protected textElement: HTMLElement;
  // элемент кнопки добавления/удаления товара для корзины
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.textElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );

    // событие клика на кнопку
    if (actions?.onClick) {
      this.buttonElement.addEventListener("click", actions.onClick);
    }
  }

  // установить описание
  set description(value: string) {
    this.textElement.textContent = value;
  }

  // установить состояние товара в корзине
  set inCart(value: boolean) {
    const available = this.priceElement.textContent !== "Бесценно";
    if (!available) return;
    this.buttonElement.textContent = value ? "Удалить из корзины" : "В корзину";
  }

  // установить цену и состояние кнопки
  set price(value: number | null) {
    super.price = value;
    const available = value !== null;
    this.buttonElement.disabled = !available;
    this.buttonElement.textContent = available ? "В корзину" : "Недоступно";
  }
}
```

Представление `CardBasket` наследует свойства `Card`.

Только используемые значения в DOM-элементах: `title`, `price`. Индекс товара передает презентер.

```
type TCardBasket = Pick<IProduct, "title" | "price"> & { index: number };

class CardBasket extends Card<TCardBasket> {
  // индекс товара в корзине
  protected indexElement: HTMLElement;
  // кнопка удаления товара из корзины
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );
    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container,
    );

    // событие клика на кнопку
    if (actions?.onClick) {
      this.deleteButton.addEventListener("click", actions.onClick);
    }
  }

  // установить индекс товара в корзине
  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
```

**Представление `Form`**

Абстрактный базовый класс форм: `OrderForm` и `ContactsForm`. Сам класс `Form` самостоятельно не используется.

Является дженериком `Form<T extends Partial<IBuyer>>`, где `T` тип данных формы.

Отвечает за вывод текста ошибок и управление состоянием кнопки отправки.

```
abstract class Form<T extends Partial<IBuyer>> extends Component<T> {
  // элемент вывода ошибок
  protected errorsElement: HTMLElement;
  // кнопка отправки формы
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

    // событие ввода в поле формы
    this.container.addEventListener("input", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      this.actions?.onChange?.(target.name, target.value);
    });
    // событие отправки формы
    this.container.addEventListener("submit", (e) => {
      e.preventDefault();
      this.actions?.onSubmit?.();
    });
  }

  // установить текст ошибок
  set errors(value: string) {
    this.errorsElement.textContent = value;
  }

  // установить состояние кнопки отправки
  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }
}
```

Представление `OrderForm` наследует свойства `Form`.

Форма выбора способа оплаты и адреса доставки. Только используемые значения: `payment`, `address`.

Интерфейс действий формы заказа, расширяет `IFormActions` методом выбора оплаты.

```
type TOrder = Pick<IBuyer, "payment" | "address">;

class OrderForm extends Form<TOrder> {
  // кнопка оплаты онлайн
  protected cardButton: HTMLButtonElement;
  // кнопка оплаты при получении
  protected cashButton: HTMLButtonElement;
  // поле ввода адреса
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

    // события клика на кнопки выбора оплаты
    this.cardButton.addEventListener("click", () => {
      actions?.onClick?.("card");
    });
    this.cashButton.addEventListener("click", () => {
      actions?.onClick?.("cash");
    });
  }

  // установить выбранный способ оплаты
  set payment(value: TPayment) {
    this.cardButton.classList.toggle("button_alt-active", value === "card");
    this.cashButton.classList.toggle("button_alt-active", value === "cash");
  }

  // установить адрес доставки
  set address(value: string) {
    this.addressInput.value = value;
  }
}
```

Представление `ContactsForm` наследует свойства `Form`.

Форма ввода контактных данных. Только используемые значения: `email`, `phone`.

```
type TContacts = Pick<IBuyer, "email" | "phone">;

class ContactsForm extends Form<TContacts> {
  // поле ввода email
  protected emailInput: HTMLInputElement;
  // поле ввода телефона
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

  // установить email
  set email(value: string) {
    this.emailInput.value = value;
  }

  // установить телефон
  set phone(value: string) {
    this.phoneInput.value = value;
  }
}
```

**Представление `Basket`**

Корневой элемент `.basket`, управляет представлением корзины, общая стоимость и кнопка оформления заказа.

```
// интерфейс данных корзины
interface IBasket {
  items: HTMLElement[];
  total: number;
}

class Basket extends Component<IBasket> {
  // элемент списка товаров
  protected listElement: HTMLElement;
  // элемент общей стоимости
  protected priceElement: HTMLElement;
  // кнопка оформления заказа
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IBasketActions) {
    super(container);

    this.listElement = ensureElement<HTMLElement>(
      ".basket__list",
      this.container,
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );

    // событие клика на кнопку оформления заказа
    if (actions?.onClick) {
      this.buttonElement.addEventListener("click", actions.onClick);
    }
  }

  // установить список товаров корзины
  set items(value: HTMLElement[]) {
    this.listElement.replaceChildren(...value);
    this.buttonElement.disabled = value.length === 0;
  }

  // установить общую стоимость товаров
  set total(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }
}
```

**Представление `Success`**

Корневой элемент `.order-success`, отображает сообщение об успешном оформлении заказа, сумма списанных синапсов и кнопка закрытия.

Тип данных представления переиспользует `IOrderResponse`, `total` - сумма списанных синапсов.
```
type TSuccess = Pick<IOrderResponse, "total">;
```

```
class Success extends Component<TSuccess> {
  // элемент описания
  protected descriptionElement: HTMLElement;
  // кнопка закрытия
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ISuccessActions) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );

    // событие клика на кнопку закрытия
    if (actions?.onClick) {
      this.closeButton.addEventListener("click", actions.onClick);
    }
  }

  // установить сумму списанных синапсов
  set total(value: number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}
```

#### Описание событий

События делятся на два типа:
* `ui:<действие>` — действия пользователя, генерируются представлениями. Презентер обрабатывает их и вызывает методы моделей
* `<модель>:<действие>` — изменения данных, генерируются моделями. Презентер обрабатывает их и обновляет представления

**Представление `Page`**

Событий не генерирует. Обновляется презентером через сеттер `items` при `catalog:changed`.

**Представление `Header`**

| Событие | Триггер | Обработчик |
|---|---|---|
| `ui:basket-open` | клик по кнопке корзины | открыть корзину в модальном окне |

Счётчик обновляется презентером через сеттер `counter` при `cart:changed`.

**Представление `Modal`**

| Событие | Триггер | Обработчик |
|---|---|---|
| `ui:modal-close` | клик по кнопке закрытия или вне области окна | закрыть модальное окно |

Контент обновляется презентером через сеттер `content` перед открытием.

**Представление `Card` -> модели `Catalog`, `Cart`**

`CardCatalog`

| Событие | Триггер | Обработчик |
|---|---|---|
| `ui:card-select` | клик по карточке в каталоге | найти товар в `Catalog`, открыть превью в модальном окне |

`CardPreview`

| Событие | Триггер | Обработчик |
|---|---|---|
| `ui:card-buy` | клик по кнопке | если товар в `Cart` - удалить, если нет добавить, перерисовать превью |

`CardBasket`

| Событие | Триггер | Обработчик |
|---|---|---|
| `ui:cart-remove` | клик по кнопке удаления в корзине | удалить товар из `Cart` по `id` |

**Модель `Catalog`**

| Событие | Триггер | Обработчик |
|---|---|---|
| `catalog:changed` | вызов `setProducts` | рендер галереи карточек `CardCatalog` в `Page` |
| `catalog:select` | вызов `setSelectedProduct` | не используется для перерисовки, состояние хранится в модели |

**Модель `Cart`**

| Событие | Триггер | Обработчик |
|---|---|---|
| `cart:changed` | вызов `addProduct` / `removeProductById` / `clearCart` | обновить счётчик `Header`, список и сумму `Basket` |

**Представление `Form` -> модель `Buyer`**

`OrderForm`

| Событие | Триггер | Обработчик |
|---|---|---|
| `ui:payment-select` | клик по кнопке оплаты `card` / `cash` | установить способ оплаты в `Buyer` и в форму |
| `ui:form-change` | ввод в поле `address` | установить адрес в `Buyer` |
| `ui:order-next` | клик по кнопке формы заказа | проверить ошибки `Buyer`, при успехе открыть `ContactsForm` |

`ContactsForm`

| Событие | Триггер | Обработчик |
|---|---|---|
| `ui:form-change` | ввод в поля `email` / `phone` | установить email/телефон в `Buyer` |
| `ui:contacts-submit` | клик по кнопке формы контактов | проверить ошибки `Buyer`, отправить заказ, при успехе открыть `Success` |

**Модель `Buyer`**

| Событие | Триггер | Обработчик |
|---|---|---|
| `buyer:changed` | изменение `payment` / `address` / `email` / `phone` через set | вывести ошибки в формы, изменить состояние кнопок `valid` |

**Представление `Success`**

| Событие | Триггер | Обработчик |
|---|---|---|
| `ui:modal-close` | клик по кнопке | закрыть модальное окно |

Сумма списания обновляется презентером через сеттер `total` после успешного ответа сервера.

#### Презентер

Вместо отдельного класса презентер реализован инлайн в `src/main.ts`, так как проект состоит из одной страницы.

Презентер связывает модели и представления через брокер событий `EventEmitter`:
* создаёт экземпляры моделей (`Catalog`, `Cart`, `Buyer`) и представлений (`Page`, `Header`, `Modal`, `Basket`, `OrderForm`, `ContactsForm`, `Success`)
* фабриками `cardCatalogFactory`, `cardPreviewFactory`, `cardBasketFactory` создаёт карточки под каждый товар
* подписывается на события `ui:<действие>` от представлений и вызывает методы моделей
* подписывается на события моделей `<модель>:<действие>` и обновляет представления через сеттеры
* при запуске загружает каталог с сервера через `api.getProducts()`

