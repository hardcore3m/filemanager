import express from "express";
import StorageHandler from "./src/modules/fshandler/storageHandler.mjs";
import getPathInfo from "./src/modules/fshandler/pathInfo.mjs";

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, async() => {
    console.clear();
    let date = new Date();
    console.log(`Server Listening...\nPORT: ${port}\nDATE:${date.toUTCString()}\n`);
    const db = new StorageHandler('./files');
    

});

app.get("/", (req, res) => {

    res.status(204).send("Not Implemented Yet");
})