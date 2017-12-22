const fs = require('fs');

function apiRoutes(app, path, directory) {
  app.get("/api/friends", (req, res) => {
    //display JSON of all friends
  });

  app.post("/api/friends", (req, res) => {

    fs.readFile(directory+"/app/data/friends.js", (err, data)=> {
        if (err) throw err;    
        //parse data, push users stuff to it

    })

    //incoming routes and compatibility logic
  });
}

module.exports = apiRoutes;
