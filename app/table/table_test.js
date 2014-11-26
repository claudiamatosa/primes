'use strict';

describe('primesApp.table module', function () {
    var TableCtrl,
        scope;

    beforeEach(module('primesApp'));

    describe('TableCtrl', function () {
        var scope,
            createController,
            primeFactory,
            MESSAGES,
            NUMBER_OF_PRIMES,
            MAXIMUM_PRIMES,
            PERFORMANCE_MAXIMUM;

        beforeEach(inject(function (
            $rootScope,
            $controller,
            _primeFactory_,
            _MESSAGES_,
            _NUMBER_OF_PRIMES_,
            _MAXIMUM_PRIMES_,
            _PERFORMANCE_MAXIMUM_
        ) {
            primeFactory = _primeFactory_;
            MESSAGES = _MESSAGES_;
            NUMBER_OF_PRIMES = _NUMBER_OF_PRIMES_;
            MAXIMUM_PRIMES = _MAXIMUM_PRIMES_;
            PERFORMANCE_MAXIMUM = _PERFORMANCE_MAXIMUM_;

            scope = $rootScope.$new();

            /**
             * Creates a controller using the passed dependencies
             *
             * @param {Object} args - List of dependencies to overwrite,
             * containing the values. Example:
             *
             * {
             *     'primeFactory': function () {}
             * }
             */
            createController = function (args) {
                var key,
                    mockedDependencies = {
                        '$scope': scope
                    };

                if (args) {
                    for (key in args) {
                        if (args.hasOwnProperty(key)) {
                            mockedDependencies[key] = args[key];
                        }
                    }
                }

                return $controller('TableCtrl as table', mockedDependencies);
            };
        }));

        describe('displayPrimes', function () {
            var table;

            it('should throw when primeFactory is not a constructor', function () {
                var fakePrimeFactory = 'randomstring',

                    displayPrimes = function () {
                        table = createController({
                            'primeFactory': fakePrimeFactory
                        });

                        table.displayPrimes();
                    };

                expect(displayPrimes).toThrow();
            });

            it('should create a primeList with the properties provided', function () {
                table = createController({
                    'NUMBER_OF_PRIMES': 15,
                    MAXIMUM_PRIMES: 25
                });

                expect(table.primeList).toBeDefined();

                expect(table.primeList.numberOfPrimes).toEqual(15);
                expect(table.primeList.maximumPrimes).toEqual(25);
            });

        });

        describe('updatePrimes', function () {
            var table;

            beforeEach(function () {
                table = createController();
                spyOn(table.primeList, 'updateList');
            });

            it('should update the prime list', function () {
                table.numberOfPrimes = 20;
                table.updatePrimes();
                expect(table.primeList.updateList).toHaveBeenCalledWith(20);
            });
        });
    });
});