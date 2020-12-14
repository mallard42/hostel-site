const router = require('express').Router();
let Room = require('../models/rooms');

router.route('/').get((req, res) => {
    Room.find()
        .then(room => res.json(room))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const path = name.replace(/ /g, "-");
    const type = req.body.type;
    const price = Number(req.body.price);
    const size = Number(req.body.size);
    const capacity = req.body.capacity;
    const pets = req.body.pets;
    const breakfast = req.body.breakfast;
    const featured = req.body.featured;
    const description = req.body.description;
    const extras = req.body.extras;
    const images = req.body.images;

    const newRoom = new Room(
        {
            name,
            path,
            type,
            price,
            size,
            capacity,
            pets,
            breakfast,
            featured,
            description,
            extras,
            images
        });

    newRoom.save()
           .then(() => res.json('Room added !'))
           .catch(err => {
                res.status(400).json('Error' + err)
                console.log(err)
            })
});

router.route('/:path').get((req, res) => {
    Room.find({path: req.params.path})
        .then(response => {
            console.log(response)
            res.json(response)})
        .catch(err => res.status(400).json('Error:' + err))
});

router.route('/:id').delete((req, res) => {
    Room.findOneAndDelete(req.params.id)
        .then(() => res.json('Room deleted !'))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/update/:id').post((req, res) => {
    Room.findById(req.params.id)
        .then(room => {
            room.name = req.body.name;
            room.type = req.body.type;
            room.path = req.body.name.replace(/ /g, "-");
            room.price = Number(req.body.price);
            room.size = Number(req.body.size);
            room.capacity = req.body.capacity;
            room.pets = req.body.pets;
            room.breakfast = req.body.breakfast;
            room.featured = req.body.featured;
            room.description = req.body.description;
            room.images = req.body.images;
            room.extras = req.body.extras;

            room.save()
                .then(() => res.json('Room updated !'))
                .catch(err => res.status(400).json('Error:' + err))
        })
        .catch(err => res.status(400).json('Error:' + err))
});

router.route('/delete/:id').delete((req, res) => {
    Room.findByIdAndDelete(req.params.id)
        .then(() => res.json("Room deleted !"))
        .catch(err => res.status(400).json('Error:' + err))
})

module.exports = router;