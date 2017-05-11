'use strict';

var express = require('express');
var apiRouter = express.Router();
var uuid = require('node-uuid');

var payslipData;
var csrfData;
var loginData;

var generateKey = function (firstName, lastName, payDateYear, payDateMonth) {
	return firstName.toLowerCase() + '|' + lastName.toLowerCase() + '|' + payDateYear + '|' + payDateMonth;
}

apiRouter
	.route('/')
	.get(function (req, res) {
		res.json({ message: 'API is working', error: false });
	});

apiRouter
	.route('/csrf/token')
	.get(function (req, res) {
		var token = uuid.v4();

		csrfData = csrfData || [];

		csrfData.push(token);
		res.json({ message: 'Token generated', error: false, token: token });
	});

apiRouter
	.route('/payslip')
	.post(function (req, res) {
		var key = generateKey(req.body.first_name, req.body.last_name, req.body.pay_date_year, req.body.pay_date_month);
		var payslip = {};

		payslipData = payslipData || {};
		loginData = loginData || {};

		var sessionToken = req.headers['myob-token'];
		var sessionUser = req.headers['myob-user'];

		if (!sessionUser || !sessionToken || loginData[sessionUser] !== sessionToken) {
			res.json({ message: 'Not logged in', error: true, key: ''});
		}
		else if (payslipData[key]){
			res.json({ message: 'Payslip already exists', error: true, key: key });
		} else {
			payslip.first_name = req.body.first_name;
			payslip.last_name = req.body.last_name;
			payslip.pay_date_month = req.body.pay_date_month;
			payslip.pay_date_year = req.body.pay_date_year;
			payslip.pay_frequency = req.body.pay_frequency;
			payslip.annual_income = req.body.annual_income;
			payslip.gross_income = req.body.gross_income;
			payslip.income_tax = req.body.income_tax;
			payslip.net_income = req.body.net_income;
			payslip.super = req.body.super;
			payslip.pay = req.body.pay;
			payslip.key = key;

			payslipData[key] = payslip;

			res.json({ message: 'Payslip created', key: key, error: false });
		}
	});

apiRouter
	.route('/payslip/:payslip_id')
  .get(function (req, res) {

  	payslipData = payslipData || {};
  	loginData = loginData || {};

  	var sessionToken = req.headers['myob-token'];
		var sessionUser = req.headers['myob-user'];

		if (!sessionUser || !sessionToken || loginData[sessionUser] !== sessionToken) {
			res.json({ message: 'Not logged in', error: true, key: req.params.payslip_id});
		}
		else if (payslipData[req.params.payslip_id]) {
			res.json(payslipData[req.params.payslip_id]);
		} else {
			res.json({ message: 'Payslip does not exist', error: true, key: req.params.payslip_id });
		}
  });

apiRouter
	.route('/login')
	.post(function (req, res) {

		loginData = loginData || {};

		var user = req.body.user;
		var sessionToken = uuid.v4();

		loginData[user] = sessionToken;

		res.json({ message: 'Logged in', error: false, session: sessionToken});
	});

apiRouter
	.route('/logout')
	.post(function (req, res) {

		loginData = loginData || {};

		var user = req.body.user;

		if (loginData[user]) {
			delete loginData[user];
		}

		res.json({ message: 'Logged out', error: false});
	});

module.exports = apiRouter;
