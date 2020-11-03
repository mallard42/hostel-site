const router = require('express').Router();
let Extra = require('../models/extra');

router.route('/').get((req, res) => {
    Extra.find()
          .then(extra => res.json(extra))
          .catch(err => res.status(400).json('Error' + err))
});

router.route('/add').post((req, res) => {
    const extra = req.body.extra;
    const NewExtra = new Extra({ extra });

    NewExtra.save()
            .then(() => res.json("Extras added !"))
            .catch(err => res.status(400).json('Error:' + err))
});

router.route('/update/:id').post((req, res) => {});

module.exports = router;
