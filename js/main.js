$(document).ready(function () {
  AOS.init();
});

$(document).ready(function () {
  $(".videoplace").click(function () {
    // Add 'active' class to the videoplace div
    $(this).addClass("active");

    // Find and play the video inside this div
    $(this).find(".videof")[0].play();
  });
});

$(".hero .changetab").click(function (e) {
  e.preventDefault();
  $(".hero .changetab.active").removeClass("active");
  var nameof = "." + $(this).attr("name");
  $(this).addClass("active");
  $(".hero .tabs").removeClass("active");
  $(nameof).addClass("active");
});

$(document).ready(function () {
  // Clone the logos to create seamless looping
  $(".logos-slide").html($(".logos-slide").html() + $(".logos-slide").html());

  function animateLogos() {
    $(".logos-slide").css("transform", "translateX(0)");
    $(".logos-slide").animate(
      { "margin-left": "-50%" },
      {
        duration: 60000, // 60 seconds - adjust for speed
        easing: "linear",
        complete: animateLogos, // Loop the animation
      }
    );
  }

  // Start the animation
  animateLogos();
});

$(document).ready(function () {
  function setVideoSource() {
    var video = $("#background-video");
    var source = video.find("source");

    var currentSrc = source.attr("src");
    var newSrc =
      $(window).width() < 1000 ? "video/joinus-phone.mp4" : "video/joinus.mp4";

    if (currentSrc !== newSrc) {
      source.attr("src", newSrc);
      video[0].load(); // Reload video with new source
      video[0].play(); // Ensure autoplay resumes
    }
  }

  // Run on page load and on resize
  setVideoSource();
  $(window).on("resize", function () {
    setVideoSource();
  });
});

$(".navbar .lines").click(function (e) {
  e.preventDefault();
  if ($(this).parent().parent().parent().hasClass("active")) {
    $(this).parent().parent().parent().removeClass("active");
  } else {
    $(this).parent().parent().parent().addClass("active");
  }
});

$(document).ready(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 100) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });
});

$(document).ready(function () {
  // Function to detect the section in view and activate the corresponding navbar link
  function checkActiveSection() {
    var scrollPos = $(document).scrollTop();
    var sectionInView = false; // Flag to check if any section is in view

    // Loop through each navbar link
    $(".scroll").each(function () {
      var sectionID = $(this).attr("href"); // Get the href (section ID)

      // Skip links that don't have valid href (like #)
      if (sectionID === "#") return;

      // Get the section by using the 'href' attribute (this links to a specific section)
      var section = $(sectionID);

      // Check if the section is in view (considering the section's offset and height)
      if (
        section.offset().top - 100 <= scrollPos && // Adjust for offset
        section.offset().top + section.height() - 100 > scrollPos
      ) {
        sectionInView = true; // Set flag to true if section is in view
        $(".scroll").removeClass("active"); // Remove active from all links
        $(this).addClass("active"); // Add active to the current link
        $(".navbar").removeClass("active");
      }
    });

    // If no section is in view, remove active from all navbar links
    if (!sectionInView) {
      $(".scroll").removeClass("active");
    }
  }

  // Detect when the page is scrolled and check for the active section
  $(window).on("scroll", function () {
    checkActiveSection();
  });

  // Smooth scrolling when clicking on navbar links
  $(".scroll").click(function (e) {
    e.preventDefault();
    var targetSection = $(this).attr("href"); // Get the section linked by the anchor
    if (targetSection !== "#") {
      // Ensure we don't try to scroll to "#" if it's not a valid section
      $("html, body").animate(
        {
          scrollTop: $(targetSection).offset().top - 80, // Adjust scroll position for nav height
        },
        1000
      );
    }
  });

  // Initial check on page load
  checkActiveSection();
});

$(".scroll2").click(function (e) {
  e.preventDefault();
  $("nav").removeClass("nav_active");
  var nameof = "." + $(this).attr("name");
  $(".navbar").removeClass("active");
  $("html, body").animate(
    {
      scrollTop: $(nameof).offset().top - 150,
    },
    1000
  );
});

$(document).ready(function () {
  $(".language-switcher").each(function () {
    let $dropdown = $(this).find(".language-dropdown");
    let $chosen = $(this).find(".choosen");

    // Function to update the language icon based on the current language
    function updateLanguageIcon(lang) {
      // Get the selected language (can also be from localStorage or a default fallback)
      let $selectedItem = $dropdown.find(`li[data-lang="${lang}"]`);
      if ($selectedItem.length) {
        let flag = $selectedItem.find("img").attr("src");
        let text = $selectedItem.find("span").text().trim();

        // Update chosen language display
        $chosen.html(
          `<img src="${flag}" class="flag-icon"> ${text} <img src="img/arrow-down.svg" alt="arrow down" class="arrow-d">`
        );
      }
    }

    // Run on load to set the initial icon
    let initialLang = localStorage.getItem("language") || "en"; // Default to English
    updateLanguageIcon(initialLang);

    // Toggle dropdown
    $chosen.on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      $dropdown.toggle();
    });

    // Hide dropdown when clicking outside
    $(document).on("click", function (event) {
      if (
        !$chosen.is(event.target) &&
        !$dropdown.is(event.target) &&
        $dropdown.has(event.target).length === 0
      ) {
        $dropdown.hide();
      }
    });

    // Change Language - Using event delegation for list items
    $dropdown.on("click", "li", function () {
      let lang = $(this).data("lang");

      // Check if selected language is English
      if (lang === "en") {
        // Reset language settings (ensure Google Translate is disabled or reset)
        localStorage.setItem("language", "en"); // Save English as the selected language
        updateLanguageIcon("en"); // Update the language icon to English

        // Disable Google Translate translation for English (force it to reset)
        let googleTranslateCombo = document.querySelector(".goog-te-combo");
        if (googleTranslateCombo) {
          googleTranslateCombo.value = "en";
          googleTranslateCombo.dispatchEvent(new Event("change"));

          // If Google Translate is applied, reset the page to English by reloading
          if (
            typeof google &&
            google.translate &&
            google.translate.TranslateElement
          ) {
            let translateElement = google.translate.TranslateElement;
            if (translateElement) {
              google.translate.TranslateElement(
                { pageLanguage: "en", includedLanguages: "en" },
                "google_translate_element"
              );
            }
          }
        }

        // Optionally, reload the page to reset Google Translate if needed
        // location.reload(); // Uncomment if you want to reload the page and reset Google Translate

        return; // Prevent the rest of the translation flow
      }

      // For other languages, update the icon and trigger Google Translate
      updateLanguageIcon(lang);

      // Save the selected language in localStorage
      localStorage.setItem("language", lang);

      // Force Google Translate to change language (for non-English languages)
      let googleTranslateCombo = document.querySelector(".goog-te-combo");
      if (googleTranslateCombo) {
        googleTranslateCombo.value = lang;
        googleTranslateCombo.dispatchEvent(new Event("change"));
      }

      $dropdown.hide(); // Hide dropdown after selection
    });
  });
});
