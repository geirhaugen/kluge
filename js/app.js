/**
 * Created by geirhaugen on 04/02/15.
 */

/**
 * fastLiveFilter jQuery plugin 1.0.3
 *
 * Copyright (c) 2011, Anthony Bush
 * License: <http://www.opensource.org/licenses/bsd-license.php>
 * Project Website: http://anthonybush.com/projects/jquery_fast_live_filter/
 **/

jQuery.fn.fastLiveFilter = function(list, options) {
    // Options: input, list, timeout, callback
    options = options || {};
    list = jQuery(list);
    var input = this;
    var lastFilter = '';
    var timeout = options.timeout || 0;
    var callback = options.callback || function() {};

    var keyTimeout;

    // NOTE: because we cache lis & len here, users would need to re-init the plugin
    // if they modify the list in the DOM later.  This doesn't give us that much speed
    // boost, so perhaps it's not worth putting it here.
    var lis = list.children();
    var len = lis.length;
    var oldDisplay = len > 0 ? lis[0].style.display : "block";
    callback(len); // do a one-time callback on initialization to make sure everything's in sync

    input.change(function() {
        // var startTime = new Date().getTime();
        var filter = input.val().toLowerCase();
        var li, innerText;
        var numShown = 0;
        for (var i = 0; i < len; i++) {
            li = lis[i];
            innerText = !options.selector ?
                (li.textContent || li.innerText || "") :
                $(li).find(options.selector).text();

            if (innerText.toLowerCase().indexOf(filter) >= 0) {
                if (li.style.display == "none") {
                    li.style.display = oldDisplay;
                }
                numShown++;
            } else {
                if (li.style.display != "none") {
                    li.style.display = "none";
                }
            }
        }
        callback(numShown);
        // var endTime = new Date().getTime();
        // console.log('Search for ' + filter + ' took: ' + (endTime - startTime) + ' (' + numShown + ' results)');
        return false;
    }).keydown(function() {
        clearTimeout(keyTimeout);
        keyTimeout = setTimeout(function() {
            if( input.val() === lastFilter ) return;
            lastFilter = input.val();
            input.change();
        }, timeout);
    });
    return this; // maintain jQuery chainability
};


$().ready(function () {
//HTML toggler
    $(".html-toggler").click(function () {
        $(this).parent().parent().toggleClass("activated");
        $(".styleguide").toggleClass("viewHtml");
    });


    $(".js-toggleNext").click(function () {
        $(this).next().toggleClass("activated");
    });

    $(".helper-toggler").click(function () {
        $(this).parent().parent().toggleClass("viewHelpers");
    });

    $(".js-btn-menuToggler").click(function () {
        $(".js-mainNavigationList").toggleClass("activated").attr("aria-hidden","false");
        $(this).toggleClass("activated");
    });

    $(function() {
        $('#search_input').fastLiveFilter('#search_list');
    });

    // Add a markup block after each live example container
    $('.live-example').after("<div class='markup'></div>");

// Fill the markup block with the code from the live container
    $('.live-example').each(function () {
        $(this).next($('.markup')).text($(this).html());
    });

    // Wrap the code in the markup block with a <pre> tag for prettyprinting
    $('.markup').wrapInner('<pre class="prettyprint " />');
});

