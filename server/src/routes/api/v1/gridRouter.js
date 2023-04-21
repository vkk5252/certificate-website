import express from "express";

const gridRouter = new express.Router();

const nodes = [
	{
		id: '1',
		name: 'VSCode',
		deadline: new Date(2020, 1, 17),
		type: 'SETUP',
		isComplete: true,
	},
	{
		id: '2',
		name: 'JavaScript',
		deadline: new Date(2020, 2, 28),
		type: 'LEARN',
		isComplete: true,
	},
	{
		id: '3',
		name: 'React',
		deadline: new Date(2020, 3, 8),
		type: 'LEARN',
		isComplete: false,
	}
];

gridRouter.get("/", (req, res) => {
  const { user } = req.query;
  return res.status(200).json({ nodes });
});

export default gridRouter;