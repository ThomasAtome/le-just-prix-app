const router = require('express').Router();

router.get('/game/:username/:objectId', (req, res) => {
    res.render('game', {
        username: req.params.username,
        product: require('../objects')[req.params.objectId]
    });
});

module.exports = router;
