/* Copyright by Paweł Klockiewicz; MIT licensed */
$.fn.loadMore = function(options) {
	var contentIsLoading  = false;
	var settings 		  = $.extend({
		containerSelector	: '#posts',
		requestUrl			: 'objects.php?page=',
		requestOnStart		: true,
		requestOnScroll		: false,
        loadingSelector	 	: '#loading',
        onComplete          : null
	}, options);

	function showLoading() {		
		$(settings.loadingSelector).show();		
	}
	
	function hideLoading() {		
		$(settings.loadingSelector).hide();
	}
	
	function showButton(buttonSelector) {
		$(buttonSelector).show();
	}
	
	function hideButton(buttonSelector) {
		$(buttonSelector).hide();
    }

	function setCurrentPage(page, buttonSelector) {
		$(buttonSelector).attr('data-page', page);
	}

	function appendContent(buttonSelector) {
		if (contentIsLoading) {
			return; 
		}

		contentIsLoading = true;
		showLoading();
		hideButton(buttonSelector);
        
        var page = parseInt($(buttonSelector).attr('data-page'));
		var nextPage = page + 1;	

		$.get(settings.requestUrl + nextPage, function(data, status) {             
			hideLoading();
            setCurrentPage(nextPage, buttonSelector);
            
            if ($(buttonSelector).parent(settings.containerSelector).length) {
                $(buttonSelector).before(data);     
            } else {
                $(settings.containerSelector).append(data);
            }

			if (!settings.requestOnScroll) {
				showButton(buttonSelector);
            }
            
            if ($.isFunction(settings.onComplete)) {
                settings.onComplete.call(buttonSelector);
            }

			contentIsLoading = false;
		}).fail(function() {
            console.log("Can't load content...");
            hideLoading();
            hideButton(buttonSelector);
        });                 
	}

	function appendContentOnScroll(buttonSelector) {
		var contentHeight = $(settings.containerSelector).outerHeight();        
		var currentY = window.innerHeight + $(window).scrollTop();
		
		if (currentY >= contentHeight) {
			appendContent(buttonSelector)
		}
	}

	return this.each(function() {
        setCurrentPage(0, this);

		if (settings.requestOnStart) {
			appendContent(this);
		}

		if (settings.requestOnScroll) {
			$(document).on('scroll', function() {
				appendContentOnScroll(this);   
			}); 
		} else {
			$(this).on('click', function(event) {
                event.preventDefault();
				appendContent(this);
			});
        }
	});
};