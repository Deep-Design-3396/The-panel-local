function applydata(data) {
  let footer_about_desc = document.querySelector(".footer-about-desc");

  let Header_logo = document.querySelector(".footer-logo");

  let address = document.querySelector(".address");
  let email = document.querySelector(".email");
  let contact = document.querySelector(".contact");

  Header_logo.src = `${window.storageUrl}/header_logo/${data.response.header_logo}`;

  footer_about_desc.innerHTML = data.response.about_desc.split("</p>")[0];

  address.innerHTML = data.response.address;
  email.innerHTML = data.response.email;
  email.href = `mailto:${data.response.email}`;
  contact.innerHTML = data.response.contact;
  contact.href = `tel:${data.response.contact}`;
}
