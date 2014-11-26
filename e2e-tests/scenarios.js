'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {

    browser.get('index.html');

    it('should automatically redirect to /table when location hash/fragment is empty', function () {
        expect(browser.getLocationAbsUrl()).toMatch("/table");
    });


    describe('table', function () {
        beforeEach(function () {
            browser.get('index.html#/table');
        });


        it('should render the table when user navigates to /table', function () {
            expect(element.all(by.css('[ng-view] .title')).first().getText()).
                toMatch(/Primes/);
        });
    });
});