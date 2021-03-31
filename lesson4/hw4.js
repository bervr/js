/*1. Написать функцию, преобразующую число в объект.Передавая на вход число от 0 до 999,
мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы,
десятки и сотни.Например, для числа 245 мы должны получить следующий объект:
{ ‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2 }.Если число превышает 999, необходимо выдать соответствующее
сообщение с помощью console.log и вернуть пустой объект.*/
function numberToObject(newNumber) {
    // create object from the number digits

    if (newNumber < 0) {
        console.log('Number is invalid, expected number greater than zero')
        return {};
    }
    else if (newNumber > 999) {
        console.log('Number is invalid, expected number less than 999')
        return {};
    }
    else if ((newNumber ^ 0) != newNumber) {
        console.log('Number is invalid, expected integer')
        return {};
    }
    else {
        let units = (newNumber % 10);
        let decades = (newNumber - units) / 10 % 10;
        let hundreds = (newNumber - units - decades * 10) / 100;
        return { 'units': units, 'decades': decades, 'hundreds': hundreds };
    };
};
console.log(numberToObject(560));
console.log(numberToObject(41));
console.log(numberToObject(708));
console.log(numberToObject(9999));
console.log(numberToObject(-5));
console.log(numberToObject(4.5));


/*2.Продолжить работу с интернет - магазином:
    2.1.В прошлом домашнем задании вы реализовали корзину на базе массивов.Какими объектами можно заменить их элементы ?
    2.2.Реализуйте такие объекты.
    2.3.Перенести функционал подсчета корзины на объектно - ориентированную базу.*/


const shoppingCart = {
    one: { productId: 5263, productName: 'backpack', quntity: 1, productDiscount: 0, price: 79.99 },
    two: { productId: 17712, productName: 'tent', quntity: 1, productDiscount: 0, price: 127.0 },
    three: { productId: 953, productName: 'army boots, pair', quntity: 3, productDiscount: 5, price: 189.99 },
    four: { productId: 121586, productName: 'axe', quntity: 1, productDiscount: 0, price: 56.0 }
};
function countBasketPrice(cart) {
    let cartTotal = 0
    for (point in cart) {
        cartTotal += (cart[point].quntity * cart[point].price - cart[point].quntity * cart[point].productDiscount)
    };
    return cartTotal;
};
console.log(countBasketPrice(shoppingCart));


/*3. * Подумать над глобальными сущностями.К примеру, сущность «Продукт» в интернет - магазине актуальна не
только для корзины, но и для каталога.Стремиться нужно к тому, чтобы объект «Продукт» имел единую структуру для
различных модулей сайта, но в разных местах давал возможность вызывать разные методы.*/

//в объект "продукт" я бы еще добавил категории товара и ссылку на родительский каталог чтобы можно было строить иерархию.
//хотелось еще и  ссылку на фотку, но наверное это лишнее, и фотки будут лежать в подкаталоге равном ID товара,
//цены могут быть разные для разных категорий клиентов, т.е. ценовые ряды должны быть 
//(либо процент скидки на категорию клиента вешать)
//массогабаритные характеристики товара могут быть полезны чтобы считать доставку
//наличие и остатки на складе
//даты поступления если нет на остатке, срок годности если продукт подразумевает, срок гарантии.
//и уже вот тут мне не хочется это в объект пихать, а хочется уютненькую БД...
//штрихкод в учетной ситеме, коды в ГАИСах всяких, руссоке название, налоговая ставка, данные о производителе или импортере
//страна производства, рекламный текст, ссылка на отзывы на яндексмаркете 
//(ну или на свою страничку с распарщеными отзывами маркета)
//кажется щас 1Ска получится...

