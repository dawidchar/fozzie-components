const Page = require('@justeat/f-wdio-utils/src/page.object');

module.exports = class ImageTile extends Page {
    constructor () {
        super('atom', 'image-tile-component');
    }

    get component () { return $('[data-test-id="image-tile-component"]'); }

    load () {
        super.load(this.component);
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    isComponentDisplayed () {
        return this.component.isDisplayed();
    }

    isComponentClickable () {
        return this.component.isClickable();
    }
};
