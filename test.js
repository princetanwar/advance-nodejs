const express = require("express");

const main = () => {
  const app = express();

  const dates = [];
  const st = [];
  app.get("/", (req, res) => {
    // console.profile();
    let i = 0;
    for (i; i < 100000; i++) {
      dates.push(new Date());
      st.push("prince");
    }
    // console.profileEnd();
    res.send("hello");
  });

  app.listen(3000);
};

main();
