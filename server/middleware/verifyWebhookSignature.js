import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils.js';

export default function verifyWebhookSignature({ body, signature }) {
  return validateWebhookSignature(body, signature, process.env.RZP_WEBHOOK_SECRET);
}
