function isLoggedIn(req, res, next) {
    if (req.session && req.session.owner) {
        // If the user is logged in, proceed to the next middleware/route handler
        return next();
    }
    // If not logged in, redirect to the login page or render an error
    return res.render('../views/admin/admin', { error: 'Please log in to access this page' });
}

module.exports = isLoggedIn;