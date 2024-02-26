// ------------- API Dynamic Data End ----------------------

function applydata(data) {
  let about_title = document.querySelector(".about-title");
  let about_desc = document.querySelector(".about-desc");
  let question = document.querySelectorAll(".faq-question");
  let answer = document.querySelectorAll(".faq-answer");

  let Student_Name = document.querySelectorAll(".Student-Name");
  let client_description = document.querySelectorAll(".client-description");
  let client_img = document.querySelectorAll(".client-image");

  // let blog_slider_title = document.querySelectorAll(".blog-title");
  // let blog_slider_desc = document.querySelectorAll(".blog-description");
  // let blog_slider = document.querySelectorAll(".blog-slider");

  about_title.innerHTML = data.response.about_title;
  about_desc.innerHTML = data.response.about_desc;

  data.faq.forEach((faq, i) => {
    question[i].innerHTML = faq.question;
    answer[i].innerHTML = faq.answer;
  });

  data.client.forEach((client, i) => {
    if (i < Student_Name.length) {
      Student_Name[i].innerHTML = client.name;
      client_description[i].innerHTML = client.description;
      client_img[
        i
      ].src = `${window.storageUrl}/${client.image}`;
    }
  });

  // data.blog.forEach((blog, i) => {
  //   blog_slider_title[i].innerHTML = blog.title;
  //   blog_slider_desc[i].innerHTML = blog.description.split("</p>")[0];
  //   blog_slider[i].src = `https://admin.thepanelau.com/storage/${blog.image}`;
  // });
  
}