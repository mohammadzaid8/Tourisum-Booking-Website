const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const auth = req.session.auth || false;
            res.render('main/tours',{auth});       
});

module.exports = router;
