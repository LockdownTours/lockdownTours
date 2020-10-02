$(document).ready(function () {
  // clear preference
  localStorage.setItem("tourDetails", null);
  setTimeout(function () {
    $(".navbar-toggler-icon").click();
  }, 500);
  $(".navbar-toggler").hide();
  $(window).scrollTop(0);
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

$(window).scroll(function (e) {
  $(".navbar-toggler").show();
  setTimeout(function () {
    var height = $(window).scrollTop();
    if (height > 300) {
      $(".navbar").addClass("navbarTitle");
      $("#navbarHeader").addClass("navbarContent");
      $("body").css("margin-top", "100px");
      if ($("#navbarHeader").hasClass("show")) {
        $("#navbarHeader").removeClass("show");
      }
    }
  }, 500);
});
