let interests = [];
let areas = [];

// $('.datepicker').datepicker();

$('#datepicker').datepicker({
  weekStart: 1,
  daysOfWeekHighlighted: "6,0",
  autoclose: true,
  todayHighlight: true,
});
$('#datepicker').datepicker("setDate", new Date());


function getDetails() {
  var details;
  try {
    details = JSON.parse(localStorage.getItem("tourDetails"));
  }
  catch(err) {
    details = {};
  }
  // Print value for header
  var value = "Japan";
  for (key in details) {
    if (details.hasOwnProperty(key)) {
      value = details[key];
    }
  }
  $(".registerType").html(value);

  // Populate key word interest or area
  for (key in details) {
    if (details.hasOwnProperty(key)) {
      if (key == "area") {
        // console.log("area", details[key]);
        areas.push(details[key]);
        $(".areaContainer").html(
          "<p class='btn btn-primary register-btn mb-2 mr-2'>" +
            details[key] +
            " <img class='remove' src='img/register/close-button.png' width='15px'> </p>"
        );
      } else if (key == "interest") {
        // console.log("interest", details[key]);
        interests.push(details[key]);
        $(".interestContainer").html(
          "<p class='btn btn-primary register-btn mb-2 mr-2'>" +
            details[key] +
            " <img class='remove' src='img/register/close-button.png' width='15px'> </p>"
        );
      }
    }
  }
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

$(".emailInput").keyup(function () {
  canSubmit();
});

function canSubmit() {
  var email = $(".emailInput").val();
  // console.log("email", validateEmail(email));
  // console.log("email", $(".happyToPay").prop("checked"));
  if (!$(".register-submit-btn").hasClass("register-disabled")) {
    $(".register-submit-btn").addClass("register-disabled");
  }
  if (validateEmail(email) && $(".happyToPay").prop("checked")) {
    $(".register-submit-btn").removeClass("register-disabled");
    $(".registerInstruction").hide();
  }
}

$(document).on("click", ".addInterest", function () {
  var pickedInterest = $(".interestInput").val();
  interests.push(pickedInterest);
  $(".interestInput").val("");
  $(".interestContainer").append(
    "<p class='btn btn-primary register-btn mb-2 mr-2'>" +
      pickedInterest +
      " <img class='remove' src='img/register/close-button.png' width='15px'> </p>"
  );
});

$(document).on("click", ".addArea", function () {
  var pickedArea = $(".areaInput").val();
  areas.push(pickedArea);
  $(".areaInput").val("");
  $(".areaContainer").append(
    "<p class='btn btn-primary register-btn mb-2 mr-2'>" +
      pickedArea +
      " <img class='remove' src='img/register/close-button.png' width='15px'> </p>"
  );
});

// Remove keys
$(document).on("click", ".remove", function () {
  const deleteItem = $(this).parent().text().trim();

  areas = areas.filter((area) => area !== deleteItem);
  interests = interests.filter((interest) => interest !== deleteItem);

  // console.log(interests, areas);
  $(this).parent().remove();
});
// console.log(interests, areas);
$(document).ready(function () {
  $(".registerInstruction").hide();
  getDetails();
});

$(document).on("click", ".register-submit-btn", function () {
  if (!$(".register-submit-btn").hasClass("register-disabled")) {
    var email = $(".emailInput").val();
    var date = $('#datepicker').datepicker({ dateFormat: 'dd,MM,yyyy' }).val();
    var timezone = $('#timezone').val();
    console.log("Email: ", email);
    console.log("Interests: ", interests);
    console.log("Areas: ", areas);
    console.log("Date:", date)
    console.log("Timezone:", timezone)

    var database = firebase.database();
    firebase.database().ref('users/').push({
      timezone: timezone,
      date: date,
      email: email,
      interests: interests,
      areas: areas
    }, function(error) {
      if (error) {
        $('.register-failure').show();
        $('.register-form').hide();
        console.log('Error: ', error)
      } else {
        $('.register-success').show();
        $('.register-form').hide();
      }
    });

  } else {
    $(".registerInstruction").show();
  }
});

// culture, temple, manga, food, samurai, nightlife
// Sapporo, Tokyo, Kyoto, Osaka
