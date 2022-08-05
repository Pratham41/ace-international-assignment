const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
      productname: {
        type: String,
        required: true,
      },
      vat: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      netprice: {
        type: Number,
        required: true,
      },
      grossprice: {
        type: Number,
        required: true,
      },

    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model('Products', productSchema);