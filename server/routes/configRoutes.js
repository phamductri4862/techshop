import express from "express";
const configRoutes = express.Router();

configRoutes.get("/google-client-id", (req, res, next) => {
  try {
    res.status(200).json(process.env.GOOGLE_CLIENT_ID);
  } catch (error) {
    next(error);
  }
});

export default configRoutes;
