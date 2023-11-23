const async = require('hbs/lib/async.js');
const productModel = require('./productModel.js'); // requiring the data model for product

const getAllProducts = async () => {
    try {
        const products = await productModel.find();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Unable to fetch products');
    }
};
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

module.exports = { 
    getAllProducts,
    addProduct
 }