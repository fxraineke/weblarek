import "./scss/styles.scss";
import { Api } from "./components/base/Api";
import { Catalog } from "./components/models/Catalog";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { WebLarekApi } from "./components/WebLarekApi";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";

const mockProducts = apiProducts.items;

const api = new Api(API_URL);
const request = new WebLarekApi(api);

const catalogModel = new Catalog();
const cartModel = new Cart();
const buyerModel = new Buyer();

// проверка метода API getProducts
await request
  .getProducts()
  .then((response) => {
    catalogModel.setProducts(response.items);
    console.log("Тест API => setProducts => getProducts => Каталог товаров:", catalogModel.getProducts());
  })
  .catch((err) => {
    console.error("Тест API => Ошибка получения товаров:", err);
  });

// тесты для Catalog
console.log("=== Catalog ===");
catalogModel.setProducts(mockProducts);
console.log("setProducts => Каталог товаров:", catalogModel.getProducts());
console.log(
  "getProduct [id: 854cef69-976d-4c2a-a18c-2aa45046c390] => Товар:",
  catalogModel.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
catalogModel.setSelectedProduct(mockProducts[0]);
console.log(
  "setSelectedProduct => Выбранный товар:",
  catalogModel.getSelectedProduct(),
);

// тесты для Cart
console.log("=== Cart ===");
console.log("getProducts => Корзина:", cartModel.getProducts());
console.log(
  "hasProduct [id: 854cef69-976d-4c2a-a18c-2aa45046c390] => Корзина:",
  cartModel.hasProduct("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
cartModel.addProduct(mockProducts[0]);
console.log("addProduct [price = 750] => Корзина:", cartModel.getProducts());
console.log("getTotal => Корзина:", cartModel.getTotal());
console.log("getCount => Корзина:", cartModel.getCount());
console.log(
  "hasProduct [id: 854cef69-976d-4c2a-a18c-2aa45046c390] => Корзина:",
  cartModel.hasProduct("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
cartModel.addProduct(mockProducts[1]);
console.log("addProduct [price = 1450] => Корзина:", cartModel.getProducts());
console.log("getTotal => Корзина:", cartModel.getTotal());
console.log("getCount => Корзина:", cartModel.getCount());
cartModel.addProduct(mockProducts[2]);
console.log("addProduct [price = null] => Корзина:", cartModel.getProducts());
console.log("getTotal => Корзина:", cartModel.getTotal());
console.log("getCount => Корзина:", cartModel.getCount());
cartModel.removeProductById("854cef69-976d-4c2a-a18c-2aa45046c390");
console.log(
  "removeProductById [id: 854cef69-976d-4c2a-a18c-2aa45046c390] => Корзина:",
  cartModel.getProducts(),
);
console.log(
  "hasProduct [id: 854cef69-976d-4c2a-a18c-2aa45046c390] => Корзина:",
  cartModel.hasProduct("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
console.log("getTotal => Корзина:", cartModel.getTotal());
console.log("getCount => Корзина:", cartModel.getCount());
cartModel.clearCart();
console.log("clearCart => Корзина:", cartModel.getProducts());
console.log("getTotal => Корзина:", cartModel.getTotal());
console.log("getCount => Корзина:", cartModel.getCount());

// тесты для Buyer
console.log("=== Buyer ===");
console.log("getBuyer => Покупатель:", buyerModel.getBuyer());
console.log("validate => Покупатель:", buyerModel.validate());
buyerModel.setAddress("c.Колот");
console.log("setAddress => Покупатель:", buyerModel.getBuyer());
console.log("validate => Покупатель:", buyerModel.validate());
buyerModel.setAddress("c. Колотушкина, ул. Пушкина, д. 1");
console.log("setAddress => Покупатель:", buyerModel.getBuyer());
console.log("validate => Покупатель:", buyerModel.validate());
buyerModel.setEmail("test");
console.log("setEmail => Покупатель:", buyerModel.getBuyer());
console.log("validate => Покупатель:", buyerModel.validate());
buyerModel.setEmail("test@test.ru");
console.log("setEmail => Покупатель:", buyerModel.getBuyer());
console.log("validate => Покупатель:", buyerModel.validate());
buyerModel.setPhone("9999999999");
console.log("setPhone => Покупатель:", buyerModel.getBuyer());
console.log("validate => Покупатель:", buyerModel.validate());
buyerModel.setPhone("+7 (999) 999-99-99");
console.log("setPhone => Покупатель:", buyerModel.getBuyer());
console.log("validate => Покупатель:", buyerModel.validate());
buyerModel.setPayment("cash");
console.log("setPayment => Покупатель:", buyerModel.getBuyer());
console.log("validate => Покупатель:", buyerModel.validate());
buyerModel.setPayment("card");
console.log("setPayment => Покупатель:", buyerModel.getBuyer());
console.log("validate => Покупатель:", buyerModel.validate());
