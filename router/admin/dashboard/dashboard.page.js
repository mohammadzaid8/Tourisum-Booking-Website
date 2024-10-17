const express = require('express');
const isLoggedIn = require('../../../middleware/authentification.owner');
const router = express.Router();

router.get('/',isLoggedIn, (req, res) => {
            res.render('../views/admin/dashboard/dashboard');      
});



module.exports = router;
