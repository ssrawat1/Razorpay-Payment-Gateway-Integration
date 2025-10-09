import express from 'express';
import crypto from 'crypto';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Listening Subscriptions Events Using Razorpay Webhook' });
});

app.post('/rzp-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  console.log(req.headers);

  const preGeneratedSignature = req.headers['x-razorpay-signature'];

  const selfGeneratedSignature = crypto
    .createHmac('sha256', process.env.RZP_WEBHOOK_SECRET)
    .update(req.body.toString())
    .digest('hex');

  if (selfGeneratedSignature !== preGeneratedSignature) {
    return res.send.json({ message: "You don't have right permissions" });
  }
  /* Here we write backend logic */

  res.sendStatus(200);
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on address, http://localhost:${PORT}`);
});

//Webhook Secret: 653b15fdd511350acd6f98a394325a498e61e29dd73ab3ece65814b890a3834b
