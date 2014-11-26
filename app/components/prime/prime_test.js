'use strict';

describe('primesApp.prime service', function () {
    var primeFactory;
    
    beforeEach(function () {
        module('primesApp')
        
        inject(function(_primeFactory_) {
            primeFactory = _primeFactory_;
        });
    });
    
    describe('the constructor (build function)', function () {
        it('should be defined', function () {
            expect(primeFactory).toBeDefined();
        });

        it('should contain a constructor function', function () {
            var instanceOfPrimeFactory = function () {
                return primeFactory.build(10, 15);
            };

            expect(instanceOfPrimeFactory).not.toThrow();
            expect(instanceOfPrimeFactory() instanceof primeFactory).toBe(true);
        });

        it('should set the properties correctly', function () {
            var primes = primeFactory.build(10, 15);

            expect(primes.numberOfPrimes).toEqual(10);
            expect(primes.maximumPrimes).toEqual(15);
            expect(primes.isMaximum).toEqual(false);
        });
    });
    
    describe('the isPrime function', function () {
        var primes;
        
        beforeEach(function () {
            primes = primeFactory.build(20, 30);
        });
        
        it('should return false for 1', function () {
            expect(primes.isPrime(1)).toEqual(false);
        });
        
        it('should return false for 0', function () {
            expect(primes.isPrime(0)).toEqual(false);
        });
        
        it('should return false for negative values', function () {
            expect(primes.isPrime(-5)).toEqual(false);
            expect(primes.isPrime(-24)).toEqual(false);
            expect(primes.isPrime(-140)).toEqual(false);
        });
        
        it('should return false for floating point values', function () {
            expect(primes.isPrime(-5.4)).toEqual(false);
            expect(primes.isPrime(325.55)).toEqual(false);
            expect(primes.isPrime(235.3525)).toEqual(false);
        });
    });
    
    describe('the getPrimes function', function () {
        var primes;
        
        beforeEach(function () {
            primes = primeFactory.build(20, 30);
        });
        
        it('should return a list with the requested number of primes', function () {
            expect(primes.getPrimes(15)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]);
            expect(primes.getPrimes(3)).toEqual([2, 3, 5]);
            expect(primes.getPrimes(1)).toEqual([2]);
        });
        
        it('should return an empty array when the requested number is 0', function () {
            expect(primes.getPrimes(0)).toEqual([]);
        });
        
        it('should return an empty array when the requested number is negative', function () {
            expect(primes.getPrimes(-20)).toEqual([]);
            expect(primes.getPrimes(-5)).toEqual([]);
        });
    });
    
    describe('the multiplyPrimes function', function () {
        var primes,
            multiplied;
        
        beforeEach(function () {
            primes = primeFactory.build(20, 30);
        });
        
        it('should produce a matrix with the multiplied primes', function () {
            multiplied = primes.multiplyPrimes([2, 3, 5]);
            
            expect(multiplied[0][0]).toEqual(4);
            expect(multiplied[0][1]).toEqual(6);
            expect(multiplied[0][2]).toEqual(10);
            expect(multiplied[1][0]).toEqual(6);
            expect(multiplied[2][0]).toEqual(10);
        });
        
        it('should return an empty array for an empty input', function () {
            multiplied = primes.multiplyPrimes([]);
            
            expect(multiplied).toEqual([]);
        });
    });
    
    describe('the getPrimeAt function', function () {
        var primes;
        
        beforeEach(function () {
            primes = primeFactory.build(150, 200);
        });
        
        it('should return the prime number at the given location', function () {
            expect(primes.getPrimeAt(2)).toEqual(5);
            expect(primes.getPrimeAt(30)).toEqual(127);
            expect(primes.getPrimeAt(149)).toEqual(863);
        });
        
        it('should return 0 for invalid inputs', function () {
            expect(primes.getPrimeAt(2.5)).toEqual(0);
            expect(primes.getPrimeAt(-20)).toEqual(0);
            expect(primes.getPrimeAt(180)).toEqual(0);
        });
    });
    
    describe('the getLastPrime function', function () {
        var primes;
        
        beforeEach(function () {
            primes = primeFactory.build(150, 200);
        });
        
        it('should return the last prime number', function () {
            expect(primes.getLastPrime()).toEqual(863);
        });
    });
});