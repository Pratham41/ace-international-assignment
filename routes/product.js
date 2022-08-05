const router = require('express').Router();
const { addProduct, listProduct } = require('../controller/product')

router.route('/add').post(addProduct)
router.route('/').post(listProduct)

module.exports = router;