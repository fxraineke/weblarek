import "./scss/styles.scss";
import { Api } from "./components/base/Api";
import { Catalog } from "./components/models/Catalog";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { Request } from "./components/models/Request";
import { API_URL } from "./utils/constants";

async function mainTest(): Promise<void> {
  const api = new Api(API_URL);
  const request = new Request(api);

  const catalogModel = new Catalog();
  const cartModel = new Cart();
  const buyerModel = new Buyer();

  await request
    .getProducts()
    .then((response) => {
      console.log("Тест API => getProducts => Получены товары:", response);
      // тесты для Catalog
      console.log("=== Catalog ===");
      console.log(
        "getProducts => Каталог товаров:",
        catalogModel.getProducts(),
      );
      catalogModel.setProducts(response.items);
      console.log(
        "setProducts => Каталог товаров:",
        catalogModel.getProducts(),
      );
      console.log(
        "getSelectedProduct => Выбранный товар:",
        catalogModel.getSelectedProduct(),
      );
      let product = catalogModel.getProduct(
        "b06cde61-912f-4663-9751-09956c0eed67",
      );
      console.log("getProduct => Получен товар по id:", product);
      catalogModel.setSelectedProduct(product);
      console.log(
        "setSelectedProduct => Выбранный товар:",
        catalogModel.getSelectedProduct(),
      );
      console.log(
        "getSelectedProduct => Выбранный товар:",
        catalogModel.getSelectedProduct(),
      );
      catalogModel.clearSelectedProduct();
      console.log(
        "clearSelectedProduct => Выбранный товар:",
        catalogModel.getSelectedProduct(),
      );

      // тесты для Cart
      console.log("=== Cart ===");
      console.log("getItems => Корзина:", { ...cartModel.getProducts() });
      console.log(
        "hasProduct [id: b06cde61-912f-4663-9751-09956c0eed67] => Корзина:",
        cartModel.hasProduct("b06cde61-912f-4663-9751-09956c0eed67"),
      );
      console.log("getTotal => Корзина:", cartModel.getTotal());
      if (product) {
        cartModel.addProduct(product);
      }
      console.log("addProduct [price = null] => Корзина:", {
        ...cartModel.getProducts(),
      });
      console.log("getTotal => Корзина:", cartModel.getTotal());
      console.log("getCount => Корзина:", cartModel.getCount());
      console.log(
        "hasProduct [id: b06cde61-912f-4663-9751-09956c0eed67] => Корзина:",
        cartModel.hasProduct("b06cde61-912f-4663-9751-09956c0eed67"),
      );
      product = catalogModel.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
      if (product) {
        cartModel.addProduct(product);
      }
      console.log("addProduct => Корзина:", { ...cartModel.getProducts() });
      console.log("getTotal => Корзина:", cartModel.getTotal());
      console.log("getCount => Корзина:", cartModel.getCount());
      console.log(
        "hasProduct [id: 854cef69-976d-4c2a-a18c-2aa45046c390] => Корзина:",
        cartModel.hasProduct("854cef69-976d-4c2a-a18c-2aa45046c390"),
      );
      product = catalogModel.getProduct("f3867296-45c7-4603-bd34-29cea3a061d5");
      if (product) {
        cartModel.addProduct(product);
      }
      console.log("addProduct => Корзина:", { ...cartModel.getProducts() });
      console.log("getTotal => Корзина:", cartModel.getTotal());
      console.log("getCount => Корзина:", cartModel.getCount());
      console.log(
        "hasProduct [id: f3867296-45c7-4603-bd34-29cea3a061d5] => Корзина:",
        cartModel.hasProduct("f3867296-45c7-4603-bd34-29cea3a061d5"),
      );
      cartModel.removeProductById("b06cde61-912f-4663-9751-09956c0eed67");
      console.log(
        "removeProductById [id: b06cde61-912f-4663-9751-09956c0eed67] => Корзина:",
        { ...cartModel.getProducts() },
      );
      console.log(
        "hasProduct [id: b06cde61-912f-4663-9751-09956c0eed67] => Корзина:",
        cartModel.hasProduct("b06cde61-912f-4663-9751-09956c0eed67"),
      );
      console.log("getTotal => Корзина:", cartModel.getTotal());
      console.log("getCount => Корзина:", cartModel.getCount());
      cartModel.clearCart();
      console.log("clearCart => Корзина:", { ...cartModel.getProducts() });
      console.log("getTotal => Корзина:", cartModel.getTotal());
      console.log("getCount => Корзина:", cartModel.getCount());

      // тесты для Buyer
      console.log("=== Buyer ===");
      console.log("getBuyer => Покупатель:", buyerModel.getBuyer());
      console.log("setBuyer => Покупатель:", buyerModel.validate());
      console.log("isValid => Покупатель:", buyerModel.isValid());
      buyerModel.setAddress("c.Колот");
      console.log("setAddress => Покупатель:", buyerModel.getBuyer());
      console.log("validate => Покупатель:", buyerModel.validate());
      console.log("isValid => Покупатель:", buyerModel.isValid());
      buyerModel.setAddress("c. Колотушкина, ул. Пушкина, д. 1");
      console.log("setAddress => Покупатель:", buyerModel.getBuyer());
      console.log("validate => Покупатель:", buyerModel.validate());
      console.log("isValid => Покупатель:", buyerModel.isValid());
      buyerModel.setEmail("test");
      console.log("setEmail => Покупатель:", buyerModel.getBuyer());
      console.log("validate => Покупатель:", buyerModel.validate());
      console.log("isValid => Покупатель:", buyerModel.isValid());
      buyerModel.setEmail("test@test.ru");
      console.log("setEmail => Покупатель:", buyerModel.getBuyer());
      console.log("validate => Покупатель:", buyerModel.validate());
      console.log("isValid => Покупатель:", buyerModel.isValid());
      buyerModel.setPhone("9999999999");
      console.log("setPhone => Покупатель:", buyerModel.getBuyer());
      console.log("validate => Покупатель:", buyerModel.validate());
      console.log("isValid => Покупатель:", buyerModel.isValid());
      buyerModel.setPhone("+7 (999) 999-99-99");
      console.log("setPhone => Покупатель:", buyerModel.getBuyer());
      console.log("validate => Покупатель:", buyerModel.validate());
      console.log("isValid => Покупатель:", buyerModel.isValid());
      buyerModel.setPayment("cash");
      console.log("setPayment => Покупатель:", buyerModel.getBuyer());
      console.log("validate => Покупатель:", buyerModel.validate());
      console.log("isValid => Покупатель:", buyerModel.isValid());
      buyerModel.setPayment("card");
      console.log("setPayment => Покупатель:", buyerModel.getBuyer());
      console.log("validate => Покупатель:", buyerModel.validate());
      console.log("isValid => Покупатель:", buyerModel.isValid());
    })
    .catch((err) => {
      console.error(
        "Тест API => getProducts => Ошибка получения товаров:",
        err,
      );
    });

  await request
    .getProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7")
    .then((response) => {
      console.log(
        "Тест API => getProduct [id: 412bcf81-7e75-4e70-bdb9-d3c73c9803b7] => Получен товар:",
        response,
      );
    })
    .catch((err) => {
      console.error(
        "Тест API => getProduct [id: 412bcf81-7e75-4e70-bdb9-d3c73c9803b7] => Ошибка получения товара:",
        err,
      );
    });

  await request
    .getProduct("412bcf81-7e75-4e70##########")
    .then((response) => {
      console.log(
        "Тест API => getProduct [id: 412bcf81-7e75-4e70##########] => Получен товар:",
        response,
      );
    })
    .catch((err) => {
      console.error(
        "Тест API => getProduct [id: 412bcf81-7e75-4e70##########] => Ошибка получения товара:",
        err,
      );
    });

  catalogModel
    .getProducts()
    .slice(0, 5)
    .forEach((product) => {
      cartModel.addProduct(product);
    });

  buyerModel.setAddress("c. Колотушкина, ул. Пушкина, д. 1");
  buyerModel.setEmail("test@test.ru");
  buyerModel.setPhone("+7 (999) 999-99-99");
  buyerModel.setPayment("card");

  console.log(
    "Тест API => createOrder => Заказ:",
    cartModel.getProducts().flatMap((product) => product.id),
    cartModel.getTotal(),
    buyerModel.getBuyer(),
  );

  await request
    .postOrder({
      items: cartModel.getProducts().flatMap((product) => product.id),
      total: cartModel.getTotal(),
      buyer: buyerModel.getBuyer(),
    })
    .then((response) => {
      console.log("Тест API => createOrder => Заказ создан:", response);
    })
    .catch((err) => {
      console.error("Тест API => createOrder => Ошибка создания заказа:", err);
    });
}

mainTest();
