//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/angular-route/angular-route.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../bower_components/angular-messages/angular-messages.min.js',
      '../bower_components/angular-ui-router/release/angular-ui-router.min.js',
      '../bower_components/angular-aria/angular-aria.js',
      '../bower_components/angular-animate/angular-animate.js',
      '../bower_components/angular-material/angular-material.js',
      'services/authServices.js',
      'services/payslipServices.js',
      'views/login/login.js',
      'views/payslip/payslip.js',
      'views/payslip/payslipView/payslipView.js',
      'app.js',
      // 'components/**/*.js',
      // 'views/**/*.js',
      // 'views/login/*.js',
      'services/authService_test.js',
      'services/payslipServices_test.js',
      'views/login/login_test.js',
      'views/payslip/payslip_test.js',
      'views/payslip/payslipView/payslipView_test.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-spec-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    client: {
      captureConsole: true
    },

    reporters: ['spec'],

    singleRun: false

  });
};
