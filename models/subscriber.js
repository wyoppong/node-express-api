const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   }, 
   channel: {
       type: String,
       required: true
   }, 
   subscription_date: {
       type: String,
       required: true,
       default: Date.now
   }
});

module.exports = mongoose.model('Subscriber', subscriberSchema);