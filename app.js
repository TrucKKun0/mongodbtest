const express = require('express');
const app = express();
const userModel = require('./models/user');
const path = require('path');
const port = 4000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    let users = await  userModel.find({

    });

    res.render("read",{users});
});
app.get('/delete/:id', async (req, res) => {
    let users = await  userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
   
});
app.get('/edit/:userid', async (req, res) => {
    let user = await  userModel.findOne({_id: req.params.userid})
    console.log(user);
    res.render("edit", {user});
   
});
app.post('/update/:userid', async (req, res) => {
    let {name,email,image} = req.body;
    let user = await  userModel.findOneAndUpdate({_id: req.params.userid}, {name, email,  image}, {new: true});

    
    res.redirect("/read");
   
});

app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;

    try {
        let createUser = await userModel.create({
            name,
            email,
            image
        });
        res.redirect("/read"); // Send the created user as a response
    } catch (error) {
        res.status(500).send("Error creating user: " + error.message); // Send error response
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
