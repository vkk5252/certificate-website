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
  return res.status(200).json({ rows: [
    { id: 1, firstName: 'Jon', lastName: 'Snow', address: "56 Abc Street, City, State 00000", status: "Not sent" }
  ]});
});

export default gridRouter;