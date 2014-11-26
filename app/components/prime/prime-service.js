'use strict';

/**
 * @ngdoc service
 * @name prime-service
 * @id prime-service
 * @description Provides a list of prime numbers.
 */
angular.module('primesApp.prime.prime-service', [])

/**
 * @ngdoc factory
 * @name primeFactory
 * @id primeFactory
 * @description Creates a list of prime numbers and matrix
 * of multiplication.
 */
.factory('primeFactory', [function () {

    function PrimeList(numberOfPrimes, maximumPrimes) {
        this.numberOfPrimes = numberOfPrimes;
        this.maximumPrimes = maximumPrimes;
        this.isMaximum = numberOfPrimes > maximumPrimes;
        this.primes = [];
        this.multiplicationMatrix = [];
        
        this.updateList(numberOfPrimes);
    };

    /**
     * @ngdoc method
     * @name isPrime
     * @methodOf primeFactory
     * @description Checks is a given number is a prime.
     * 
     * @param {Number} number
     */
    PrimeList.prototype.isPrime = function (number) {
        var i;
        
        if (number < 2 || parseInt(number) !== number) {
            return false;
        }
        
        for (i = 2; i < number; i++) {
            if (number % i === 0) {
                return false;
            }
        }

        return true;
    };
    
    /**
     * @ngdoc method
     * @name getPrimes
     * @methodOf primeFactory
     * @description Retrieves a list of primes up to a maximum.
     * 
     * @param {Number} numberOfPrimes
     */
    PrimeList.prototype.getPrimes = function (numberOfPrimes) {
        var primes = [],
            counter = 0,
            i;
        
        for (i = 2; counter < numberOfPrimes; i++) {
            if (this.isPrime(i)) {
                primes[counter] = i;
                counter++;
            }
        }
        
        return primes;
    };
    
    /**
     * @ngdoc method
     * @name multiplyPrimes
     * @methodOf primeFactory
     * @description Multiplies each prime by itself and returns a
     * multiplication matrix.
     * @param {Array} primes
     */
    PrimeList.prototype.multiplyPrimes = function (primes) {
        var primesLength = primes.length,
            matrix = [],
            i,
            j;
        
        for (i = 0; i < primesLength; i++) {
            matrix[i] = [];
            
            for (j = 0; j < primesLength; j++) {
                matrix[i][j] = primes[i] * primes[j];
            }
        }
        
        return matrix;
    };
    
    /**
     * @ngdoc method
     * @name getPrimeAt
     * @methodOf primeFactory
     * @description Gets a prime at a given position from the list (starting from 0).
     * 
     * @param {Number} position
     */
    PrimeList.prototype.getPrimeAt = function (position) {
        return this.primes[position] || 0;
    };
    
    /**
     * @ngdoc method
     * @name getLastPrime
     * @methodOf primeFactory
     * @description Gets the last prime on the list.
     * 
     * @param {Number} position
     */
    PrimeList.prototype.getLastPrime = function (position) {
        return this.getPrimeAt(this.numberOfPrimes - 1);
    };
    
    /**
     * @ngdoc method
     * @name updateList
     * @methodOf primeFactory
     * @description Updates the prime list status, when the numberOfPrimes changes.
     * 
     * @param {Number} numberOfPrimes
     */
    PrimeList.prototype.updateList = function (numberOfPrimes) {
        this.primes = this.getPrimes(numberOfPrimes);
        this.numberOfPrimes = numberOfPrimes;
        this.isMaximum = numberOfPrimes > this.maximumPrimes;
        
        if (!this.isMaximum) {
            this.multiplicationMatrix = this.multiplyPrimes(this.primes);
        } else {
            this.multiplicationMatrix = [];
        }
    };

    PrimeList.build = function (numberOfPrimes, maximumPrimes) {
        return new PrimeList(numberOfPrimes, maximumPrimes);
    };

    return PrimeList;
}]);