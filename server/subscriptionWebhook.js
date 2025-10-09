import express from 'express';
import customVerifyWebhookSignature from './middleware/customVerifyWebhookSignature.js';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Listening Subscriptions Events Using Razorpay Webhook' });
});

app.post('/rzp-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const preGeneratedSignature = req.headers['x-razorpay-signature'];

  const isVerified = customVerifyWebhookSignature({ payload: req.body, preGeneratedSignature });
  /* Here we write backend logic */
  console.log(isVerified);
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
