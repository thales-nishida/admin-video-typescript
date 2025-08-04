import { isValidationOptions } from "class-validator";
import { ClassValidatorField } from "../../validators/class-validator-field";
import { FieldsErrors } from "../../validators/validator-fields-interface";
import { EntityValidationError } from "../../validators/validation.error";

type Expected =
  | {
      validator: ClassValidatorField<any>;
      data: any;
    }
  | (() => any);

expect.extend({
  containsErrorMessage(expected: any, received: FieldsErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorMessage(error.message, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);
      if (validated) {
        return isValid();
      }
      return assertContainsErrorMessage(validator.errors, received);
    }
  },
});

function isValid() {
  return { pass: true, message: () => "" };
}

function assertContainsErrorMessage(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch
    ? { pass: true, message: () => "" }
    : {
        pass: false,
        message: () =>
          `The validation errors not contains ${JSON.stringify(
            received
          )}. Current: ${JSON.stringify(expected)}`,
      };
}
