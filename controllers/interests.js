const User = require('../models/user')

function index(req, res, next) {
    console.log(req.user)
    res.render('index', {user: req.user})
};


function newInterest (req,res) {
    res.render('new', {user: req.user})
};

function showSuggestion (req,res) {
    let interests = req.body.interests;
    let suggestion = "";
    console.log(req.body.interests)
    if (interests === 'Visual Arts') {
        suggestion = "Consider posing as a fictitious modern artist in order to enact revenge on those who have art-shamed you in the past. May we suggest the pseudonym Art Vanderlay?" 
    } else if (interests === "Performing Arts")  {
        suggestion = "Consider a small role on One Life To Live (is that still on?) where your questionable acting chops will be on display for all to see."
    } else if (interests === "Communication and Media") {
        suggestion = "Consider becoming influential enough on social media that a single bikini-clad photo can trigger an influx of voter registration or record-breaking lipstick sales."
    } else if (interests === "Education") {
        suggestion = "Consider becoming a professional cuddler since the ultra wealthy do not comprehend the meaning of intimacy and will need plenty of guidance."
    } else if (interests === "Government") {
        suggestion = "Seek out a spouse with questionable political aspirations."
    } else if (interests === "Law") {
        suggestion = "Consider attending law school and practicing law in case your sister goes to jail. It happens."
    } else if (interests === "Retail") {
        suggestion = "Develop a line of products that no one really cares for - perhaps socks?"
    } else if (interests === "Technology") {
        suggestion = "Develop an application with your family members as characters and profit off of their image and likeness without their consent."
    } else if (interests === "Event Planning") {
        suggestion = "Consider wedding planning since there is an abundance of short-lived marriages to plan for! We’re all looking at you, Kim. Married for 72 days? Really? That was normal."
    } else if (interests === "Insurance") {
        suggestion = "Consider insurance brokerage - there will always be someone who loses a priceless diamond earring at the bottom of the ocean in Bora Bora. That’s why we have insurance, honey."
    } else if (interests === "Business and Marketing") {
        suggestion = "Trademark™ anything™ and™ everything™"
    }
    res.render('showKrisSuggestions.ejs', {interests: interests, suggestion: suggestion, user: req.user}) 

};

function saveSuggestion(req,res,next) {
    let suggestion = req.body;
    if (req.user) {
        req.user.suggestions.push(req.body);
        req.user.save(function(err) {  
            res.redirect('/interests/savedSuggestions')
        // res.render('savedSuggestions.ejs', {user: req.user});
        }) 
    } 
    else {res.redirect('new')}   
};

function scrapSuggestion (req,res) {
    res.redirect('new')
};

function deleteSuggestion (req,res) {
    let idx = 0; //goes through ALL suggestions
    let correctIndex = 0;
     for (let suggestion of req.user.suggestions) {
            //if the id of the suggestion OBJECT in the suggestions 
            //array matches the one that was clicked on to be deleted, then grab INDEX of 
            //the object called correct index
        if (suggestion._id == req.params.id) {
            
            correctIndex = idx;
            //this is ONLY the idx that matches this condition
        }
        idx++
        //if we dont incrememnt it will not pass through every single object
    };
    req.user.suggestions.splice(correctIndex, 1); //taking the correct index and delete ONLY that ONE suggestion
    req.user.save(); //then we save changes to the database
    res.redirect('/interests/savedSuggestions');

};

function displaySuggestion (req,res) {
    res.render('savedSuggestions.ejs', {user: req.user});
};

module.exports = {
    newInterest: newInterest,
    index: index,
    showSuggestion: showSuggestion,
    saveSuggestion: saveSuggestion,
    scrapSuggestion: scrapSuggestion,
    deleteSuggestion: deleteSuggestion,
    displaySuggestion: displaySuggestion
}


