import { Category } from "../category.entity";

describe('Category Unit Tests', () => {
    describe('constructor', () => {
        test('should create a category with default values', () => {
            const category = new Category({
                        name: 'Movie',
                    });
            expect(category.category_id).toBeUndefined();
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
        
        test('should create a category with all properties', () => {
            const created_at = new Date();
            const category = new Category({
                category_id: '123',
                name: 'Movie',
                description: 'some description',
                is_active: false,
                created_at,
            });

            expect(category.category_id).toBe('123');
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('some description');
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBe(created_at);
        });
    });

    describe('Category Create Command', () => {
        test('should create a category using the create method', () => {
            const category = Category.create({
                name: 'Movie',
                description: 'some description',
                is_active: true,
            });

            expect(category).toBeInstanceOf(Category);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('some description');
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });

        test('should create a category with default values using the create method', () => {
            const category = Category.create({
                name: 'Movie',
            });

            expect(category).toBeInstanceOf(Category);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });

        test('should create a category with activate status using the create method', () => {
            const category = Category.create({
                name: 'Movie',
                is_active: true,
            });

            expect(category).toBeInstanceOf(Category);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });

        test('should create a category with deactivated status using the create method', () => {
            const category = Category.create({
                name: 'Movie',
                is_active: false,
            });

            expect(category).toBeInstanceOf(Category);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
    });
});