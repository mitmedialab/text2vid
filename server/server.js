var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
app.get('/centers/:log/:lat',function(req,res)
{
    res.json({ log: req.params.log,
        lat: req.params.lat });

});
app.listen(port);
console.log('Server started! At http://localhost:' + port);