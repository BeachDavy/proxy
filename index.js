const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/proxy", async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send("Missing url");

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": target,
        "Origin": target
      }
    });

    const contentType = response.headers.get("content-type");
    res.set("Content-Type", contentType);
    res.set("Access-Control-Allow-Origin", "*");

    const body = await response.buffer();
    res.send(body);

  } catch (err) {
    res.status(500).send("Proxy error");
  }
});

app.listen(3000, () => console.log("Proxy running"));
