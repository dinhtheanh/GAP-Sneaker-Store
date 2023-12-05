const async = require('hbs/lib/async.js');
const productModel = require('./productModel.js'); // requiring the data model for product
const { default: mongoose } = require('mongoose');
const getMinPrice = (selectedPrices, priceRanges) => {
    return Math.min(...selectedPrices.map(price => priceRanges[price].min));
};

const getMaxPrice = (selectedPrices, priceRanges) => {
    return Math.max(...selectedPrices.map(price => priceRanges[price].max));
};

const getFilteredProducts = async (selectedCategories, selectedColors, selectedManufacturer, selectedPrices) => {
    try {
        const priceRanges = {
            1: { min: 0, max: 50 },
            2: { min: 50, max: 100 },
            3: { min: 100, max: 150 },
            4: { min: 150, max: Infinity }, // For values >150
        };
        let query = {};
        if (selectedCategories && selectedCategories.length > 0) {
            query.category = { $in: selectedCategories };
        }

        if (selectedColors && selectedColors.length > 0) {
            query.color = { $in: selectedColors };
        }

        if (selectedManufacturer && selectedManufacturer.length > 0) {
            query.manufacturer = { $in:selectedManufacturer};
        }
        

        if (selectedPrices && selectedPrices.length > 0) {
            query.price = { $gte: getMinPrice(selectedPrices, priceRanges), $lt: getMaxPrice(selectedPrices, priceRanges) };        
        }    
        
       const filteredProducts =  await productModel.find(query);



        return filteredProducts;
    } catch (error) {
        console.error('Error getting filtered products:', error);
        throw error;
    }
};
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
            _id: { $ne: productID }
        });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Unable to fetch products');
    }
}

const addProduct = async (productData) => {
    return new Promise(async (resolve, reject) => {
        const { name, price, brand, gender, sizes, category } = productData
        try {
            const checkProduct = await productModel.findOne({
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
            if (addedProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }

        }
        catch (err) {
            console.log(err)
            reject(err)
        }
    })

}

const addProductReview = async (productId, userName, reviewText) => {
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
    prodsSortedByPriceDesc,
    getFilteredProducts
}