'use strict';

module.exports = {
    index(req, res) {
        res.status(200).json(res.locals.data);
    }
};