const Products = require("../model/product");

exports.addProduct = async (req, res) => {
  const { productname, vat, quantity, netprice, grossprice } = req.body;
  try {
    let vatValue = parseFloat(vat);
    let qtyValue = parseFloat(quantity);
    let netValue = parseFloat(netprice);
    let grossValue = parseFloat(grossprice);
    const newProduct = await Products.create({
      productname,
      vat: vatValue,
      quantity: qtyValue,
      netprice: netValue,
      grossprice: grossValue,
    });
    if (newProduct) {
      return res.status(201).json(newProduct);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error !");
  }
};

exports.listProduct = async (req, res) => {
  try {
    const allProducts = await Products.find({}).sort({ _id: -1 });
    if (allProducts) {
      return res.status(201).json(allProducts);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error !");
  }
};
