const nodemailer = require('nodemailer');
const Router = require('koa-router');
const Test = require('../models/test');

const jwt = require('koa-jwt');
const config = require('config');

const secret = config.get('jwt-secret');

const router = new Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '3509687977@qq.com',
    pass: 'loufurikperedbba',
  }
});


router.post('/:title', jwt({
  secret
}), async (ctx) => {
  const { title } = ctx.params;
  const test = await Test.findOne({ title });

  const url = `http://192.168.1.101:8081/room/${title}`;

  const from = 'OurTest Team 👻, <3509687977@qq.com>';
  const to = test.settings.whitelist.join(';');
  const subject = 'Invite Test';
  const text = `Join test: ${url}`;
  const html = `<b>Join Test</b><a href='${url}'>link</a>`;

  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };

  const { err, result } = await transporter.sendMail(mailOptions);
  if (err) { 
    ctx.throw(err);
  }
  ctx.body = result;
});

module.exports = router;
