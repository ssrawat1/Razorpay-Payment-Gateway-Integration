import Razorpay from 'razorpay';

export const rzpInstance = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

export const createRzpPaymentOrder = async ({ amount, courseName, courseId }) => {
  try {
    const order = await rzpInstance.orders.create({
      amount: amount * 100,
      currency: 'INR',
      notes: {
        courseId,
        courseName,
      },
    });
    return order;
  } catch (error) {
    return error;
  }
};

export const verifyRzpOrderId = async ({ orderId }) => {
  try {
    const order = await rzpInstance.orders.fetch(orderId);
    return order;
  } catch (error) {
    return error;
  }
};
