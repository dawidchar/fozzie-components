const MegaModal = require('../../test-utils/component-objects/f-mega-modal.component');

const megaModal = new MegaModal();

describe('f-mega-modal component tests', () => {
    beforeEach(() => {
        megaModal.load();
    });

    it('should display f-mega-modal component', () => {
        // Assert
        expect(megaModal.isComponentDisplayed()).toBe(true);
    });

    it('should display the title', () => {
        // Assert
        expect(megaModal.isTitleDisplayed()).toBe(true);
    });

    it('should display the content', () => {
        // Assert
        expect(megaModal.isContentDisplayed()).toBe(true);
    });
});
