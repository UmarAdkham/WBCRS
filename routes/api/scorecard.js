const express = require("express");
const router = express.Router();
const dateFormat = require('dateformat');

const Question = require("../../models/Question");
const Option = require("../../models/Option");
const Model = require("../../models/Model");
const Scorecard = require("../../models/Scorecard");

// @route POST api/scorecard/createScorecard
// @desc Create Scorecard
// @access Public
router.post("/createScorecard", (req, res) => {
    console.log(req.body);
    const dateCreated = dateFormat(req.body.dateCreated, "dd/mm/yyyy");
    const newScorecard = new Scorecard({
        obligorID: req.body.obligorID,
        dateCreated: dateCreated,
        model: req.body.model,
        value: req.body.value
    });
    newScorecard.save().then(scorecard => res.json(scorecard))
    .catch(err => console.log(err));
});

//Display Scorecard
router.post("/displayScorecards", (req, res) => {
    const obligorID = req.body.obligorID;
	Scorecard.find({obligorID: obligorID}).then(scorecard => res.json(scorecard))
	.catch(err => console.log(err));
});

// @route POST api/scorecard/createModel
// @desc Create Model
// @access Public
router.post("/createModel", (req, res) => {
    Model.findOne({ name: req.body.name }).then(model => {
        if (model) {
          return res.status(400).json({ name: "Model name already exists" });
        } else {
            const newModel = new Model({
                name: req.body.name
            });
            newModel.save().then(model => res.json(model))
            .catch(err => console.log(err));
        }
    })
});

//Display Models
router.get("/displayModels", (req, res) => {
	Model.find({}).then(model => res.json(model))
	.catch(err => console.log(err));
});



// @route POST api/scorecard/createQuestion
// @desc Create Question
// @access Public
router.post("/createQuestion", (req, res) => {
    const newQuestion = new Question({
        description: req.body.description,
        type: req.body.type, 
        model: req.body.model
    });
    newQuestion.save().then(question => res.json(question))
    .catch(err => console.log(err));
});


//Display questions
router.post("/displayQuestions", (req, res) => {
    //type and model are used to search for related questions
    const type = req.body.type;
    const model = req.body.model;
    console.log(type);
    //const type = 1;
	Question.find({type: type, model:model}).then(question => res.json(question))
	.catch(err => console.log(err));
});


// @route POST api/scorecard/createOption
// @desc Create Option
// @access Public
router.post("/createOption", (req, res) => {
    const newOption = new Option({
        questionID: req.body.questionID, 
        description: req.body.description,
        value: req.body.value
    });
    newOption.save().then(option => res.json(option))
    .catch(err => console.log(err));
});

//Display Options
router.get("/displayOptions", (req, res) => {
    //const questionID = req.body.questionID
	Option.find({}).then(option => res.json(option))
	.catch(err => console.log(err));
});


module.exports = router;
