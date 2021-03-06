/* Copyright by Paweł Klockiewicz; MIT licensed */
$.fn.loadMore = function(options) {
    var contentIsLoading = false;
    var settings = $.extend({
        containerSelector: '#posts',
        loadingSelector: '#loading',
        requestUrl: 'objects.php?page=',
        requestOnStart: true,
        requestOnScroll: false,
        pagesCount: 0,
        onComplete: null
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

    function setCurrentPage(page) {
        $(document.body).attr('data-page', page);
    }

    function appendContent(buttonSelector) {
        if (contentIsLoading) {
            return;
        }

        contentIsLoading = true;
        showLoading();
        hideButton(buttonSelector);

        var page = parseInt($(document.body).attr('data-page'));
        var nextPage = page + 1;

        $.get(settings.requestUrl + nextPage, function(data, status) {
            hideLoading();
            setCurrentPage(nextPage);

            if ($(buttonSelector).parent(settings.containerSelector).length) {
                $(buttonSelector).before(data);
            } else {
                $(settings.containerSelector).append(data);
            }

            if ((settings.pagesCount > 0) && (settings.pagesCount == nextPage)) {
                hideButton(buttonSelector);
                return;
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
        setCurrentPage(0);

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