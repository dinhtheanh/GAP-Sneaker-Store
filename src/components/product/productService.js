const async = require('hbs/lib/async.js');
const mongoose = require('mongoose');

const productModel = require('./productModel.js'); // requiring the data model for product
const getMinPrice = (selectedPrices, priceRanges) => {
    return Math.min(...selectedPrices.map(price => priceRanges[price].min));
};

const getMaxPrice = (selectedPrices, priceRanges) => {
    return Math.max(...selectedPrices.map(price => priceRanges[price].max));
};
const updateStock = async (productid,quantity) =>{
    
    const product = await productModel.findById(productid);
    product.stock -= quantity;
    console.log("Updating stock: ",product)

    await product.save();
    return product;
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
const getProductByName = async (data) => {
    try {
        const products = await productModel.find({ name: { $regex: new RegExp(data, 'i') } }).exec();;

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Unable to fetch products');
    }
};
const getProductById = async (productIds) =>{
    try{
        const products = await productModel.find({ _id: { $in: productIds } });
        
        return products;
    }catch (error) {
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

const addProduct = async (name,price,category,size,color,brand,image) => {
        try {
            const checkProduct = await productModel.findOne({
                name: name
            })
            if (checkProduct !== null) {
                return {
                    status: 'ERR',
                    message: 'The product is already in shop'
                }
            }
            const addedProduct = await productModel.create({
                _id: new mongoose.Types.ObjectId(),
                name,
                price,
                manufacturer: brand,
                size,
                color,
                category,
                img:image
            });

            return addedProduct;
            
            

        }
        catch (err) {
            console.log(err)
            throw(err)
        }
    

}

const findProduct = async (keyword, cateFilter, manuFilter, sort) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {};
            query['category'] = cateFilter;
            query['manufacturer'] = manuFilter;
            query['name'] = new RegExp(keyword, 'i');

            let sortby;
            if (sort === 'priceasc') {
                sortby = 'price';
            } else if (sort === 'pricedes'){
                sortby = '-price';
            } else if (sort === 'timeasc'){
                sortby = 'createdAt';
            } else if (sort === 'timedes'){
                sortby = '-createdAt';
            }
            console.log(query);
            const products = await productModel.find(query).sort(sortby).exec();
            resolve(products);
        } catch (error){
            reject(error);
        }
    });
}

const addProductImage = async (productId, image) => {
    try {
        const result = await productModel.findByIdAndUpdate({ _id: productId }, {$push: { img: image }}, { new: true });
        return result;
    } catch (error) {
        console.error('Error adding image to product:', error);
        throw error;
    }
}

const deleteProductImage = async (productId, image) => {   
    try {
        const newProduct = await productModel.findByIdAndUpdate({ _id: productId }, {$pull: { img: image }}, { new: true });
        return newProduct;
    } catch (error) {
        console.error('Error deleting image to product:', error);
        throw error;
    }

}

const updateProduct = (productId, name, price, stock, category, manufacturer) => {
    return productModel.findByIdAndUpdate({ _id: productId }, { name: name, price: price, stock: stock, category: category, manufacturer: manufacturer }, { new: true });
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

const prodsSortedByDate = async (products) => {
        

    return products.sort((a, b) => a.createdAt - b.createdAt);

 
};

const prodsSortedByPrice = async (products) => {
    
    return products.sort((a, b) => a.price - b.price);

  
};

const prodsSortedByPriceDesc = async (products) => {
       
    return products.sort((a, b) => b.price - a.price);

};
const getHighestProduct = async()=>{
    try {
        const highest = await productModel.findOne()
          .sort({ price: -1 }) // Sort by createdAt in descending order
          .limit(1); // Limit the result to 4 documents
        return highest;
      } catch (error) {
        console.error('Error retrieving latest products:', error);
        throw error;
      }
    };

const getLatestProducts = async () => {
    try {
      const latestProducts = await productModel.find()
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .limit(4); // Limit the result to 4 documents
      return latestProducts;
    } catch (error) {
      console.error('Error retrieving latest products:', error);
      throw error;
    }
  };

  const getExProduct = async () => {
    try {
      const expensivProduct = await productModel.find()
        .sort({ price: -1 }) // Sort by createdAt in descending order
        .limit(4); // Limit the result to 4 documents
  
      return expensivProduct;
    } catch (error) {
      console.error('Error retrieving latest products:', error);
      throw error;
    }
  };
  
  
module.exports = {
    getLatestProducts,
    getAllProducts,
    addProduct,
    getProductDetail,
    getRelatedProducts,
    addProductReview,
    prodsSortedByDate,
    prodsSortedByPrice,
    prodsSortedByPriceDesc,
    getFilteredProducts,
    findProduct,
    addProductImage,
    deleteProductImage,
    updateProduct,
    getProductById,
    updateStock,
    getProductByName,
    getExProduct,
    getHighestProduct
}