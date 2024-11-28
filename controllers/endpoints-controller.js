const fs = require('fs');

    exports.getEndpoints = (req, res, next) => {
        return fs.readFile('./endpoints.json', 'utf-8', (err, fileContents) => {
            if(err){
                return next(err);
            } else {
                const parsedData = JSON.parse(fileContents);
                res.status(200).send({endpoints: parsedData})
            }
        }) 
    }

    