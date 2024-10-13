const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    
            res.render('tour/kashmir/manali');       
});

module.exports = router;
