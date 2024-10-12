const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {    
            res.render('tour/rajasthan/mountabu');       
});

module.exports = router;
