var nodemailer = require('nodemailer');
var repeat = require('lodash/repeat');

function run() {
  console.log("\nHandsOn 05: NodeMailer");
  console.log("%s", repeat('-', 50));
  startDemo();
  console.log("\n%s\n", repeat('-', 50));
}

function startDemo() {
  console.log("To receive a mail, enter url http://localhost:54321/sendmail/<your email id>");
  console.log("e.g. http://localhost:54321/sendmail/ravi.tiwari@tothenew.com");
}


function sendMail(req, res) {
  var user = req.params.user;
  if(user) {
    console.log("Sending mail to " + user);
    res.send("Sending mail to " + user);
    send(user);
  } else {
    console.log("Invalid user address");
    res.send("Invalid user address " + user);    
  }
}


function send(to) {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sender email address',
      pass: 'sender password'
    }
  });

  // setup email data with unicode symbols
  var mailOptions = {
    from: '"Khushboo" <khushboo.chanana@tothenew.com>', // sender address
    to: to, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

module.exports = {
  run: run,
  url: '/sendmail/:user',
  sendMail: sendMail
}
