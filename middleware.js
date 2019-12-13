module.exports = ( req, res, next ) => {

    const value = req.headers[ 'authorization' ];

    if (value === process.env.TOKEN) {
        next();
    } else {
        res.status(401).send('Unauthorized')
    }
};