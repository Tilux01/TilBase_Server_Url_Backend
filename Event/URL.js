const url = require("./URLRouter")
const axios = require("axios")

const getUrl = (req, res) =>{
    const user_Id = req.body?.user_Id
    const profile_Key = req.body?.profile_Key
    const Project_Id = req.body?.Project_Id
    const Cluster_Id = req.body?.Cluster_Id
    axios.post(`${url}/api/auth`)
    .then((promise)=>{
        console.log(promise);
    })
    .catch((error)=>{
        console.log(error);
        
    })
}
getUrl()