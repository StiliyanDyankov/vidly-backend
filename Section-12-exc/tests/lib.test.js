const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
    it("should return positive if input positive", () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it("should return positive if input negative", () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it("should return 0 if input 0", () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe("greet", () => {
    it("should return the greeting message", () => {
        const result = lib.greet("Stilko");
        expect(result).toMatch(/Stilko/);
        expect(result).toContain("Stilko");
    });
});

describe("getCurrencies", () => {
    it("Should return supported currencies", () => {
        const result = lib.getCurrencies();

        expect(result).toContain("USD");
        expect(result).toContain("AUD");
        expect(result).toContain("EUR");

        expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
    });
});

describe("getProduct", () => {
    it("should return the product with the given id", () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1, price: 10 });
    });
});

describe("registerUser", () => {
    it("should throw if username is falsy", () => {
        const args = [null, undefined, NaN, "", 0, false];
        args.forEach((a) => {
            expect(() => {
                lib.registerUser(null);
            }).toThrow();
        });
    });
    it("Should return a user object if username is valid", () => {
        const result = lib.registerUser("mosh");
        expect(result).toMatchObject({ username: "mosh" });
        expect(result.id).toBeGreaterThan(0);
    });
});

// mock functions
describe("applyDiscount", () => {
    it("should apply 10% disc if customer has more than 10 points", () => {
        db.getCustomerSync = function (id) {
            console.log("Reading a customer from db");
            return { id: id, points: 20 };
        };

        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe("notifyCustomer", () => {
    it("should send an email to the customer", () => {
        // const mockFunction = jest.fn();
        // mockFunction.mockReturnValue(1);
        // // mockFunction.mockResolvedValue(1);
        // // mockFunction.mockRejectedValue(new Error('...'));
        // const result = mockFunction()

        db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
        mail.send = jest.fn().mockReturnValue({ email: "a" });

        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});
