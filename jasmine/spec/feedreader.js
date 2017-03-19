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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {         
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

// test suite named 'The menu': 1) a test that ensures the menu element is hidden by default. 
// 2) a test that ensures the menu changes visibility when the menu icon is clicked.

          
    describe('The menu', function() {
        it('is hidden by default', function() {
            expect($( "body" ).hasClass( "menu-hidden" )).toBe(true);
        });  

        // This test
          // * should have two expectations: does the menu display when
          // * clicked and does it hide when clicked again.
          // */
        it('show itself on first click', function() {
            $( ".menu-icon-link" ).trigger('click');
            expect($( "body" ).hasClass( "menu-hidden" )).toBe(false);
        });
        
        it('hide itself on second click', function() {
            $( ".menu-icon-link" ).trigger('click');
            expect($( "body" ).hasClass( "menu-hidden" )).toBe(true);
        });

    });

        

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {
        // a test that ensures when the loadFeed function is called
        // and completes its work, there is at least a single .entry 
        // element within .feed container

        // loadFeed() takes in a callback function as parameter, in this case
        // done() function from Jasmine framework is used as a callback to when
        // the asynchronous is "done" as callback
        beforeEach(function(done) {
            loadFeed(1, done);     
        });

        it('has at least one entry element in .feed container', function(done) {
            var $feed = $( ".feed" );
            var $entry = $feed.find(".entry");
            expect($entry.length).toBeGreaterThan(0);
            done();
        });
        
        
    });


    describe('New Feed Selection', function() {
        // a test that ensures when a new feed is loaded "on click" of the menu,
        // the content actually changes

        var firstFeed;
        var secondFeed;
        // load the first id: 0
        // text() returned is a long string of all the h2 of the articles
        beforeEach(function() {
            loadFeed(0, function() {
                firstFeed = $(".entry").children('h2').text();
            });
        });
        // load the second id: 1, done() when finish loading
        beforeEach(function(done) {
            loadFeed(1, function() {
                secondFeed = $(".entry").children('h2').text();
                done();
            });
        });

        it('ensures new feed content actually changes', function(done) {
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });

}());
