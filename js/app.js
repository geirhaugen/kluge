/**
 * Created by geirhaugen on 04/02/15.
 */
$().ready(function () {
//HTML toggler
    $(".html-toggler").click(function () {
        $(this).parent().parent().toggleClass("activated");
        $(".styleguide").toggleClass("viewHtml");
    });

    $(".helper-toggler").click(function () {
        $(this).parent().parent().toggleClass("viewHelpers");
    });

    $(".js-btn-menuToggler").click(function () {
        $(".js-mainNavigationList").slideToggle().attr("aria-hidden","false");

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

