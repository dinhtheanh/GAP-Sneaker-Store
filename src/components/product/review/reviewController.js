const async = require('hbs/lib/async')
const Services = require("../productService.js");

const getProductReviewPage = async (req, res) => {
    const id = req.params.productid;
    const product = await Services.getProductDetail(id);
    //console.log(relatedProducts);
    res.render("customer/navbar/reviewform", { layout: "customer/layout", product: product, user: req.user});
};

const submitReview = async (req, res) => {
    const productId = req.params.productid;
    const userName = req.body.userName;
    const reviewText = req.body.review;
    if(!reviewText)
    {
        return res.status(200).json({
            status: 'ERR',
            message: 'The input is required'
        })
    }
    try {
        const response = await Services.addProductReview(productId, userName, reviewText);
        res.redirect('/products/' + productId);
    } catch (error) {
        

        console.error('Error adding review:', error);
        res.status(500).json({
            status: 'ERR', 
            message: 'Internal Server Error'
        });
    }
};

module.exports = {

    getProductReviewPage,
    submitReview
}