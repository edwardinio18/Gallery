$(document).ready(function () {
  const LIMIT = 60;
  const CONTAINER_LIMIT = 5;

  var page = Math.floor(Math.random() * 9) + 1;

  for (var i = 1; i <= CONTAINER_LIMIT; i++) {
    $("body").append(
      '<div class="outer_main_container_wrapper" id="outer_main_container_wrapper_' +
        i +
        '"><ul class="scrolling_image_carousel_container" id="scrolling_image_carousel_container_' +
        i +
        '"></ul></div>'
    );
  }

  var counter = 0;

  $.ajax({
    url:
      "https://pixabay.com/api/?key=19958918-0e6ddfbb3d66051e4cf7701d5&per_page=" +
      LIMIT +
      "&page=" +
      page +
      "&safesearch=true",
    method: "GET",
    success: function (data) {
      for (var i = 0; i < LIMIT; i++) {
        if (i % (LIMIT / CONTAINER_LIMIT) == 0) {
          counter++;
        }

        $("#scrolling_image_carousel_container_" + counter).append(
          '<li class="image_item" data-views="' +
            data.hits[i].views +
            '" data-downloads="' +
            data.hits[i].downloads +
            '" data-favorites="' +
            data.hits[i].favorites +
            '" data-likes="' +
            data.hits[i].likes +
            '" data-comments="' +
            data.hits[i].comments +
            '" data-user="' +
            data.hits[i].user +
            '" data-userimage="' +
            data.hits[i].userImageURL +
            '" data-image="' +
            data.hits[i].webformatURL +
            '" data-userid="' +
            data.hits[i].user_id +
            '"><img src="' +
            data.hits[i].webformatURL +
            '" class="image" /></li>'
        );
      }

      for (var i = 0; i < CONTAINER_LIMIT; i++) {
        var speed = Math.floor(Math.random() * 130) + 85;

        $("#scrolling_image_carousel_container_" + (i + 1)).ticker({
          item: "li",
          pauseOnHover: true,
          speed: speed,
        });
      }
    },
  }).then(function () {
    $("body").append(
      '<div class="outer_footer"><div class="footer"><p class="footer_content">&#169; 2021 Iakab Edward | Toate Drepturile Rezervate</p></div></div>'
    );
    $(".title").css("display", "table-cell");
    $(".search_image").css("display", "block");
    $(".outer_main_container_wrapper").css("display", "block");
  });

  $(document).on("click", ".image_item", function () {
    var views = $(this).data("views");
    var downloads = $(this).data("downloads");
    var favorites = $(this).data("favorites");
    var likes = $(this).data("likes");
    var comments = $(this).data("comments");
    var user = $(this).data("user");
    var userImage = $(this).data("userimage");
    var image = $(this).data("image");
    var userId = $(this).data("userid");

    var viewsText = views + " vizionari";
    var downloadsText = downloads + " descarcari";
    var favoritesText = favorites + " favorizari";
    var likesText = likes + " aprecieri";
    var commentsText = comments + " comentarii";

    if (views == 1) {
      viewsText = "1 vizionare";
    }

    if (downloads == 1) {
      downloadsText = "1 descarcare";
    }

    if (favorites == 1) {
      favoritesText = "1 favorizare";
    }

    if (likes == 1) {
      likesText = "1 apreciere";
    }

    if (comments == 1) {
      commentsText = "1 comentariu";
    }

    if (userImage == "") {
      userImage = "images/profile_picture_placeholder.png";
    }

    $("body").prepend(
      '<div class="background_overlay"><div class="background_overlay_content_container"><span class="close_overlay_x">&times;</span><div class="overlay_image_preview_container"><img src="' +
        image +
        '" class="overlay_image_preview"></div><div class="outer_main_image_details_wrapper"><div class="overlay_image_details_container"><ul class="image_details_list"><li class="image_details_each_item"><img src="images/views.png" class="each_detail_image" /><p class="each_detail_content">' +
        viewsText +
        '</p></li><li class="image_details_each_item"><img src="images/favorite.png" class="each_detail_image" /><p class="each_detail_content">' +
        favoritesText +
        '</p></li><li class="image_details_each_item"><img src="images/comment.png" class="each_detail_image" /><p class="each_detail_content">' +
        commentsText +
        '</p></li><li class="image_details_each_item"><img src="images/like.png" class="each_detail_image" /><p class="each_detail_content">' +
        likesText +
        '</p></li><li class="image_details_each_item"><img src="images/download.png" class="each_detail_image" /><p class="each_detail_content">' +
        downloadsText +
        '</p></li></ul></div><div class="user_details_container"><div class="user_name_wrapper_1 user_name_wrapper"><p class="user_name_1">Incarcat de:</p></div><div class="user_name_wrapper_2 user_name_wrapper"><a target="_blank" class="user_label_link" href="https://pixabay.com/users/' +
        user +
        "-" +
        userId +
        '"><p class="user_name_2">' +
        user +
        '</p></a></div><img src="' +
        userImage +
        '" class="user_profile_picture" /><div class="download_picture_container" data-image="' +
        image +
        '"><img src="images/download.png" class="download_image" /><p class="download_image_label">Descarcati imaginea (D)</p></div></div></div></div></div>'
    );
  });

  function getFileName(str) {
    return str.substring(str.lastIndexOf("/") + 1);
  }

  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      if ($(".background_overlay").is(":visible")) {
        $(".background_overlay").remove();
      } else if ($(".background_overlay_search").is(":visible")) {
        $(".background_overlay_search").remove();
      }
    } else if (e.keyCode === 68) {
      if ($(".download_picture_container").is(":visible")) {
        var image = $(".download_picture_container").data("image");

        saveAs(image, getFileName(image));
      }
    } else if (e.keyCode === 83) {
      $(".search_image").trigger("click");
    }
  });

  $(document).on("click", ".close_overlay_x", function () {
    $(".background_overlay").remove();
  });

  $(document).on("click", ".download_picture_container", function () {
    var image = $(this).data("image");

    saveAs(image, getFileName(image));
  });

  $(document).on("click", ".search_image", function () {
    if ($(".background_overlay").is(":visible")) {
      $(".background_overlay").remove();
    }

    if (!$(".background_overlay_search").is(":visible")) {
      $("body").prepend(
        '<div class="background_overlay_search" id="background_overlay_search"><span class="close_overlay_x_search">&times;</span><div class="title_container_search"><h1 class="title_search">Cautare poze</h1></div><input type="text" name="search" class="search_input" placeholder="Cauta dupa cuvinte cheie (engleza)" autocomplete="off" /><div class="main_outer_searched_results_container"><p class="search_results_counter"></p><div class="inner_outer_main_container_results inner_outer_main_container_results_columns"></div></div></div>'
      );

      $(".search_input").val("");

      setTimeout(function () {
        $(".search_input").focus();
      }, 50);
    }
  });

  $(document).on("click", ".close_overlay_x_search", function () {
    $(".background_overlay_search").remove();
  });

  $(document).on("focus", ".search_input", function () {
    $(this).animate(
      {
        width: "65%",
      },
      125
    );
  });

  $(document).on("blur", ".search_input", function () {
    $(this).animate(
      {
        width: "55%",
      },
      125
    );
  });

  $(document).on("keyup", ".search_input", function () {
    $(".inner_outer_main_container_results").empty();

    var query = $(this).val();

    if (query != "") {
      $.ajax({
        url:
          "https://pixabay.com/api/?key=19958918-0e6ddfbb3d66051e4cf7701d5&per_page=200&q=" +
          encodeURIComponent(query),
        method: "GET",
        success: function (data) {
          $(".main_outer_searched_results_container").css("display", "block");

          if (data.hits.length == 0) {
            $(".search_results_counter").html("0 rezultate");
            $(".inner_outer_main_container_results").removeClass(
              "inner_outer_main_container_results_columns"
            );
            $(".inner_outer_main_container_results").removeAttr("style");
            $(".inner_outer_main_container_results").html(
              '<p class="no_results_search">Nu s-a gasit nicio poza care sa contina intrarea ta!</p>'
            );
          } else {
            $(".inner_outer_main_container_results").addClass(
              "inner_outer_main_container_results_columns"
            );

            var resultsCounterText = data.hits.length + " rezultate";

            if (data.hits.length == 1 || data.hits.length == 2) {
              resultsCounterText = "1 rezultat";
              $(".inner_outer_main_container_results").attr(
                "style",
                "column-count: 2"
              );
            } else if (data.hits.length == 3) {
              $(".inner_outer_main_container_results").attr(
                "style",
                "column-count: 1"
              );
            } else if (data.hits.length == 200) {
              resultsCounterText = "200+ rezultate";
              $(".inner_outer_main_container_results").attr(
                "style",
                "column-count: 4"
              );
            } else if (data.hits.length > 3 && data.hits.length < 200) {
              resultsCounterText = data.hits.length + " rezultate";
              $(".inner_outer_main_container_results").attr(
                "style",
                "column-count: 4"
              );
            }

            $(".search_results_counter").html(resultsCounterText);

            for (var i = 0; i < data.hits.length; i++) {
              $(".inner_outer_main_container_results").append(
                '<div class="each_result_container" data-views="' +
                  data.hits[i].views +
                  '" data-downloads="' +
                  data.hits[i].downloads +
                  '" data-favorites="' +
                  data.hits[i].favorites +
                  '" data-likes="' +
                  data.hits[i].likes +
                  '" data-comments="' +
                  data.hits[i].comments +
                  '" data-user="' +
                  data.hits[i].user +
                  '" data-userimage="' +
                  data.hits[i].userImageURL +
                  '" data-image="' +
                  data.hits[i].webformatURL +
                  '" data-userid="' +
                  data.hits[i].user_id +
                  '"><img src="' +
                  data.hits[i].webformatURL +
                  '" class="each_result_image" /></div>'
              );
            }

            var e = $.Event("keypress");
            e.which = 13;
            $(".search_input").trigger(e);
          }

          var e = $.Event("keypress");
          e.which = 13;
          $(".search_input").trigger(e);
        },
      });
    } else {
      $(".main_outer_searched_results_container").css("display", "none");
    }
  });

  $(document).on("click", ".each_result_container", function () {
    var views = $(this).data("views");
    var downloads = $(this).data("downloads");
    var favorites = $(this).data("favorites");
    var likes = $(this).data("likes");
    var comments = $(this).data("comments");
    var user = $(this).data("user");
    var userImage = $(this).data("userimage");
    var image = $(this).data("image");
    var userId = $(this).data("userid");

    var viewsText = views + " vizionari";
    var downloadsText = downloads + " descarcari";
    var favoritesText = favorites + " favorizari";
    var likesText = likes + " aprecieri";
    var commentsText = comments + " comentarii";

    if (views == 1) {
      viewsText = "1 vizionare";
    }

    if (downloads == 1) {
      downloadsText = "1 descarcare";
    }

    if (favorites == 1) {
      favoritesText = "1 favorizare";
    }

    if (likes == 1) {
      likesText = "1 apreciere";
    }

    if (comments == 1) {
      commentsText = "1 comentariu";
    }

    if (userImage == "") {
      userImage = "images/profile_picture_placeholder.png";
    }

    $(".background_overlay_search").prepend(
      '<div class="background_overlay"><div class="background_overlay_content_container"><span class="close_overlay_x">&times;</span><div class="overlay_image_preview_container"><img src="' +
        image +
        '" class="overlay_image_preview"></div><div class="outer_main_image_details_wrapper"><div class="overlay_image_details_container"><ul class="image_details_list"><li class="image_details_each_item"><img src="images/views.png" class="each_detail_image" /><p class="each_detail_content">' +
        viewsText +
        '</p></li><li class="image_details_each_item"><img src="images/favorite.png" class="each_detail_image" /><p class="each_detail_content">' +
        favoritesText +
        '</p></li><li class="image_details_each_item"><img src="images/comment.png" class="each_detail_image" /><p class="each_detail_content">' +
        commentsText +
        '</p></li><li class="image_details_each_item"><img src="images/like.png" class="each_detail_image" /><p class="each_detail_content">' +
        likesText +
        '</p></li><li class="image_details_each_item"><img src="images/download.png" class="each_detail_image" /><p class="each_detail_content">' +
        downloadsText +
        '</p></li></ul></div><div class="user_details_container"><div class="user_name_wrapper_1 user_name_wrapper"><p class="user_name_1">Incarcat de:</p></div><div class="user_name_wrapper_2 user_name_wrapper"><a target="_blank" class="user_label_link" href="https://pixabay.com/users/' +
        user +
        "-" +
        userId +
        '"><p class="user_name_2">' +
        user +
        '</p></a></div><img src="' +
        userImage +
        '" class="user_profile_picture" /><div class="download_picture_container" data-image="' +
        image +
        '"><img src="images/download.png" class="download_image" /><p class="download_image_label">Descarcati imaginea (D)</p></div></div></div></div></div>'
    );
  });

  document.addEventListener(
    "scroll",
    function (e) {
      if (e.target.id === "background_overlay_search") {
        if ($(".background_overlay_search").scrollTop() > 600) {
          $(".up_image").css("display", "block");
        } else {
          $(".up_image").css("display", "none");
        }
      }
    },
    true
  );

  $(document).on("click", ".up_image", function () {
    $(".background_overlay_search").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });
});
