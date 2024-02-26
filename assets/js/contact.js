// ------------- API Dynamic Data End ----------------------

function applydata(data) {
  let contactus_address = document.querySelector(".contactus-address");
  let contactus_email = document.querySelector(".contactus-email");
  let contactus_contact = document.querySelector(".contactus-contact");

  contactus_address.innerHTML = data.response.address;
  contactus_email.innerHTML = data.response.email;
  contactus_email.href = `mailto:${data.response.email}`;
  contactus_contact.innerHTML = data.response.contact;
  contactus_contact.href = `tel:${data.response.contact}`;
}

document.getElementById("submitButton").addEventListener("click", function () {
  this.disabled = true;
  // Get input values
  var name = document.getElementById("nameInput").value;
  var email = document.getElementById("emailInput").value;
  var mobile = document.getElementById("mobileInput").value;
  var message = document.getElementById("messageInput").value;

  // API endpoint
  var contact_apiUrl = `${window.apiUrl}/contact-us`;

  // Prepare data for POST request
  var data = {
    name: name,
    myEmail: email,
    mobile: mobile,
    message: message,
  };

  fetch(contact_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        document.getElementById('contact-success').innerHTML = 'Thank You for Contacting Us!'
        this.disabled = false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
