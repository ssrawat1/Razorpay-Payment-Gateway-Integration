import crypto from 'crypto';

export default function customVerifyWebhookSignature({ payload, preGeneratedSignature }) {
  const selfGeneratedSignature = crypto
    .createHmac('sha256', process.env.RZP_WEBHOOK_SECRET)
    .update(payload.toString())
    .digest('hex');

  return selfGeneratedSignature === preGeneratedSignature;
}
