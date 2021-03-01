const express = require('express');
const router = express.Router();
const data = require('../../../data');

router.get('/all', (req, res) => {
    res.json(data)
});

router.get('/:id', (req, res) => {
    const isFound = data['persons'].some(person => person.id === parseInt(req.params.id));
    if (isFound) {
        const persons = data['persons'].filter(p => p.id === parseInt(req.params.id));
        res.json({persons});
    } else {
        res.status(400).json({msg: `There is no person with the id: ${req.params.id}`});
    }
})

module.exports = router;