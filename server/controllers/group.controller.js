const Group = require("../models/Group")
const { sendData, sendError } = require("../utils/sendJSON");

const getGroups = (req, res, next) => {
    Group.find().then(responseData => { 
        sendData(res, responseData) 
    }).catch(err => {
        sendError(res, req, err.message)
    })
}

const getGroup = (req, res, next) => {
    Group.findById(req.params.groupId).then(responseData => { 
        sendData(res, responseData) 
    }).catch(err => {
        sendError(res, req, err.message)
    })
}

const createGroup = async (req, res, next) => {
    const newGroup = await new Group(req.body);
    try{
        newGroup.save();
        sendData(res, newGroup);
    }catch(e){
        sendError(res, req, e.message)
    }
}

const updateGroup = (req, res, next) => {
    Group.findByIdAndUpdate(req.params.groupId, {$set: req.body }, { new: true }).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}

const deleteGroup = (req, res, next) => {
    Group.findByIdAndRemove(req.params.groupId).then(responseData => {
        sendData(res, responseData)
    }).catch(err => {
        sendError(res, req, err.message);
    })
}


module.exports = {
    getGroups, 
    getGroup, 
    createGroup,
    updateGroup,
    deleteGroup
  };