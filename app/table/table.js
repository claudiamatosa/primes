'use strict';

angular.module('primesApp.table', ['ngRoute'])

.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/table', {
            templateUrl: 'table/table.html',
            controller: 'TableCtrl as table'
        });
}])

.value('MESSAGES', {
    MAXIMUM_EXCEEDED: 'There are too many primes in this table, so they will not fit ' +
        'in the screen. The last prime for the given number is',
    NO_PRIMES: 'There are no primes to display.',
    PERFORMANCE_LOCK: 'Please click the button to calculate.',
    CALCULATING: 'Calculating...'
})

.value('NUMBER_OF_PRIMES', 10)

.value('MAXIMUM_PRIMES', 20)

.value('PERFORMANCE_MAXIMUM', 4500)

.controller('TableCtrl',
    ['primeFactory',
     'MESSAGES',
     'NUMBER_OF_PRIMES',
     'MAXIMUM_PRIMES',
     'PERFORMANCE_MAXIMUM',
     
    function (primeFactory, MESSAGES, NUMBER_OF_PRIMES, MAXIMUM_PRIMES, PERFORMANCE_MAXIMUM) {
        var vm = this;
        
        this.numberOfPrimes = NUMBER_OF_PRIMES;
        
        this.messages = MESSAGES;
        
        this.performanceLock = false;
        this.loading = false;

       /**
         * @ngdoc method
         * @name displayPrimes
         * @methodOf TableCtrl
         * @description Creates a prime list and displays it.
         */
        this.displayPrimes = function () {
            this.primeList = primeFactory.build(this.numberOfPrimes, MAXIMUM_PRIMES);
        };
        
        this.updatePrimes = function () {
            if (this.numberOfPrimes < PERFORMANCE_MAXIMUM) {
                this.primeList.updateList(this.numberOfPrimes);
                this.performanceLock = false;
            } else {
                this.performanceLock = true;
            }
        };
        
        this.updatePrimesWithButton = function () {
            this.loading = true;
            this.primeList.updateList(this.numberOfPrimes);
            this.performanceLock = false;
            this.loading = false;
        };
        
        this.displayPrimes();
}]);