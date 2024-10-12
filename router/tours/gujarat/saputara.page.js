const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    
            res.render('tour/gujarat/saputara');       
});

module.exports = router;
