var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('meandb', ['stories']);

/* GET All Todos */
router.get('/story', function(req, res, next) {
    db.stories.find(function(err, stories) {
        if (err) {
            res.send(err);
        } else {
            res.json(stories);
        }
    });
});

/* GET One Todo with the provided ID */
router.get('/story/:id', function(req, res, next) {
    db.stories.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, stories) {
        if (err) {
            res.send(err);
        } else {
            res.json(stories);
        }
    });
});

/* POST/SAVE a Todo */
router.post('/story', function(req, res, next) {
    var story = req.body;
    console.log(story);

    if (story.body) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.stories.save(story, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});

/* PUT/UPDATE a Todo */
router.put('/story/:id', function(req, res, next) {
    var story = req.body;

    if (!story) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        var update = {
          // SET model = 'iPad 3'
          $set: { order: story.order, _sprintId: story._sprintId }
        };
        console.log(update);

        var query = {
            _id: mongojs.ObjectId(req.params.id)
        }

        db.stories.update(query, update, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }


});

/* DELETE a Todo */
router.delete('/story/:id', function(req, res) {
    db.stories.remove({
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
