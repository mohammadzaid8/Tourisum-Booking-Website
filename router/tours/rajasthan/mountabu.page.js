const express = require('express');
const router = express.Router();

const Tour = require('../../../model/admin/tour/owner.tour.model');

router.get('/', async (req, res) => {
    const auth = req.session.auth || false;

    try {
        // Query the database for tours with location 'Manali'
        const mountabuTours = await Tour.find({ location: 'mountabu' });


        if (mountabuTours.length === 0) {
            // If no tours are found, you can handle it here (optional)
            return res.render('tour/rajasthan/mountabu', { auth, tours: [], message: "No tours available for Mountabu." });
        }

        // Render the 'manali' page and pass the tour data along with auth status
        res.render('tour/rajasthan/mountabu', { auth, tours: mountabuTours });

    } catch (error) {
        // Handle any errors (e.g., database connection issues)
        console.error('Error fetching tours for mountabu:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
