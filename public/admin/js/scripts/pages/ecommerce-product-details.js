/*************************************
*        Default Score Rating        *
**************************************/
$.fn.raty.defaults.path = '/admin/images/raty/';

$('.ratings').raty({
    readOnly: true,
    score: 4.5
});

// Star Review
$('#customer-review').raty({
    half: true,
});

$(".touchspin").TouchSpin({ min: 1, max: 10 });