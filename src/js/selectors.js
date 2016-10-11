/**
 * Created by Royal PR (Paul Burilichev) on 08-Aug-16.
 *
 * Here: actions on specific selectors.
 */

// main menu dropdown action
$('#header nav .dropdown').dropdown({
    on: 'hover',
    duration: 0,
    delay: {
        show: 0,
        hide: 0
    }
});

// currency menu
$('.currency .dropdown').dropdown({
    duration: 0,
    delay: {
        show: 0,
        hide: 0
    }
});


// search tabs actions
$('#search-tabs .menu .item').tab();