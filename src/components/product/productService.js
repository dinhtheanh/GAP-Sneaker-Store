const async = require('hbs/lib/async.js');
const productModel = require('./productModel.js'); // requiring the data model for product
const { default: mongoose } = require('mongoose');

// Get all the products from the database
const getAllProducts = async () => {
    try {
        const products = await productModel.find();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Unable to fetch products');
    }
};

// Get the product detail page by id
const getProductDetail = async (id) => {
    try {
        //onst objid = new mongoose.Types.ObjectId(id);
        //console.log(objid);
        const product = await productModel.findById(id);
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('Unable to fetch product');
    }
}

const getRelatedProducts = async (productCategory, productBrand, productID) => {
    try {
        const products = await productModel.find({ 
            category: productCategory, 
            manufacturer: productBrand,
            _id: { $ne: productID } });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Unable to fetch products');
    }
}

const addProduct = async(productData)=>{
    return new Promise(async(resolve,reject)=>{
        const {name,price,brand,gender,sizes,category}= productData
        try{
            const checkProduct =  await  productModel.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is already in shop'
                })
            }
            const addedProduct = await productModel.create({
                name,
                price,
                brand,
                gender,
                sizes,
                category
            })
            if(addedProduct)
            {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
            
        }
        catch(err)
        {
            console.log(err)
            reject(err)
        }
    })

}

const addProductReview = async(productId,userName,reviewText)=>{
        try {
            const product = await productModel.findById(productId);
            const newReview = {
                name: userName,
                review: reviewText
            };
            // Check if the product exists
            if (!product) {
                resolve({
                    status: 'ERR',
                    message: 'Product not found'
                });
                return;
            }

            product.reviews.push(newReview);


            // Save the updated product to the database
            await product.save();



            return {
                status: 'OK',
                message: 'Review added successfully'
            };
        } catch (error) {
            console.error('Error adding review to product:', error);
            throw error;
        }
    };

const prodsSortedByDate = async () => {
    try {
        const products = await productModel.find().sort({ createdAt: -1 });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Unable to fetch products');
    }
};

const prodsSortedByPrice = async () => {
    try {
        const products = await productModel.find().sort({ price: 1 });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Unable to fetch products');
    }
};

const prodsSortedByPriceDesc = async () => {
    try {
        const products = await productModel.find().sort({ price: -1 });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Unable to fetch products');
    }
};

module.exports = { 
    getAllProducts,
    addProduct,
    getProductDetail,
    getRelatedProducts,
    addProductReview,
    prodsSortedByDate,
    prodsSortedByPrice,
    prodsSortedByPriceDesc
 }