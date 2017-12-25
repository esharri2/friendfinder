const fs = require("fs");

function apiRoutes(app, path, directory) {
  let dataPath = directory + "/app/data/friends.js";

  app.get("/api/friends", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      res.json(JSON.parse(data));
    });
  });

  function findMatch(newUser, users) {
    let currentMatch = null;
    let Match = function(name, photo, totalDifference) {
      this.name = name;
      this.photo = photo;
      this.totalDifference = totalDifference;
    };

    function getTotalDifference(array) {
      let totalDifference = 0;
      array.forEach((item, index) => {
        let diff = parseInt(item) - parseInt(newUser.scores[index]);
        totalDifference += Math.abs(diff);
      });
      return totalDifference;
    }

    users.forEach(user => {
      let totalDifference = getTotalDifference(user.scores);
      if (!currentMatch) {
        currentMatch = new Match(user.name, user.photo, totalDifference);
      } else if (
        totalDifference < currentMatch.totalDifference &&
        newUser.name !== user.name
      ) {
        currentMatch = new Match(user.name, user.photo, totalDifference);
      }
    });

    return currentMatch;
  }

  app.post("/api/friends", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) throw err;
      let newData = JSON.parse(data);
      newData.push(req.body);
      fs.writeFile(dataPath, JSON.stringify(newData), err => {
        if (err) throw err;
        let match = findMatch(req.body, newData);
        res.json(match);
      });
    });
  });
}

module.exports = apiRoutes;
