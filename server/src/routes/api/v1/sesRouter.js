import express from "express";
import AWS from "aws-sdk";

const sesRouter = express.Router();

sesRouter.post("/", (req, res) => {

	const { email } = req.body;

	AWS.config.update({ region: 'us-east-2' });

	var params = {
		EmailAddress: email
	};

	var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).verifyEmailIdentity(params).promise();

	sendPromise.then(
		function (data) {
			console.log(data.MessageId);
		}).catch(
			function (err) {
				console.error(err, err.stack);
			});

	return res.status(200).json({message: "test"});
});

export default sesRouter;