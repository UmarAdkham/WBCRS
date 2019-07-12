const express = require("express");
const router = express.Router();
const dateFormat = require('dateformat');
//validation
const validateObligorInput = require("../../validation/createObligor");
//Load Obligor module
const Obligor = require("../../models/Obligor");
const Industry = require("../../models/Industry");
const Country = require("../../models/Country");

// @route POST api/obligors/createObligor
// @desc Create Obligor
// @access Public
router.post("/createObligor", (req, res) => {
	// Form validation
  	const { errors, isValid } = validateObligorInput(req.body);

	//check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	Obligor.findOne({ cifNo: req.body.cifNo }).then(obligor => {
		if (obligor) {
			return res.status(400).json({ cifNo: "CIF No already exists" });
		} else {
			const dateCreated = dateFormat(req.body.dateCreated, "mmm d yyyy");
			const newObligor = new Obligor({
				name: req.body.name,
				cifNo: req.body.cifNo, 
				country: req.body.country,
				industry: req.body.industry, 
				clerkName: req.body.clerkName,
				dateCreated: dateCreated
			});
			newObligor.save().then(obligor => res.json(obligor))
            .catch(err => console.log(err));
		}
	});
});


// @route GET api/obligors/displayObligors
// @desc Display Obligor
// @access Public
router.get("/displayObligors", (req, res) => {
	Obligor.find({}).then(obligor => res.json(obligor))
	.catch(err => console.log(err));
});


// @route POST api/obligors/createIndustry
// @desc Create Industry
// @access Public
router.post("/createIndustry", (req, res) => {
	Industry.findOne({ name: req.body.name }).then( industry => {
		if (industry) {
			return res.status(400).json({ name: "Industry name already exists" });
		} else {
			const newIndustry = new Industry({
				name: req.body.name
			});
			newIndustry.save().then(industry => res.json(industry))
			.catch(err => console.log(err));
		}
	});
});

router.get("/displayIndustries", (req, res) => {
	Industry.find({}).then(industry => res.json(industry))
	.catch(err => console.log(err));
});


// @route POST api/obligors/deleteIndustry
// @desc Delete Industry
// @access Public
router.delete("/deleteIndustry", function (req, res) {
	Industry.deleteOne({ name: req.body.name }).then( industry => {
		res.json(industry)
		.catch(err => console.log(err));
	});
  });


// @route POST api/obligors/addCountry
// @desc Add Country
// @access Public
router.post("/addCountry", (req, res) => {
	Country.findOne({ name: req.body.name }).then( country => {
		if (country) {
			return res.status(400).json({ name: "Country name already exists" });
		} else {
			const newCountry = new Country({
				name: req.body.name
			});
			newCountry.save().then(country => res.json(country))
			.catch(err => console.log(err));
		}
	});
});

//Display countries
router.get("/displayCountries", (req, res) => {
	Country.find({}).then(country => res.json(country))
	.catch(err => console.log(err));
});


//Delete country
router.delete("/deleteCountry", function (req, res) {
	Country.deleteOne({ name: req.body.name }).then( country => {
		res.json(country)
		.catch(err => console.log(err));
	});
  });



module.exports = router;
