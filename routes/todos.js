var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('meandb', ['todos']);

/* GET All Todos */
router.get('/todo', function(req, res, next) {
    db.todos.find().sort({
        initialDate: 1
    }, function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

/* GET One Todo with the provided ID */
router.get('/todo/:id', function(req, res, next) {
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

/* POST/SAVE a Todo */
router.post('/todo', function(req, res, next) {
    var todo = req.body;
    console.log(todo);

    if (todo.body) {
        res.status(400);
        res.json({"error": "Invalid Data"});
    } else {
        db.todos.save(todo, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});

/* PUT/UPDATE a Todo */
router.put('/todo/:id', function(req, res, next) {
    var todo = req.body;

    if (!todo) {
        res.status(400);
        res.json({"error": "Invalid Data"});
    } else {
        var update = {
            $set: {
                name: todo.name,
                initialDate: todo.initialDate,
                finalDate: todo.finalDate
            }
        }

        console.log(update);

        var query = {
            _id: mongojs.ObjectId(req.params.id)
        }

        db.todos.update(query, update, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

/* DELETE a Todo */
router.delete('/todo/:id', function(req, res) {
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });

});

module.exports = router;
