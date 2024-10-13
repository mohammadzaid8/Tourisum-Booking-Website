const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    
            res.render('tour/kashmir/hamptapass');       
});

module.exports = router;
