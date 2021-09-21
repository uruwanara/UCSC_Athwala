module.exports = productRoutes => {
  const product = require("../controllers/product.controller");

  var router = require("express").Router();

  //retrieve all the details of products
  router.get("/viewall",product.viewAllProducts);

  //retrieve selected product details
  router.post("/viewdetail", product.productDetails);

   //retrieve selected product details more
   router.post("/viewdetailmore", product.productDetailsMore);

   //retrive all the my Sell product
  router.get("/viewmyallSellProduct",product.viewMyallSellProduct);

   //Sell note 
   router.post("/sellNote",product.sellNote);

    //Sell note 
    router.post("/sellDevice",product.sellDevice);

     //Sell Other
   router.post("/sellOther",product.sellOther);

   //retrive all the my Buy productdeleteProduct
   router.post("/viewmyallBuyProduct",product.viewMyallBuyProduct);

   // delete product history
   router.post("/deleteProductHistory",product.deleteProductHistory);

    //delete product
   router.post("/deleteProduct",product.deleteProduct);

   //device form edit
    router.post("/productDeviceFormEdit",product.productDeviceEdit);

    //note form edit
    router.post("/productNoteFormEdit",product.productNoteEdit);

    //other form edit
    router.post("/productOtherFormEdit",product.productOtherEdit);



 productRoutes.use('/api/products', router);
};