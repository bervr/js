/*1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.*/
let i = 0;
let resultArr = [0, 1];
mainMy: while (i < 100) {
    i++;
    let j = 1;
    while (j < 100) {
        j++;
        if (i != j && (i % j == 0)) {
            continue mainMy;
        }
        else if (i % j == 0) {
            resultArr.push(j);
            continue mainMy;
        };
    };
};
console.log(resultArr)


/*2-3. С этого урока начинаем работать с функционалом интернет - магазина.Предположим, есть сущность корзины.
Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
Товары в корзине хранятся в массиве.Задачи:
a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.*/

let shoppingCart = [
    // [productId, productName, quntity, productDiscount, price, total]
    [5263, 'backpack', 1, 0, 79.99, 79.99],
    [17712, 'tent', 1, 0, 127.0, 127.0],
    [953, 'army boots, pair', 3, 5, 189.99, 189.99],
    [121586, 'axe', 1, 0, 56.0, 56.0]
];
// а точно не на бэке нужно корзине считать? 
function countBasketPrice(cart) {
    let cartTotal = 0
    for (point of cart) {
        cartTotal += (point[2] * point[4] - point[3] * point[2])
    };
    return cartTotal;
};

console.log(countBasketPrice(shoppingCart));

/*4. * Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.Выглядеть это должно так:
for (…) {// здесь пусто}*/

for (let i = 0; i < 10; console.log(i++));

/*  5. * Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
    x
    xx
    xxx
    xxxx
    xxxxx*/

let level = 20;
for (let i = 1; i <= level; i++) {
    console.log('*'.repeat(i))
};

// или если строковые методы нельзя то вложеный цикл

let level = 20;
for (let i = 1; i <= level; i++) {
    let newString = '*'
    for (j = 1; j != i; j++) {
        newString += '*'
    }
    console.log(newString)
};

// хотя согласен,  не нужен тут вложеный цикл

let level = 20;
let newString = '*'
for (let i = 1; i <= level; i++) {
    console.log(newString)
    newString += '*'
};