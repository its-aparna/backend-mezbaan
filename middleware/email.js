import nodemailer from "nodemailer";

export const sendOTP = async (request,response) =>{
  console.log(request.body,"*********");
  var randomNumber = Math.floor(1000 + Math.random() * 9000);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vanshikajoshi2021@gmail.com',
      pass: 'hiphiklrdkskbeqq'
    }
  }); //``                                                                                                            ``

  var mailOptions = {
    from: 'vanshikajoshi2021@gmail.com',
    to: request.body.email,
    subject: 'Mezbaan application admin verification',
    text: 'This is mezbaan web application verification code '+randomNumber+" ."
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      console.log("Successful mail Sending.....");
    }
  })

  return response.status(200).json({ msg: randomNumber, status: true });
}