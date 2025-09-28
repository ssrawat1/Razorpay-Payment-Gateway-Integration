import axiosInstance from './axiosInstance';

export const createRzpOrderId = async (data) => {
  const res = axiosInstance.post('/rzp/create-order', data);
  console.log(await res)
  return res;
};

export const verifyRzpOrderId = async (orderData) => {
  const orderStatus = axiosInstance.post('/rzp/verify-order', orderData);
  return orderStatus;
};
