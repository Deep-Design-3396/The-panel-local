// function applydata(data) {
//   let gallery_Image = document.querySelectorAll(".gallery-Image");

//   let blog_slider_title = document.querySelectorAll(".blog-title");
//   let blog_slider_desc = document.querySelectorAll(".blog-description");
//   let blog_slider = document.querySelectorAll(".blog-slider");

//   console.log("gallery_Image >>", gallery_Image);
//   data.prouduct_pte_academic.forEach((gallery, i) => {
//     if (i < gallery_Image.length) {
//       gallery_Image[
//         i
//       ].src = `${window.storageUrl}/${gallery.filename}`;
//     }
//   });

//   data.blog.forEach((blog, i) => {
//     blog_slider_title[i].innerHTML = blog.title;
//     blog_slider_desc[i].innerHTML = blog.description.split("</p>")[0];
//     blog_slider[i].src = `${window.storageUrl}/${blog.image}`;
//   });
// }

// loadData();
