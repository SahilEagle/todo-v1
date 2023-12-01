const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")


const app = express();
const port = 3000;

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    let day = date.getDate();

    res.render("list", { listTitle: day, newListItem: items });

});

app.post("/", (req, res) => {

    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("https://persian-blue-kitten-wear.cyclic.app/work")
    } else {
        items.push(item)
        res.redirect("/");

    }

})

app.get("https://persian-blue-kitten-wear.cyclic.app/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItem: workItems });
});

app.post("https://persian-blue-kitten-wear.cyclic.app/work", (req, res) => {
    let item = req.body.newItem;

    workItems.push(item);
    res.redirect("https://persian-blue-kitten-wear.cyclic.app/work");
})

app.get("https://persian-blue-kitten-wear.cyclic.app/about", function(req, res){
    res.render("about");
})

app.listen(process.env.PORT || port, function () {
    console.log(`Server is running on port ${port}`);
})