// ------------- API Dynamic Data End ----------------------

document
  .getElementById("subscribe-button")
  .addEventListener("click", function () {
    // Get input values
    var email = document.getElementById("subscribe-email").value;

    // API endpoint
    var subscribe_apiUrl = `${window.apiUrl}/auth/subscribe`;

    // Make the POST request
    fetch(subscribe_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success
        console.log("Success:", data);
        if(data.satus_code === 201) {
          document.getElementById('subscribe-success').innerHTML = 'Thank you for subscribe.'
        } else {
          document.getElementById('subscribe-success').innerHTML = data?.email[0]; 
        }
        // You can add code here to handle the response from the server if needed
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  });
