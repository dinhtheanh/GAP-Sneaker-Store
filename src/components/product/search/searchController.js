const Services = require("../productService.js");
const async = require('hbs/lib/async')
const productModel = require('../productModel.js')
const getSearchProducts = async (req,res)=>{
    try {
        let payload = req.body.payload.trim();
        
        let search = await productModel.find({ name: { $regex: new RegExp(payload, 'i') } }).exec();


        search = search.slice(0,7);
        // Perform any additional logic here

        // Send a response back to the client
        res.status(200).send({ result: 'success', payload: search });
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Internal server error' });
    }
};

  
module.exports = {
   getSearchProducts,
}