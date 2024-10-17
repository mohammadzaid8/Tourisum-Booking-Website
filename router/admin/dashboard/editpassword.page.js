const express = require('express');
const router = express.Router();
const owner = require('../../../model/admin/owners/owners.model'); 
const isLoggedIn = require('../../../middleware/authentification.owner');

// Route to render the edit password page
router.get('/', isLoggedIn, (req, res) => {
    res.render('admin/dashboard/editpassword', { message: null });
});

// Verify and update password without OTP
router.post('/verify', isLoggedIn, async (req, res) => {
    const { password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.render('admin/dashboard/editpassword', { message: 'Passwords do not match!' });
    }

    try {
        const userEmail = req.session.owner;

        // Update the user's password directly in the database (no encryption)
        await owner.updateOne({ email:userEmail.email }, { password: password });

        res.render('admin/dashboard/editpassword', { message: 'Password updated successfully!' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).render('admin/dashboard/editpassword', { message: 'An error occurred. Please try again later.' });
    }
});

module.exports = router;
