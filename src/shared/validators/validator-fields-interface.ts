export type FieldsErrors = {
    [field: string]: string[];
}

export interface IValidateFields<PropsValidate> {
    errors: FieldsErrors | null;
    validateData: PropsValidate | null;
    validate(data: any): boolean;
}