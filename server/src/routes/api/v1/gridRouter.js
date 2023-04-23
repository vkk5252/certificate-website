import express from "express";

const gridRouter = new express.Router();

const nodes = [
  {
    id: '1',
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    address: "55 Mohawk Path, Holliston, MA 01746",
    status: "initial",
    verified: "no",
    proof: "N/A",
    emailSent: "no"
  }
];

gridRouter.get("/", (req, res) => {
  const { user } = req.query;
  return res.status(200).json({ nodes });
});

export default gridRouter;