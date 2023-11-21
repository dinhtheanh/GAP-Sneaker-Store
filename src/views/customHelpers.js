const hbs = require('hbs');

hbs.registerHelper('calcDiscount', function (price) {
        const discount = price * 0.3;
        const discountedPrice = price - discount;
        return discountedPrice.toFixed(2);
});

module.exports = hbs;
