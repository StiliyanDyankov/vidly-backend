const fb = require("../exercise1").fizzBuzz;

describe("fizzbuzzz", () => {
    it("should throw if input is not a number", () => {
        const nan = [false, true, null, undefined, "", "ss", {}, [], () => {}];
        nan.forEach((i) => {
            expect(() => {
                fb(i);
            }).toThrow();
        });
    });
    it('should return fizzbuzz if input is div',() => {
        expect(fb(15)).toBe('FizzBuzz');
    })
    it('should return fizz if input is div',() => {
        expect(fb(12)).toBe('Fizz');
    })
    it('should return buzz if input is div',() => {
        expect(fb(20)).toBe('Buzz');
    })
    it('should return input if input is not div',() => {
        expect(fb(1)).toBe(1);
    })
});
