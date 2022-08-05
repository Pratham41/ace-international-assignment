import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_FAIL, PRODUCT_ADD_SUCCESS } from '../constants/product'



export const listProducts = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.post(
        '/aceinternational/products',
        {},
        config
      );  
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error });
    }
  };
  
  export const addProduct = (productname,vat,quantity,netprice,grossprice) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_ADD_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.post(
        '/aceinternational/products/add',
        { productname,vat,quantity,netprice,grossprice },
        config
      );
  
      dispatch({
        type: PRODUCT_ADD_SUCCESS,
        payload: data,
      });
      dispatch(listProducts())
    } catch (error) {
      dispatch({
        type: PRODUCT_ADD_FAIL,
        payload: error.message,
      });
    }
  };