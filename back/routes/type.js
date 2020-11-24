const router = require('express').Router();
let Type = require('../models/type');

router.route('/').get((req, res) => {
    Type.find()
        .then(type => res.json(type))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/:path').get((req, res) => {
    Type.find({path: req.params.path})
        .then(response => res.json(response))
        .catch(err => res.status(400).json('Error:' + err))
});

router.route('/add').post((req, res) => {
    const name = req.body.name.trim().replace(/[\s]{2,}/g," ");
    const path = name.replace(/ /g, "-");

    const NewType = new Type ({ name, path });

    NewType.save()
           .then(() => res.json("Type added!"))
           .catch(err => res.status(400).json('Error:' + err))
});

router.route('/update/:id').post((req, res) => {
    Type.findById(req.params.id).then(type => {
        type.name = req.body.name.trim().replace(/[\s]{2,}/g," ");
        type.path = type.name.replace(/ /g, "-");

        type.save()
            .then(() => res.json('Type updated !'))
            .catch(err => res.status(400).json('Error:' + err))
         
    }).catch(err => res.status(400).json('Error:' + err))
});

router.route('/delete/:id').delete((req, res) => {
    Type.findByIdAndDelete(req.params.id)
        .then(() => res.json("Type deleted !"))
        .catch(err => res.status(400).json('Error:' + err))
})

module.exports = router;