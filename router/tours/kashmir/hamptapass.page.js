const express = require('express');
const router = express.Router();

const Tour = require('../../../model/admin/tour/owner.tour.model');

router.get('/', async (req, res) => {
    const auth = req.session.auth || false;

    try {
        // Query the database for tours with location 'Manali'
        const hamptapassTours = await Tour.find({ location: 'hamptapass' });


        if (hamptapassTours.length === 0) {
            // If no tours are found, you can handle it here (optional)
            return res.render('tour/kashmir/hamptapass', { auth, tours: [], message: "No tours available for Manali." });
        }

        // Render the 'manali' page and pass the tour data along with auth status
        res.render('tour/kashmir/hamptapass', { auth, tours: hamptapassTours });

    } catch (error) {
        // Handle any errors (e.g., database connection issues)
        console.error('Error fetching tours for hamptapass:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
