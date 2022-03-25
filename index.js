const express = require("express");
const backend = require("./src/back");
const port = process.env.PORT || 8080;

const app = express();

backend(app);



app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});



