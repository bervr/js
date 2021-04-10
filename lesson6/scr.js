const eShop = {
    settings: {
        addToCartSelector: '.catalog',
    },
    shoppingCart: {
        goods: [],

        countBasketPrice() {
            return this.goods.reduce((totalPrice, cardItem) => totalPrice + cardItem.price * cardItem.quntity, 0);
        },
        countBasket() {
            return this.goods.length
        },
        printBasket() {
            if (this.countBasket() > 0) {
                let basket = `<table class="table viewedcatalog"><thead><tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Название</th>
                            <th scope="col">Количество</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Итого</th>
                        </tr> </thead > <tbody>`
                this.goods.forEach(element => {
                    basket += `<tr>
                                <th scope="row">${element.productId}</th>
                                <td>${element.productName}</td>
                                <td>${element.quntity}</td>
                                <td>${element.price}</td>
                                <td>${element.price * element.quntity}</td>
                            </tr>`
                });
                basket += `</tbody></table><div>В корзине: ${this.countBasket()} товаров на сумму ${this.countBasketPrice()} рублей</div>`
                return basket;
            }
            else {
                basket = 'Корзина пуста';
                return basket;
            }
        }

    },
    Product: {
        goods: [
            { productId: 5263, productName: 'backpack', quntity: 50, productDiscount: 0, price: 80 },
            { productId: 17712, productName: 'tent', quntity: 21, productDiscount: 0, price: 127.0 },
            { productId: 953, productName: 'army boots, pair', quntity: 37, productDiscount: 5, price: 190 },
            { productId: 121586, productName: 'axe', quntity: 11, productDiscount: 0, price: 56.0 }
        ],
        countProduct() {
            return this.goods.length
        },
        printCatalog() {
            let catalog = `<table class="table viewedcatalog"><thead><tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Название</th>
                            <th scope="col">Остаток</th>
                            <th scope="col">Цена</th>
                            <th scope="col"></th>
                        </tr> </thead > <tbody>`
            if (this.countProduct() > 0) {
                this.goods.forEach(element => {
                    catalog += `<tr>
                                <th scope="row">${element.productId}</th>
                                <td>${element.productName}</td>
                                <td>${element.quntity}</td>
                                <td>${element.price}</td>
                                <th scope="col"><button class="addToCart" data-product_Id=${element.productId}>добавить в корзину</button></th>
                            </tr>`
                });
                catalog += '</tbody></table>'
                return catalog;
            }
            else {
                return 'Каталог пуст'
            }
        },

    },

    init() {
        document.getElementById("catalog").innerHTML = ""; //очистка и перерисовка корзины и каталога
        document.getElementById('cart-list').innerHTML = "";
        document.getElementById("catalog").insertAdjacentHTML('beforeend', this.Product.printCatalog());
        document.getElementById('cart-list').insertAdjacentHTML('beforeend', this.shoppingCart.printBasket());
        document.querySelector(this.settings.addToCartSelector) //ловим клики в блоке addToCartSelector
            .addEventListener('click', event => {
                this.containerClickHandler(event)
            });

    },
    containerClickHandler(event) {
        console.log('нажатие!')
        if (event.target.tagName !== 'BUTTON') return; // выбираем из кликов кнопки в блоке каталога
        let targetProduct = this.Product.goods.find(x => x.productId == event.target.dataset.product_id);
        // из нажатий кнопки по датасету определяем какой товар хотели добавить и получаем обьект товара

        this.takeToCart(targetProduct);
    },

    takeToCart(oneNewGood) {
        //  //в каталоге ищем товар с таким же ID 
        // let newItem = this.Product.goods.find(x => x.productId == oneNewGood.productId) 
        if (oneNewGood.quntity > 0) {
            // console.log(oneNewGood);
            // console.log(oneNewGood, 'до убавления на 1');
            oneNewGood.quntity--;
            // console.log(oneNewGood, 'после убавления на 1');
            this.addToCart(oneNewGood);
        }
        else {
            console.log('товар закончился')

        };
    },
    addToCart(oneNewGood) {
        let newItem = this.shoppingCart.goods.find(x => x.productId == oneNewGood.productId)
        // console.log(newItem, 'уже есть в корзине');
        // ищем в корзине товар с таким же id как тот по которому кликнули, если он уже есть - добавляем еще 1
        if (newItem) {
            newItem.quntity++
            // console.log(newItem, 'прибавляем  1 в корзину');
        }
        else { //если нет то добавляем  новый товар
            let newItem = Object.assign({}, oneNewGood);
            // console.log(newItem, 'еще не было  в корзине');
            newItem.quntity = 1
            // console.log(newItem, 'то что добавляем в корзину');
            this.shoppingCart.goods.push(newItem)
            //console.log(newItem);
        }
        this.init(); //перерисовываем все

    },
};

eShop.init();