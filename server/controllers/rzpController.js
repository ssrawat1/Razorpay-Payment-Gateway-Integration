import { createRzpPaymentOrder, verifyRzpOrderId } from '../services/rzpService.js';
import orders from '../orders.json' with { type: 'json' };
import { writeFile } from 'fs/promises';
import courses from '../courses.json' with { type: 'json' };

export const createOrder = async (req, res, next) => {
  const { courseId, user } = req.body;
  /* finding price corresponding to the resource from backend : */
  const course = courses.find((course) => course.id === courseId);

  if (!course) {
    return res.status(400).json({ success: false, error: 'resource does not exist' });
  }

  const existingOrder = orders.find(
    (order) => order.user.name == user.name && order.courseId === courseId
  );

  if (existingOrder?.orderStatus === 'paid') {
    return res.status(200).json({
      success: true,
      message: 'You have already purchased it',
      orderStatus: existingOrder.orderStatus,
    });
  }

  if (existingOrder?.orderStatus === 'created') {
    return res.status(201).json({
      success: true,
      orderId: existingOrder.orderId,
      orderStatus: existingOrder.orderStatus,
    });
  }

  try {
    const order = await createRzpPaymentOrder({
      amount: course.price,
      courseName: course.name,
      courseId,
    });

    if (order.status !== 'created') {
      return res.status(400).json({ success: false, error: 'Order creation Failed' });
    }
    orders.push({
      orderId: order.id,
      orderStatus: order.status,
      amount: course.price,
      courseId,
      courseName: course.name,
      user,
    });
    console.log('Order details:', order);
    await writeFile('./orders.json', JSON.stringify(orders, 0, 2));
    return res.status(201).json({ success: true, orderId: order.id, orderStatus: order.status });
  } catch (error) {
    console.log('Error occur while creating order:', error);
    return res.status(500).json({ success: false, error: 'Server response is not ok' });
  }
};

export const verifyOrderId = async (req, res, next) => {
  const { paymentId, orderId, signature } = req.body;

  if (!orderId) {
    return res.status(400).json({ success: false, error: 'Order ID not provided' });
  }

  try {
    const order = await verifyRzpOrderId({ orderId });

    if (order?.status !== 'paid') {
      return res.status(400).json({ success: false, error: 'Invalid or unpaid order' });
    }

    const createdOrder = orders.find((order) => order.orderId === orderId);

    if (!createdOrder) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    createdOrder.orderStatus = order.status;
    createdOrder.paymentId = paymentId;
    createdOrder.signature = signature;

    await writeFile('./orders.json', JSON.stringify(orders, null, 2));
    return res.json({
      success: true,
      message: 'Payment successfully received',
      orderStatus: order.status,
    });
  } catch (error) {
    console.log('Error while verifying order id:', error);
    return res.status(500).json({ success: false, error: 'Server response is not ok' });
  }
};
