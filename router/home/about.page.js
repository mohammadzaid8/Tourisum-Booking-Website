const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const auth = req.session.auth || false;
            res.render('../views/main/about',{ auth});
        
       
});

module.exports = router;
