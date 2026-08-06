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

  // установить товары каталога
  public setProducts(products: IProduct[]): void {
    this.products = products;
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

  // получить товары в корзине
  public getProducts(): IProduct[] {
    return this.products;
  }

  // Добавить товар в корзину
  public addProduct(product: IProduct): void {
    if (this.hasProduct(product.id) || product.price === null) {
      return;
    }
    this.products.push(product);
  }

  // удалить товар из корзины по id
  public removeProductById(id: string): void {
    this.products = this.products.filter(product => product.id !== id);
  }
  
  // очистить корзину
  public clearCart(): void {
    this.products = [];
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
}
```

Тип ошибки для класса `Buyer`, переиспользует ключи интерфейса `IBuyer`.
```
type TErrors = Partial<Record<keyof IBuyer, string>>;
```

Класс `Buyer` реализует интерфейс `IBuyer` (Покупатель).

```
class Buyer implements IBuyer {

  public payment: TPayment = "";
  public address: string = "";
  public email: string = "";
  public phone: string = "";

  constructor(data: IBuyer) {
    this.payment = data.payment;
    this.address = data.address;
    this.email = data.email;
    this.phone = data.phone;
  }

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
  public validate(): TErrors {
    const errors: TErrors = {};

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
