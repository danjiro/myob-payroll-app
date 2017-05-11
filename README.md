# MYOB Coding Challenge

This coding challenge project is designed to give front-end developers an API to code against. There are several routes provided that perform the backend work, and your task is to complete a font-end solution.

The flow of the backend application is as follows:

* You must login to get a session token (for the purposes of this any username and password will suffice).
* When you are saving a payslip or retrieving a payslip you must provide the user and token as headers in the requests.

Note that we are only storing data in memory, so if you restart the server then you will need to login again to get a new token.

In all the responses if you see error = true, then your request has not worked.

## To get this running

* You should just copy the project to a directory on your computer.
* You need to have Node.js installed on your computer (we used 6.9.5 when writing this).
* Run `npm install` from the directory that you copied the project to.
* Run `npm start` from the directory that you copied the project to to start the server.

## Routes available

The default URL for the project is `http://localhost:8080`. You can change this in the config/runtime.json file if you want.

### GET /api/

You don't need to pass any parameters to this, and it will just return a message like the following:

```json
{
  "message": "API is working",
  "error": false
}
```

You can use this to verify that the server is running.

### POST /api/login

You need to send the following JSON object:

```json
{
  "user": "damien.whaley@myob.com",
  "pass": "anything will do"
}
```

When you have been logged in it will return a message like the following:

```json
{
  "message": "Logged in",
  "error": false,
  "session": "6ec63d54-33fb-4801-a3e6-0113ef8cf32c"
}
```

You then need to use the user you provided in the login call and the token you received in the response for your saving a viewing of payslips.

### POST /api/payslip

You need to pass the user and token in the following headers:

* myob-user = user you logged in with
* myob-token = the token you received back from the login

The JSON submitted should look like:

```json
{
  "first_name" : "Damien",
  "last_name" : "Whaley",
  "pay_date_month" : "02",
  "pay_date_year" : "2017",
  "pay_frequency" : "monthly",
  "annual_income" : "999999",
  "gross_income" : "999999",
  "income_tax" : "50",
  "net_income" : "999999",
  "super" : "9.5",
  "pay" : "999999"
}
```

This will then reply with a message like the following:

```json
{
  "message": "Payslip created",
  "key": "damien|whaley|2017|02",
  "error": false
}
```

### GET /api/payslip/:key

You need to pass the user and token in the following headers:

* myob-user = user you logged in with
* myob-token = the token you received back from the login

The key is the same key you got back from the POST message when you saved a payslip.

You will get a response like the following:

```json
{
  "first_name": "Damien",
  "last_name": "Whaley",
  "pay_date_month": "02",
  "pay_date_year": "2017",
  "pay_frequency": "monthly",
  "annual_income": "999999",
  "gross_income": "999999",
  "income_tax": "50",
  "net_income": "999999",
  "super": "9.5",
  "pay": "999999",
  "key": "damien|whaley|2017|02"
}
```

### GET /

Anything that is not a route above is served directly from the public folder in the root of the project.