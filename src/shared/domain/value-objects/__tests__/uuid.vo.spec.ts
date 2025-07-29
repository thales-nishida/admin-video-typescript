import { InvalidUuidError, Uuid } from "../uuid.vo";
describe("UUID Value Object Tests", () => {

    const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

    test("should throw an error for invalid UUID", () => {
        expect(() => {
            new Uuid('invalid-uuid');
        }).toThrow(InvalidUuidError);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should create a valid UUID when no id is provided", () => {
        const uuid = new Uuid();
        expect(uuid.id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        );
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should accept a valid UUID", () => {
        const validId = "123e4567-e89b-12d3-a456-426614174000";
        const uuid = new Uuid(validId);
        expect(uuid.id).toBe(validId);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should have name 'InvalidUuidError' for error", () => {
        const error = new InvalidUuidError();
        expect(error.name).toBe("InvalidUuidError");
        expect(error.message).toBe("ID must be a valid UUID");
    });
});