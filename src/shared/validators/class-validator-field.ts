import { validateSync } from "class-validator";
import { IValidateFields, FieldsErrors } from './validator-fields-interface';

export abstract class ClassValidatorField<PropsValidate>
 implements IValidateFields<PropsValidate> {
    errors: FieldsErrors | null = null;
    validateData: PropsValidate | null = null;

    validate(data: any): boolean {
        const errors = validateSync(data);
        if (errors.length) {
            this.errors = {};
            for (const error of errors) {
                const field = error.property;
                this.errors[field] = Object.values(error.constraints!);
            }
        } else {
            this.validateData = data;
        }
        return !errors.length;
    }
 }