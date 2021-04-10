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
        this.render();
        document.querySelector('.cart-btn').addEventListener('click', event => { this.clearCart() });
        document.querySelector(this.settings.addToCartSelector) //ловим клики в блоке addToCartSelector
            .addEventListener('click', event => {
                this.containerClickHandler(event)
            });
    },
    render() {
        document.getElementById("catalog").innerHTML = ""; //очистка и перерисовка корзины и каталога
        document.getElementById('cart-list').innerHTML = "";
        document.getElementById("catalog").insertAdjacentHTML('beforeend', this.Product.printCatalog());
        document.getElementById('cart-list').insertAdjacentHTML('beforeend', this.shoppingCart.printBasket());
    },
    containerClickHandler(event) {
        let targetProduct = {};
        if (event.target.tagName !== 'BUTTON') return; // выбираем из кликов кнопки в блоке каталога
        targetProduct = this.Product.goods.find(x => x.productId == event.target.dataset.product_id).productId;
        // из нажатий кнопки по датасету определяем какой товар хотели добавить и получаем id товара
        this.takeToCart(targetProduct);
    },

    takeToCart(oneNewGood) {
        //  //в каталоге ищем товар с таким же ID 
        let newItem = this.Product.goods.find(x => x.productId == oneNewGood)
        if (newItem.quntity > 0) {
            newItem.quntity--;
            this.addToCart(oneNewGood);
        }
        else {
            console.log('товар закончился')
        };
    },
    addToCart(oneNewGood) {
        let newItemToCart = this.shoppingCart.goods.find(x => x.productId == oneNewGood)
        // ищем в корзине товар с таким же id как тот по которому кликнули, если он уже есть - добавляем еще 1
        if (newItemToCart) {
            ++newItemToCart.quntity
            console.log(newItemToCart);
        }
        else { //если нет то добавляем  новый товар
            let newItemToCart = Object.assign({}, this.Product.goods.find(x => x.productId == oneNewGood));
            newItemToCart.quntity = 1
            this.shoppingCart.goods.push(newItemToCart)
        }
        this.render(); //перерисовываем все

    },
    clearCart() { //вернем все из корзины в каталог
        let goodsInCart = this.shoppingCart.goods;
        if (goodsInCart) {
            while (goodsInCart.length - 1 >= 0) {
                let element = goodsInCart.shift();
                this.Product.goods.find(x => x.productId == element.productId).quntity += element.quntity;
            }
        }
        this.render();
    }
};

eShop.init();