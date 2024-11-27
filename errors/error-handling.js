exports.pgErrorhandler = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Invalid input" });
      } else next(err);
};

exports.customErrorhandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
      } else {
        next(err)
     };
};

exports.serverErrorhandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
};