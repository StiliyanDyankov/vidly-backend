

module.exports = function (err, req, res, next) {
    const newErrLog = { log: "Could not get genres", err: err };
    console.log(newErrLog);
    res.status(500).send(newErrLog);
}