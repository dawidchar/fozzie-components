# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v5.0.0
------------------------------
*February 23, 2022*

### Changed
- **Breaking Change** `logWhileInitialising` function and test in line with new log interface. Make sure to use this.$log instead of this.$logger for this version to work.

### Removed
- local logging service.


v4.2.0
------------------------------
*February 08, 2022*

### Added
- urlLocationSubstitution filter to replace any URL placeholders
- tests for new filter


v4.1.0
------------------------------
*January 18, 2022*

### Added
- CurrentLocation to consumer options
- locationFilter to match users current location if given or exists on card
- tests for new filter


v4.0.0
------------------------------
*November 09, 2021*

### Changed
- Updating version to non beta ready for stamp cards


v4.0.0-beta.6
------------------------------
*September 24, 2021*

### Changed
- Updated changeUser method to be the correct implementation based on new brazeSDK


v4.0.0-beta.5
------------------------------
*September 07, 2021*

### Added
- Finer detailed log events for greater error and event visibility


v4.0.0-beta.4
------------------------------
*September 02, 2021*

### Changed
- Changed sdk url to correct version


v4.0.0-beta.3
------------------------------
*July 20, 2021*

### Changed
- Changed how braze adapter is initialised, it is no longer async
- Increased Braze sdk to the latest version
- Modified tests to account for changes
- Made Braze SDK a peer dependency


v4.0.0-beta.2
------------------------------
*July 19, 2021*

### Changed
- Recognises and respects the `is_visible` and `deduplication_key` key-value pairs in the
  content-card data


v3.5.0
------------------------------
*July 19, 2021*

### Changed
- Recognises and respects the `is_visible` and `deduplication_key` key-value pairs in the
  content-card data


v4.0.0-beta.1
------------------------------
*May 19, 2021*

### Added
- BrazeConsumer to store the adapters' consumer config
- BrazeConsumerRegistry to store a list of consumers and apply callbacks for all consumers in list
- BrazeAdapter the entry point to braze adapter via initialize method
- DispatcherEventStream simple pub/sub event system for sending data from dispatcher to registry
- filterByBrandName function to filter by brand name
- filterByCurrentlyActive moved from the contentCard service filter function to separate function
- filterByEnabledCardTypes moved from the contentCard service filter function to separate function
- removeDuplicateContentCards moved from the contentCard service filter function to separate function
- sortByCardOrder moved from the contentCard service filter function to separate function
- pipe function that takes other functions and curries them

### Removed
- contentCard service has now been separated into its functions, they are now curried via the pipe function within
the BrazeConsumer when cards are set on the consumer during the callback.

### Changed
- It now pushes cards and messages out on the DispatcherEventStream via publish method.
- Modified the BrazeDispatcher to no longer be a singleton.
- updated tests to account for changes to the dispatcher


v3.4.0
------------------------------
*April 28, 2021*

### Changed
- If the `je-cookieConsent` cookie is unset, or set to something other than `"full"`, the `noCookies`
  option will be set on initialisation of the braze SDK.


v3.3.0
------------------------------
*March 29, 2021*

### Fixed
- Handled a condition where, if appboy was not initialised when `BrazeDispatcher.configure()` was called,
  and an in-app message was received, an error would be thrown.


v3.2.0
------------------------------
*March 17, 2021*

### Changed
- If present, `location` reflected through to card data


v3.1.0
------------------------------
*March 17, 2021*

### Changed
- If present, `isReadyToClaim` now transformed to a `Boolean`
- If present, `displayTimesJson` now takes effect independent of `brand` being present.


v3.0.0
------------------------------
*February 22, 2021*

### Added
- Properties for stamp-cards card

### Changed
- Renamed package f-braze-adapter from f-metadata

*December 4, 2020*

### Fixed
- Removed optional chaining to fix storybook


v3.0.0-beta.7
------------------------------
*December 2, 2020*

### Added
- Added a logging callbacks to the dispatcher. If provided it returns relevant logging data for each callback.
- Added a logging function and class to support the above callbacks


v3.0.0-beta.6
------------------------------
*November 30, 2020*

### Fixed
- Where cards do not have an order, they are assigned one of `9e9` for ordering, preventing
  erroneous ordering.


v3.0.0-beta.5
------------------------------
*November 23, 2020*

### Fixed
- isCardCurrentlyActive now respects displayTimes JSON as specified
- transformCardData now preserves brand_name as provided by braze


v3.0.0-beta.4
------------------------------
*October 22, 2020*

### Changed
- In arrangeCardsByTitles we now push all card data into group rather than just the title, this is to aid in impressions
 tracking and future headers that require more than the title being displayed.


v3.0.0-beta.3
------------------------------
*October 22, 2020*

### Changed
- Adds grouping functionality to Braze dispatcher via new callback


v3.0.0-beta.2
------------------------------
*October 14, 2020*

### Changed
- Integrates home promo card 1 & 2 changes from released f-content-card


v3.0.0-beta.1
------------------------------
*September 15, 2020*

### Changed
- Vue CLI minor package updates.
- Begins the decoupling of f-metadata from f-content-cards, allowing callbacks for multiple components to be registered


v2.8.1
------------------------------
*June 29, 2020*

### Fixed
- Only subscribe to button click event when the button exists.


v2.8.0
------------------------------
*June 26, 2020*

### Added
- Methods for logging card click and view events, with the view to presenting a consistent
  interface for sending information back to braze:
  - `logCardClick()`
  - `logCardImpressions()`


v2.7.0
------------------------------
*June 24, 2020*

### Changed
- Promises to async/await


v2.6.0
------------------------------
*June 16, 2020*

### Added
- Check for previously initialised Braze instances on window and skip import of the SDK

### Changed
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails)


v2.5.0
------------------------------
*May 27, 2020*

### Changed
- Add `interceptInAppMessageClickEvents` callback method


v2.4.0
------------------------------
*May 13, 2020*

### Changed
- Manually coerce in-app messages to allow apps to intercept and extend functionality.


v2.3.4
------------------------------
*May 12, 2020*

### Changed
- Updating `@vue/cli-plugin-unit-test` to v4.3.1.
- Ordering of callbacks to ensure they're initialised before used


v2.3.3
------------------------------
*May 6, 2020*

### Changed
- `appboy-web-sdk` version from `2.4.1` to `2.5.2`


v2.3.2
------------------------------
*May 4, 2020*

### Fixed
- Cache issue with Braze by setting `sessionTimeoutInSeconds` to `0`.


v2.3.1
------------------------------
*April 3, 2020*

### Fixed
- Failing test (locally) due to dynamic imports not being supported when running `jest` without the `dynamic-import-node` plugin.
- Small linting fix and abstracted out code coverage to separate `test:coverage` script in package.json.


v2.3.0
------------------------------
*March 2, 2020*

### Changed
- Callback with `null` if `apiKey` or `userId` is not defined.
- Return before SDK import if dependencies are not available.


v2.2.0
------------------------------
*February 20, 2020*

### Added
- Jest configuration and unit tests for both server and client.

### Changed
- Promisify `f-metadata` initialisation and improve error handling.
- Callback resolve with the appboy instance.


v2.1.0
------------------------------
*February 18, 2020*

### Changed
- Call `handleContentCards` with an empty array if no content cards are available, enabling any side effects once Braze is called.


v2.0.0
------------------------------
*February 10, 2020*

### Changed
- Callback methods are now called with the whole appboy instance ensuring functionality is available on the appboy instance whenever a refresh is called. This also means that the callback will always return an object even when no content cards are available. Further instructions and upgrade instructions can be found in the [README](README.md).


v1.0.4
------------------------------
*February 10, 2020*

### Fixed
- Ensure that `handleContentCards` callback has been set before attempting to call it.


v1.0.3
------------------------------
*January  29, 2020*

### Added
- `requestContentCardsRefresh()` call back as on some page refreshes it fails to invoke sync.


v1.0.2
------------------------------
*January  29, 2020*

### Changed
- Bumped `appboy-web-sdk` because of a known `contentCard` issue in 2.4.0

### Removed
- `requestContentCardsRefresh()` unnecessary call.

### Fixed
- `ContentCard` - Not displaying on initial first load due to appboy `sync`
calls happening before the sdk is ready to update the
`ab.storage.cc.[api-key]` in localStorage. Now using `subscribeToContentCardsUpdates` to listen
for updates.


v1.0.1
------------------------------
*November 18, 2019*

### Fixed
- GTM event loading issues


v1.0.0
------------------------------
*November 15, 2019*

### Added
- Support for handling content cards through SDK methods
- User ID to `initialiseBraze` function
- Support for GTM with Braze

### Changed
- Changing Braze to be a dynamic import
- Don't bundle `f-metadata`, leave that to the consuming component.


v0.3.0
------------------------------
*October 4, 2019*

### Added
- Babel config (as wasn't transpiling ES functionality)


v0.2.0
------------------------------
*October 2, 2019*

### Added
- `disable` toggle added to disable Braze


v0.1.0
------------------------------
*September 19, 2019*

### Added
- Created package
- Enabling initialisation of Braze
