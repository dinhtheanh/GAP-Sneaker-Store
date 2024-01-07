const hbs = require('hbs');


// Custom helper to calculate the discounted price
hbs.registerHelper('calcDiscount', function (price) {
        const discount = price * 0.3;
        const discountedPrice = price - discount;
        return discountedPrice.toFixed(2);
});
hbs.registerHelper('calcprice', function (price,quantity) {
        const subprice = price * quantity;
        return subprice;
});


hbs.registerHelper('equal', function (arg1, arg2) {
        return arg1 == arg2;
});
hbs.registerHelper('eq', function (arg1, arg2) {
        return arg1 == arg2;
});

hbs.registerHelper('eq', function (arg1, arg2) {
        return arg1 == arg2;
});

hbs.registerHelper('idtoString', function (id) {
        return id.toString();
});

hbs.registerHelper('stringify', function (arg) {
        return JSON.stringify(arg);
});

hbs.registerHelper('checkCurTab', function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

hbs.registerHelper('calculateTotal', function (products) {
let totalAmount = 0;

for (const product of products) {
        const subTotal = product.product.price * product.quantity;
        totalAmount += subTotal;
}

return totalAmount;
});

module.exports = hbs;
