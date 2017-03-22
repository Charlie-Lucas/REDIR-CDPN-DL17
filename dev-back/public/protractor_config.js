exports.config = {
    baseUrl: 'http://127.0.0.1:3000',

    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    capabilities: {
        browserName: 'chrome',
        version: '',
        platform: 'ANY'
    },

    framework: 'cucumber',

    specs: [
        'features/*.feature'
    ],

    jasmineNodeOpts: {
        showColors: true
    },

    cucumberOpts: {
        require: 'features/step_definitions/featureContext.js',
        format: 'pretty'
    }
};
