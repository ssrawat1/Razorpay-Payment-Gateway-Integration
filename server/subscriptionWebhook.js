import express from 'express';
import customVerifyWebhookSignature from './middleware/customVerifyWebhookSignature.js';
import verifyWebhookSignature from './middleware/verifyWebhookSignature.js';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Listening Subscriptions Events Using Razorpay Webhook' });
});

app.post('/rzp-webhook', (req, res) => {
  const signature = req.headers['x-razorpay-signature'];

  const isVerified = verifyWebhookSignature({ body: JSON.stringify(req.body), signature });
  console.log({ isVerified });

  if (!isVerified) {
    return res.send.json({ message: "You don't have right permissions" });
  }
  res.sendStatus(200);
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on address, http://localhost:${PORT}`);
});

//Webhook Secret: 653b15fdd511350acd6f98a394325a498e61e29dd73ab3ece65814b890a3834b
