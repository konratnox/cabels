function mainSlider(speed, autoPlayTimer) {

			var header = $('.mainSlider .sliderPicture img').attr('data-header');
			var text = $('.mainSlider .sliderPicture img').attr('data-text');
			var href = $('.mainSlider .sliderPicture img').attr('data-href');
			$(".currentItemInfo .itemHeader" ).html(header);
		    $('.currentItemInfo .itemText').html(text);
		    $('.currentItemInfo .goToRazdel a').attr('href', href);

			var mayGo = 1;
			var mayGo_pag = 1;
			var timeoutID;
				
			$('.mainSlider .sliderItem:first').css('left', '0').addClass('active');
			function changeLi(ind){
				var currentIndex = $('.sliderPagination .current').index();
			    $('.sliderPagination a').removeClass('current');
			    $('.sliderPagination a').eq(ind).addClass('current');
			}
		 $('.sliderItem').each(function(){
			$('.sliderPagination').append('<a href="#">&nbsp;</a>');
			$('.sliderPagination a:first').addClass('current');
		});

		

		$('.sliderPagination a').click(function(e){

		e.preventDefault();
		var myButton = $(this);
		var ind = myButton.index();

		if (mayGo_pag) {
				
			var oldSlide = $('.sliderItems .active');
			var oldInd = oldSlide.index();
			var newSlide = $('.sliderItems .sliderItem').eq(myButton.index());
			 if (oldSlide.next().length > 0) {
				var newSlide = $('.sliderItems .sliderItem').eq(myButton.index());
			 } else {
			 	var newSlide = $('.sliderItems .sliderItem:first');
			 }
			 	var newIndex = newSlide.index();
			 	if (oldInd != newIndex) {
				 	mayGo_pag = 0;
				 	newSlide.css('left', '100%');
				 	var header = $(newSlide).children().children().attr('data-header');
					var text = $(newSlide).children().children().attr('data-text');
					var href = $(newSlide).children().children().attr('data-href');
					
					$.when(
							$('.currItemToFade').fadeOut( speed, function() {
						    $(".currentItemInfo .itemHeader" ).html(header),
						    $('.currentItemInfo .itemText').html(text),
						    $('.currentItemInfo .goToRazdel a').attr('href', href);
						  }),
	                    	oldSlide.animate({'left': '-100%'}, speed, function() {
	                    		
	                    		oldSlide.removeClass('active');
	                    	}),
	                    	newSlide.animate({'left': '0'}, speed, function() {
	                    		newSlide.addClass('active'),
	                    		$('.currItemToFade').fadeIn(speed),
	                    		oldSlide.css('left', '100%')
	                    	})

	                	).then(function() {
							mayGo_pag = 1;
						});
						changeLi(newIndex);
					 clearTimeout(timeoutID);
					 timeoutID = setTimeout(autoPlay, autoPlayTimer);
					}
			}
	        
    	
		
	});
			


			$('.rightArrow').click(function(event) {
				event.preventDefault();
			 if (mayGo) {
				mayGo = 0;
				var oldSlide = $('.sliderItems .active');
				if ($('.sliderItems .active').next().length > 0) {
					var newSlide = $('.sliderItems .active').next(); 
				} else {
					var newSlide = $('.sliderItems .sliderItem:first'); 
				} 
				newSlide.css('left', '100%');
				var header = $(newSlide).children().children().attr('data-header');
			
				var text = $(newSlide).children().children().attr('data-text');
				var href = $(newSlide).children().children().attr('data-href');
				var newIndex = newSlide.index();
				
				$.when(
						$('.currItemToFade').fadeOut( speed, function() {
						    $(".currentItemInfo .itemHeader" ).html(header),
						    $('.currentItemInfo .itemText').html(text),
						    $('.currentItemInfo .goToRazdel a').attr('href', href);
						  }),
                    	oldSlide.animate({'left': '-100%'}, speed, function() {
                    		
                    		oldSlide.removeClass('active')
                    		
                    	}),
                    	newSlide.animate({'left': '0'}, speed, function() {
                    		newSlide.addClass('active'),
                    		changeLi(newIndex),
                    		$('.currItemToFade').fadeIn(speed)
                    	})

                	).then(function() {
						mayGo = 1;
					});
				 clearTimeout(timeoutID);
				 timeoutID = setTimeout(autoPlay, autoPlayTimer);
				return false;
				 }	
			});
			$('.leftArrow').click(function(event) { 
				event.preventDefault();
			if (mayGo) {
					mayGo = 0;
					var oldSlide = $('.sliderItems .active'); 
					if ($('.sliderItems .active').prev().length > 0) { 
						var newSlide = $('.sliderItems .active').prev(); 
					} else {
					 	var newSlide = $('.sliderItems .sliderItem:last'); 
					} 
					newSlide.css('left', '-100%'); 
					var header = $(newSlide).children().children().attr('data-header');

					var text = $(newSlide).children().children().attr('data-text');
					var href = $(newSlide).children().children().attr('data-href');
					var newIndex = newSlide.index();
						$.when(
							$('.currItemToFade').fadeOut( speed, function() {
						    $(".currentItemInfo .itemHeader" ).html(header),
						    $('.currentItemInfo .itemText').html(text),
						    $('.currentItemInfo .goToRazdel a').attr('href', href);
						  }),
						oldSlide.animate({'left': '100%'}, speed, function() {
							oldSlide.removeClass('active');
						}),
						newSlide.animate({'left': '0'}, speed, function() {
							newSlide.addClass('active'),
							changeLi(newIndex),
                    		$('.currItemToFade').fadeIn(speed)
						})
					).then(function() {
						mayGo = 1;
					});
					// newSlide.animate({'left': "0"}, speed).addClass('active'); 
					// oldSlide.animate({'left': '100%'}, speed).removeClass('active'); 
					clearTimeout(timeoutID);
					timeoutID = setTimeout(autoPlay, autoPlayTimer);
					return false;
			}
			}); 
			function autoPlay() { 
				$('.rightArrow').click();
				// var timeoutID = setTimeout(autoPlay, autoPlayTimer);
				// clearTimeout(timeoutID);
			}
				if (autoPlayTimer > 0)
				timeoutID = setTimeout(autoPlay, autoPlayTimer);

			}


$(document).ready(function() {
	$('.searchSel').wSelect();
	 mainSlider(600,5000);
});