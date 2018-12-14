/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('URLs are defined and non-empty', function() {

            // Loop through allFeeds and expect that url is defined and non-empty
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('names are defined and non-empty', function() {

            // Loop through allFeeds and expect that name is defined and non-empty
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* Write a new test suite named "The menu" */

    describe('The menu', function() {

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        // Expect that <body> have a class "menu-hidden"
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        // Expect that <body> class "menu-hidden" is toggled when menu icon is clicked
        it('toggles visibility when menu icon is clicked', function() {

            // Force first click
            $('.menu-icon-link').trigger('click');

            // Expect that <body> does not have a class "menu-hidden"
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            // Force first click
            $('.menu-icon-link').trigger('click');

            // Expect that <body> have a class "menu-hidden"
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });

    /* Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function(done) {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // beforeEach() runs before the specs and done() signals to the framework that the async function (in this case loadFeed) is done
        beforeEach(function(done) {

            // Load the first defined feed (index of 0). done is set as callback
            loadFeed(0, done);
        });

        // Expect at least one .entry on .feed
        it('contains at least one entry on load', function() {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });

    });

    /* Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function(done) {

        // Declare variables here to be used on specs
        var previousEntry;
        var nextEntry;

        // beforeEach() runs before the specs and done() signals to the framework that the async function (in this case loadFeed) is done
        beforeEach(function(done) {

            // Load feed with index of 0 and save its h2 text to variable
            loadFeed(0, function() {
                previousEntry = $('.feed').html();

                // Load feed with index of 1 and save its h2 text to variable
                loadFeed(1, function() {
                    nextEntry = $('.feed').html();
                    done();
                });
            });

        });

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // Expect that the value in previousEntry is different than nextEntry
        it('content changes', function(done) {
            console.log(previousEntry);
            console.log(nextEntry);
            expect(previousEntry).not.toEqual(nextEntry);
            done();
        });

    });
}());
