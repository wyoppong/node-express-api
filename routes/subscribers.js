const express = require('express');
const subscriber = require('../models/subscriber');
const router = express.Router();
const Subscriber = require("../models/subscriber");

async function getSubsrciber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: 'Subcriber not found'});
        }
    } catch (error) {
       return res.status(500).json({ message: error.message }); 
    }

    res.subscriber = subscriber;
    next();
}

router.get('/', async (req, res) => {
    // res.send("Hello wiz");

    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', getSubsrciber, (req, res) => {
    res.send(res.subscriber.name);  
});

router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        channel: req.body.channel 
    });
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({message: error.message });
    }
});

router.patch('/:id', getSubsrciber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    } 
    if (req.body.channel != null) {
        res.subscriber.channel = req.body.channel;
    }
    
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber); 
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.delete('/:id', getSubsrciber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({message: "Subsriber deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;