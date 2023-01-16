const startupDebugger = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");

const express = require("express");
const app = express();

// router
const homeRouter = require("./routes/home");
const coursesRouter = require("./routes/courses");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);
console.log(`Mail Pass: ${config.get("mail.password")}`);

if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    startupDebugger("Morgan enabled...");
}

app.use(logger);
app.use(auth);

// routers
app.use("/", homeRouter);
app.use("/api/courses", coursesRouter);

// port
const port = process.env.PORT || 3000;

// listen
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});
