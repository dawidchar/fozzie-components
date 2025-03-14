import argumentStringBuilder from '../../test-utils/component-objects/argumentStringBuilder';

const Checkout = require('../../test-utils/component-objects/f-checkout.component');

let checkout;

describe('f-checkout "delivery" component tests', () => {
    describe('uk tenant', () => {
        beforeEach(() => {
            // Arrange
            checkout = new Checkout();

            const args = argumentStringBuilder();
            checkout.withQuery('args', args);

            // Act
            checkout.load();
        });

        it('should enable a user to submit a postcode with correct characters', () => {
            // Act
            checkout.goToPayment();

            // Assert
            expect(checkout.isPostcodeTypeErrorDisplayed()).toBe(false);
        });
    });

    describe('au tenant', () => {
        describe('and age verification is not required', () => {
            beforeEach(() => {
                // Arrange
                checkout = new Checkout();

                const args = argumentStringBuilder({ isLoggedIn: false, locale: 'en-AU' });
                checkout.withQuery('args', args);

                // Act
                checkout.load();
            });

            it('should prevent more than 50 characters in state field', () => {
                // Arrange
                const field = 'addressAdministrativeArea';
                const userEntry = 'A'.repeat(50 + 1); // Enter more than allowed

                // Act
                checkout.setFieldValue(field, userEntry);

                // Assert
                expect(checkout.getFieldValue(field).length).toEqual(50);
            });
        });

        describe('and age verification is required', () => {
            beforeEach(() => {
                // Arrange
                checkout = new Checkout();

                const args = argumentStringBuilder({ locale: 'en-AU', getBasketError: 'age-restriction' });
                checkout.withQuery('args', args);

                // Act
                checkout.loadAgeVerification();
            });

            it('should display the age verification', () => {
                // Assert
                expect(checkout.isAgeVerificationDisplayed()).toBe(true);
            });

            it('should display a field error if the age is younger than 18', () => {
                // Arrange
                const todaysDate = new Date();
                const dob = {
                    day: todaysDate.getDay(),
                    month: todaysDate.toLocaleString('default', { month: 'long' }),
                    year: todaysDate.getFullYear() - 17 // The user is 17 years old
                };

                // Act
                checkout.populateAgeVerificationForm(dob);
                checkout.ageVerificationSubmitButton.click();

                // Assert
                expect(checkout.isAgeVerificationErrorDisplayed()).toBe(true);
            });
        });
    });
});

describe('f-checkout "delivery" - split notes - component tests', () => {
    it('should open the courier and kitchen notes accordions and populate them', () => {
        // Arrange
        checkout = new Checkout();

        const args = argumentStringBuilder({ noteType: 'get-notes-config-split' });
        checkout.withQuery('args', args);

        // Act
        checkout.load();
        checkout.waitForComponent();

        // Assert
        checkout.expandAndPopulateNote('courierAccordionHeader', 'courierNote', 'This is a courier note');
        checkout.expandAndPopulateNote('kitchenAccordionHeader', 'kitchenNote', 'This is a kitchen note');
        checkout.goToPayment();
    });
});
