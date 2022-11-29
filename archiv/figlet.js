var figlet = require("figlet");

figlet.text("hallo Welt", function (err, data) {
  console.log(data);
});
