const express = require("express")
const app = express()
const cors = require("cors")
const axios = require("axios")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const Url = require("./Event/URLRouter")
console.log("Base URL is:", Url);
app.get("/ping", (req, res) => {
    console.log("pinged successfully");
    res.status(200).json({message: "pinged"})
})
app.post("/serverAuth", async (req, res) => {
    try {
        const { profileKey, projectKey, clusterKey, clusterPassword, dbUser, dbPassword, server } = req.body;
        const origin = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        
        const authResponse = await axios.post(`http://${Url}/moduleAuth`, {
            profileKey,
            projectKey,
            clusterKey,
            clusterPassword,
            dbUser,
            dbPassword,
            server,
            serverUrl: Url,
            origin
        });

        const data = authResponse.data;
        if (data && data.message) {
            data.message.sqlServerUrl = Url;
            return res.status(201).json(data);
        }
        
        return res.status(400).json({ message: "Authentication failed" });
    } catch (error) {
        console.log(error?.response?.data || error.message);
        return res.status(error?.response?.status || 500).json(error?.response?.data || { message: "Server error during authentication" });
    }
});

const port = 4256;
app.listen(port, () => {
    console.log("ServerUrl Backend running on port " + port);
});
