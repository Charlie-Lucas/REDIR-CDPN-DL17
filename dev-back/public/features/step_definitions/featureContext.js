//var fs = require('fs');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var myStepDefinitionsWrapper = function() {

    this.registerHandler('AfterScenario', function (event, callback) {
        // clear localStorage
        browser.executeScript('window.localStorage.clear();');
        callback();
    });

    this.Given(/I am on the homepage/, function(next) {
        browser.get('/');
        next();
    });

    this.Then(/^I should see "([^"]*)"$/, function (text, next) {
        expect(element(by.cssContainingText('body', text)).isPresent())
            .to.become(true)
            .and.notify(next);
    });

    this.Then(/^the title should be "([^"]*)"$/, function (text, next) {
        expect(element(by.cssContainingText('h1', text)).isPresent())
            .to.become(true)
            .and.notify(next);
    });
};
module.exports = myStepDefinitionsWrapper;