const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const initPassport = require("../passport.config");
initPassport(passport);

const users = [];

const app = express();
app.set("view-engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("index.ejs", { name: "Arun" });
});

app.get("/login", (req, res) => {
	res.render("login.ejs");
});
app.get("/register", (req, res) => {
	res.render("register.ejs");
});

app.post("/login", (req, res) => {
	res.render("login.ejs");
});
app.post("/register", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		});
		console.log(users);
		res.redirect("/login");
	} catch (error) {
		res.redirect("/register");
		console.error(error);
	}
});

const port = process.env.PORT;
app.listen(port, console.log(`Listening on: http://localhost:${port}`));
