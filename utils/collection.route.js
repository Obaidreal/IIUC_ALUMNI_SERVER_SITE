const express = require('express');
const router = express.Router();

router.get("/:id", (req, res) => {
    res.send('collection found ')
});

router.get("/projects", (req, res) => {
    res.send('collection found ')
});

router.post('/projects', (req, res) => {
    res.send('collection send')
})

router.route("/").get((req, res) => {
    res.send('collection found ')
}).post((req, res) => {
    res.send('collection send')
});

app.all("*",(req,res)=>{
res.send('no route found')
})

module.exports = router;