const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
            res.render('../views/main/contact');       
});

module.exports = router;
