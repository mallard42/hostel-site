const router = require('express').Router();
let Extra = require('../models/extra');

router.route('/').get((req, res) => {
    Extra.find()
         .then(extra => res.json(extra))
         .catch(err => res.status(400).json('Error' + err))
});

router.route('/:path').get((req, res) => {
    Extra.find({path: req.params.path})
         .then(response => res.json(response))
         .catch(err => res.status(400).json('Error:' + err))
});

router.route('/add').post((req, res) => {
    const name = req.body.name.trim().replace(/[\s]{2,}/g," ");
    const path = name.replace(/ /g, "-");

    const NewExtra = new Extra ({ name, path });

    NewExtra.save()
            .then(() => res.json("Extra added!"))
            .catch(err => res.status(400).json('Error:' + err))
});

router.route('/update/:id').post((req, res) => {
    Extra.findById(req.params.id).then(extra => {
        extra.name = req.body.name.trim().replace(/[\s]{2,}/g," ");
        extra.path = extra.name.replace(/ /g, "-");

        extra.save()
             .then(() => res.json('Extra updated !'))
             .catch(err => res.status(400).json('Error:' + err))
         
    }).catch(err => res.status(400).json('Error:' + err))
});

router.route('/delete/:id').delete((req, res) => {
    Extra.findByIdAndDelete(req.params.id)
        .then(() => res.json("Extra deleted !"))
        .catch(err => res.status(400).json('Error:' + err))
})

module.exports = router;