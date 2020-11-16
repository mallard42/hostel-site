const router = require('express').Router();
let Type = require('../models/type');

router.route('/').get((req, res) => {
    Type.find()
        .then(type => res.json(type))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/add').post((req, res) => {
    const type = req.body.type;
    const NewType = new Type ({ type });

    NewType.save()
           .then(() => res.json("Type added!"))
           .catch(err => res.status(400).json('Error:' + err))
});

router.route('/update/:id').post((req, res) => {
    Type.findById(req.params.id).then(type => {
        type.name = req.body.type;

        type.save()
            .then(() => res.json('Type updated !'))
            .catch(err => res.status(400).json('Error:' + err))
    })
});

router.route('/delete/:id').delete((req, res) => {
    Type.findByIdAndDelete(req.params.id)
        .then(() => res.json("Type Deleted !"))
        .catch((err) => res.json('Error:' + err))
})

module.exports = router;