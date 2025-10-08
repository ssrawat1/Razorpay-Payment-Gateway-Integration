import { rzpInstance as subscriptionInstance } from './services/rzpService.js';

const newSubscriptionObj = await subscriptionInstance.subscriptions.create({
  plan_id: 'plan_RPGXyO1Tft7XEe',
  total_count: 1,
});

const fetchAllSubscriptions = await subscriptionInstance.subscriptions.all();

const fetchSingleSubscriptionWithId =
  await subscriptionInstance.subscriptions.fetch('sub_RQuJSsFAzsKLD5');

const updateSubscription = await subscriptionInstance.subscriptions.update('sub_RQuJSsFAzsKLD5', {
  quantity: 7,
});

const cancelSubscription = await subscriptionInstance.subscriptions.cancel('sub_RQuJSsFAzsKLD5');

const pauseSubscription = await subscriptionInstance.subscriptions.pause('sub_RQuJ6rtYIWSVEM', {
  pause_at: 'now',
});

const resumeSubscription = await subscriptionInstance.subscriptions.resume('sub_RQuJ6rtYIWSVEM', {
  resume_at: 'now',
});

console.log(resumeSubscription);
