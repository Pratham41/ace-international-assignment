import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_FAIL, PRODUCT_ADD_SUCCESS } from '../constants/product'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, products: [] };
      case PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
export const productAddReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_ADD_REQUEST:
        return { loading: true };
      case PRODUCT_ADD_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_ADD_FAIL:
        return { loading: false, error: action.payload };

      default:
        return state;
    }
  };