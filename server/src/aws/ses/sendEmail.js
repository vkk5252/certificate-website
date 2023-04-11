import AWS from "aws-sdk";
import fs from 'fs';
import Handlebars from 'handlebars';

const sendEmail = (templatePath, email, subject, data) => {
  fs.readFile(templatePath, function (err, htmlTemplate) {
    if (err) {
      console.log("Unable to load HTML Template");
      throw err;
    }

    var emailData = {
      ...data,
    };

    var templateHtml = Handlebars.compile(htmlTemplate.toString());
    var bodyHtml = templateHtml(emailData);
    console.log("bodyHtml:", bodyHtml);

    AWS.config.update({ region: 'us-east-2' });
    var params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        },
        Body: {
          Html: {
            Data: bodyHtml
          }
        }
      },
      Source: 'certificate.website@gmail.com',
      ReplyToAddresses: ['certificate.website@gmail.com']
    };

    var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

    sendPromise.then(
      function (data) {
        console.log(data.MessageId);
      }).catch(
        function (err) {
          console.error(err, err.stack);
        });
  });
}

export default sendEmail;