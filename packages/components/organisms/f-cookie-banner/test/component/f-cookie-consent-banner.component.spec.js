import forEach from 'mocha-each';

const CookieBanner = require('../../test-utils/component-objects/f-cookie-consent-banner.component');

let cookieBanner;

describe('New - f-cookie-banner component tests', () => {
    beforeEach(() => {
        cookieBanner = new CookieBanner();
    });

    forEach(['full', 'necessary'])
    .it('should set "je-cookie_banner" and "je-cookieConsent" to expected cookie values for "%s"', expectedCookieValue => {
        // Arrange
        cookieBanner.withQuery('args', 'locale:en-IE');

        // Act
        cookieBanner.load();
        cookieBanner.acceptCookies(expectedCookieValue);

        // Arrange
        const [bannerCookie] = browser.getCookies().filter(cookie => cookie.name === 'je-banner_cookie');
        const [bannerConsent] = browser.getCookies().filter(cookie => cookie.name === 'je-cookieConsent');

        // Assert
        expect(bannerCookie.value).toBe('130315');
        expect(bannerConsent.value).toBe(expectedCookieValue);
    });

    forEach(['es-ES', 'en-IE', 'it-IT', 'en-GB'])
    .it('should display the f-cookie-banner component for "%s"', tenant => {
        // Arrange
        cookieBanner.withQuery('args', `locale:${tenant}`);

        // Act
        cookieBanner.load();

        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB', 'uk/info/cookies-policy'],
        ['es-ES', 'es/info/politica-de-cookies'],
        ['en-IE', 'ie/info/cookies-policy'],
        ['it-IT', 'it/informazioni/politica-dei-cookie']
    ])
        .it('should go to the correct cookie policy page', (tenant, expectedCookiePolicyUrl) => {
            // Arrange
            cookieBanner.withQuery('args', `locale:${tenant}`);

            // Act
            cookieBanner.load();
            cookieBanner.clickCookiePolicyLink();
            browser.switchWindow(new RegExp(`^.*${expectedCookiePolicyUrl}.*$`));

            // Assert
            expect(browser.getUrl()).toContain(expectedCookiePolicyUrl);
        });
});
