import express from "express";
import alertModel from "../models/alertModel.js";
import { generateMsgId } from "../helper/uniqueIdHelper.js";

const createAlert = async (req, res) => {
    try {
        const { token } = req.headers;
        if (token) {
            const { toOwnerId, message,camLid } = req.body;
            if (!toOwnerId || !message) {
                res.send({ error: "This field is empty" });
            }
            let msgId = generateMsgId();
            // check uniqueness of generated licenseId
            const existingMsgId = await alertModel.findOne({ msgId: msgId });
            while (existingMsgId) {
                msgId = generateMsgId();
            }

            const newAlert = await new alertModel({
                toOwnerId: toOwnerId,
                message: message,
                msgId: msgId,
                camLid: camLid,
            }).save();
            res.status(200).send({
                success: true,
                message: 'New Alert Created',
                newAlert
            })
        } else {
            res.status(403).send({
                success: false,
                message:"user unAuthorized, Token Does not found"
            })
        }
    } catch {
        console.log("Error in creating a new alert");
        throw err;
    }
}

const getAlertByUserId = async(req, res)=> {
    try {
        const { token, userid } = req.headers;
        if (token) {
            const alerts = await alertModel.find({ toOwnerId: userid });
            res.status(200).send({
                success: true,
                alerts
            })
        } else {
            res.status(403).send({ auth: false, message: 'UnAuthorized user, Tokrn not present' })
        }
    } catch (err) {
        console.log('Error in getting the alert by User Id');
        throw err;
    }
}

const getAllAlerts = async (req, res) => {
    try {
        const { token } = req.headers;
        if (token) {
            const alerts = await alertModel.find({})
            res.status(200).send({
                success: true,
                alerts
            })
        } else {
            res.status(403).send({
                success: false,
                message: "User not authorized,Does Not of Token"
            })
        }
        }catch (err) {
        console.log('err getting all the alerts', err);
        throw err;
    }
}

const updateReadStatus = async (req, res) => {
    try {
        const { token } = req.headers;
        const { msgid } = req.body;
        if (token) {
            const updateAlert = await alertModel.updateOne({msgId: msgid }, {
                $set: {
                    read:true
                }
            });
            if (updateAlert) {
                res.status(200).send({
                    success: true,
                    updateAlert,
                    message: "Read status updates successfully"
                })
            } else {
                res.status(500).send({
                    success: false,
                    message: "could not update"
                });
            }
        } else {
            res.status(403).send({
                success: false,
                message: "User Unauthorized, Does not have TokenId"
            })
            }
    } catch (err) {
                console.log(err, "error in updating the Alert");
                throw err;
            }
    }


export { createAlert,getAlertByUserId,getAllAlerts,updateReadStatus };