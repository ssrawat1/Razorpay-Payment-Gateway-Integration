import { verifyRzpOrderId } from './api/rzpApi';
import { RZP_KEY } from './config';

const OpenRzpPopup = ({ orderId, user, course, onClose }) => {
  const rzp = new Razorpay({
    key: RZP_KEY,
    amount: course.price,
    currency: 'INR',
    name: user.name, // business name
    image: 'http://localhost:5173/drive.jpg',
    notes: {
      courseId: course.id,
      courseName: course.name,
    },
    theme: '#528FF0',
    order_id: orderId,
    prefill: {
      name: 'sanjay singh rawat',
      email: 'ssr911999@gmail.com',
      contact: '+918847465410',
    },
    handler: async function (res) {
      console.log(res);
      console.log(res.razorpay_payment_id);
      console.log(res.razorpay_order_id);
      console.log(res.razorpay_signature);
      const orderPayload = {
        paymentId: res.razorpay_payment_id,
        orderId: res.razorpay_order_id,
        signature: res.razorpay_signature,
      };
      const {
        data: { success, orderStatus },
      } = await verifyRzpOrderId(orderPayload);
      onClose();
      if (success && orderStatus === 'paid') {
        confirm('Order Completed');
      } else {
        confirm('Order Not Completed');
      }
    },
    description: `User Purchase ${course.name} while paying RS${course.price}`,
  });

  rzp.open();

  rzp.on('payment.failed', function (response) {
    console.log(response.error);
  });

  return rzp;
};

export default OpenRzpPopup;
