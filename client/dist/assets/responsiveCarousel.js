(function ($) {
  $(function () {
    var jcarousel = $('.jcarousel');

    jcarousel
      .jcarousel({
        wrap: 'none'
      });

    $('.jcarousel-control-prev')
      .jcarouselControl({
        target: '-=1'
      });

    $('.jcarousel-control-next')
      .jcarouselControl({
        target: '+=1'
      });
  });
})(jQuery);