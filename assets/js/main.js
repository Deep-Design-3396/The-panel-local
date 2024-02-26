// ------------- Header Footer Load ----------------------
$(function () {
  $("#header").load("header.html");
  $("#mainfooter").load("footer.html");
});

// ------------- Header Back to Top Sticky ----------------------

jQuery(window).scroll(function () {
  jQuery(".navbar").toggleClass("sticky", jQuery(window).scrollTop() > 50);
  // jQuery("#myBtn").toggleClass("d-block", jQuery(window).scrollTop() > 50);
});

function topFunction() {
  window.scrollTo(0, 0);
}

// ------------- Password Eye ----------------------

$(document).ready(function () {
  $("#togglePassword").on("click", function () {
    var passwordField = $("#password");

    // Check the current type of the input field
    var fieldType = passwordField.attr("type");

    // Toggle between 'password' and 'text'
    if (fieldType === "password") {
      passwordField.attr("type", "text");
    } else {
      passwordField.attr("type", "password");
    }
  });
});

// ------------- Client Counter ----------------------

let counter_value = document.querySelectorAll(".counter-value");
let clearPTE_counter = 0;

let clearPTE = setInterval(() => {
  if (counter_value[0]) {
    clearPTE_counter++;
    counter_value[0].innerText = clearPTE_counter + "+";
    if (clearPTE_counter == 2000) {
      clearInterval(clearPTE);
    }
  }
}, 1);

let clearNATTI_counter = 0;
let clearNATTI = setInterval(() => {
  if (counter_value[1]) {
    clearNATTI_counter++;
    counter_value[1].innerText = clearNATTI_counter + "+";
    if (clearNATTI_counter == 1500) {
      clearInterval(clearNATTI);
    }
  }
}, 1);

let students_counter = 0;
let students = setInterval(() => {
  if (counter_value[2]) {
    students_counter++;
    counter_value[2].innerText = students_counter + "+";
    if (students_counter == 24) {
      clearInterval(students);
    }
  }
}, 100);

let Experts_counter = 0;
let Experts = setInterval(() => {
  if (counter_value[3]) {
    Experts_counter++;
    counter_value[3].innerText = Experts_counter + "+";
    if (Experts_counter == 5) {
      clearInterval(Experts);
    }
  }
}, 500);

// ------------- owl carousel ----------------------


$(document).ready(function () {
  $(".owl-carousel-1").owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19l-7-7l7-7"/></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5l7 7l-7 7"/></svg>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 4,
      },
    },
  });
});

$(document).ready(function () {
  $(".owl-carousel-2").owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19l-7-7l7-7"/></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5l7 7l-7 7"/></svg>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 2,
      },
    },
  });
});

$(document).ready(function () {
  $(".owl-carousel-3").owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19l-7-7l7-7"/></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5l7 7l-7 7"/></svg>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});

// ------------- API Dynamic Data Start ----------------------

const apiUrl = `${window.apiUrl}/content`;
const time_table_Url = `${window.apiUrl}/class-time-table`;

async function loadData() {
  await fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let Header_logo = document.querySelector(".Header-logo");
      let navbar = document.querySelector(".navbar");
      if (Header_logo !== "") {
        navbar.classList.remove("loading-placeholder");
      }

      let footer_about_desc = document.querySelector(".footer-about-desc");

      let Footer_logo = document.querySelector(".footer-logo");

      let address = document.querySelector(".address");
      let email = document.querySelector(".email");
      let contact = document.querySelector(".contact");

      Header_logo.src = `${window.storageUrl}/header_logo/${data.response.header_logo}`;

      Footer_logo.src = `${window.storageUrl}/header_logo/${data.response.header_logo}`;

      footer_about_desc.innerHTML = data.response.about_desc.split("</p>")[0];

      address.innerHTML = data.response.address;
      email.innerHTML = data.response.email;
      email.href = `mailto:${data.response.email}`;
      contact.innerHTML = data.response.contact;
      contact.href = `tel:${data.response.contact}`;
      window.latestDevice = data;
      applydata(data);
    });

  fetch(time_table_Url)
    .then((response) => response.json())
    .then((data) => {
      timetabledata(data);
    });
}

loadData();

function timetabledata(data) {
  const tableBody = document.getElementById('live-class-table-body');
  const tableBody_modal = document.getElementById('live-class-table-body-modal');

  data?.timeTables.forEach((timeTable) => {
    // Create a new row for the main table
    const row_main = document.createElement('tr');
    row_main.innerHTML = `
          <td><img src="./assets/img/zoom.svg" width="30px" alt="zoom"></td>
          <td class="liveClass-title"><h4>${timeTable.title}</h4></td>
          <td class="liveClass-desc"><h4>${timeTable.description}</h4></td>
          <td class="liveClass-day">${getDayName(timeTable.day)}</h4></td>  
          <td><h4>
              <span class="liveClass-time">${timeTable.time}</span>
              <span class="liveClass-formate-day">(${formatTime(timeTable.time)})</span>
              <span class="liveClass-timezone">(${timeTable.time_zone})</span>
              </h4>
          </td>
      `;
    tableBody.appendChild(row_main);

    // Create a new row for the modal table
    const row_modal = document.createElement('tr');
    row_modal.innerHTML = `
          <td><img src="./assets/img/zoom.svg" width="30px" alt="zoom"></td>
          <td class="liveClass-title">${timeTable.title}</td>
          <td class="liveClass-desc">${timeTable.description}</td>
          <td class="liveClass-day">${getDayName(timeTable.day)}</td>
          <td>
              <span class="liveClass-time">${timeTable.time}</span>
              <span class="liveClass-formate-day">(${formatTime(timeTable.time)})</span>
              <span class="liveClass-timezone">(${timeTable.time_zone})</span>
          </td>
      `;
    tableBody_modal.appendChild(row_modal);
  });
}


function getDayName(day) {
  const days = {
    mo: "Monday",
    tu: "Tuesday",
    we: "Wednesday",
    th: "Thursday",
    fr: "Friday",
    sa: "Saturday",
    su: "Sunday"
  };
  return days[day] || "";
}

function formatTime(time) {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}