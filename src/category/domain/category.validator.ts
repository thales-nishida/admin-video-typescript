import {MaxLength, IsString, IsNotEmpty, IsBoolean, IsOptional} from 'class-validator';
import { Category } from './category.entity';
import { ClassValidatorField } from '../../shared/validators/class-validator-field';

export class CategoryRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string | null;

    @IsBoolean()
    is_active?: boolean;

    constructor({name, description, is_active}: Category) {
        Object.assign(this, {name, description, is_active});
    }
}

export class CategoryValidator extends ClassValidatorField<CategoryRules> {
    validate(entity: Category) {
        return super.validate(new CategoryRules(entity));
    }
}

export class CategoryValidatorFactory {
    static create(): CategoryValidator {
        return new CategoryValidator();
    }
}