// ( function ( $ ) {
    // 'use strict';
    $( document ).ready( function () {
    	$(' .slide .slide__show').slick({
		    'infinite': true,
		    'speed': 700,
		    'autoplay':true,
		    'autoplaySpeed': 2000,
		    'slidesToShow': 1,
		    'slidesToScroll': 1,
		    'prevArrow': '.prev',
			'nextArrow': '.next'
		 });
    	
    });
// } ( jQuery ) );
