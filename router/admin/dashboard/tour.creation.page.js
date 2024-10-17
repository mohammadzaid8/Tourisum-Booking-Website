const express = require('express');
const router = express.Router();
const Tour = require('../../../model/admin/tour/owner.tour.model');
const islog=require('../../../middleware/authentification.owner');

// Route to render tour creation page
router.get('/',islog, (req, res) => {
    res.render('../views/admin/dashboard/tourcreation', { message: null });
});

// Handle tour creation form submission
router.post('/', async (req, res) => {
    const { title, location, description, price, date } = req.body;
    
    try {
        const newTour = new Tour({ title, location, description, price, date });
        await newTour.save();
        res.redirect(`/tours/${location.toLowerCase()}`); // Redirect to the location-specific page
    } catch (error) {
        console.error('Error creating tour:', error);
        res.status(500).render('../view/admin/dashboard/createtour', { message: 'Failed to create tour. Try again later.' });
    }
});

module.exports = router;
