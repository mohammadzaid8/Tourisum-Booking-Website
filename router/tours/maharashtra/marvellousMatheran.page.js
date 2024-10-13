const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {    
            res.render('tour/maharashtra/marvellousMatheran');       
});

module.exports = router;
