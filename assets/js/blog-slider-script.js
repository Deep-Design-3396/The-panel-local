async function fetchBlogSliderData() {
  try {
    const blogDetailUrl = `${window.apiUrl}/blog-detail`;
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const urlParams = new URLSearchParams(url.search);
    const id = urlParams.get("id");

    const response = await fetch(blogDetailUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

// async function fetchGallerySliderData() {
//   try {
//     const galleryUrl = `${window.apiUrl}/content`;
//     const response = await fetch(galleryUrl);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return null;
//   }
// }


function updateBlogSliderUI(data) {
  const container = document.querySelector(".Blog-Owl-Slider");
  const carouselOuter = document.createElement("div");
  carouselOuter.className = "owl-stage-outer";
  const carousel = document.createElement("div");
  carousel.className = "owl-stage";

  data.forEach((blog) => {
    const main_card = document.createElement("div");
    main_card.className = "owl-item";

    const card = document.createElement("div");
    card.className = "item";

    const slide = document.createElement("div");
    slide.className = "slide";

    const post_slide = document.createElement("div");
    post_slide.className = "post-slide";

    const post_img = document.createElement("div");
    post_img.className = "post-img";

    // Create link
    const link = document.createElement("a");
    link.href = `./blog-details.html?id=${blog.id}`
    link.setAttribute("aria-label", "View Blog");
    link.innerHTML = `<img src="${window.storageUrl}/${blog.image}" class="card-img-top blog-img" alt="${blog.title}"></a>`;

    // Create card body
    const post_content = document.createElement("div");
    post_content.className = "post-content";

    // Create date and author section
    const post_date = document.createElement("div");
    post_date.className = "post-date";

    const post_title = document.createElement("h5");
    post_title.className = "post-title";

    const blog_title = document.createElement("a");
    blog_title.href = `./blog-details.html?id=${blog.id}`
    blog_title.innerHTML = `${blog.title}`;

    // Create title
    const blog_description = document.createElement("div");
    blog_description.className = "blog-description";
    blog_description.innerHTML = `${blog.description.split("</p>")[0]}`;

    // Append elements to the card and container
    carousel.appendChild(main_card);
    main_card.appendChild(card);
    card.appendChild(slide);
    slide.appendChild(post_slide);
    post_slide.appendChild(post_img);
    post_img.appendChild(link);
    post_slide.appendChild(post_content);
    post_content.appendChild(post_date);
    post_content.appendChild(post_title);
    post_title.appendChild(blog_title);
    post_content.appendChild(blog_description);
  });

  // Append carousel elements to the container
  container.appendChild(carouselOuter);
  carouselOuter.appendChild(carousel);
}

function updateGallerySliderUI(data) {
  const galleryContainer = document.querySelector(".Wall-of-Fame");
  const carouselOuter = document.createElement("div");
  carouselOuter.className = "owl-stage-outer";
  const carousel = document.createElement("div");
  carousel.className = "owl-stage uk-child-width-1-3@m ms-0";
  carousel.setAttribute("uk-grid", "");
  carousel.setAttribute("uk-lightbox", "animation: slide");

  data.forEach((item) => {
    const uk_main = document.createElement("div");
    uk_main.className = "ps-0";
    const main_card = document.createElement("a");
    main_card.className = "owl-item uk-inline ps-0";
    main_card.textContent = "";
    main_card.setAttribute("aria-label", "View Blog");
    main_card.href = `${window.storageUrl}/${item.filename}`;
    const galleryImage = document.createElement("img");
    galleryImage.src = `${window.storageUrl}/${item.filename}`;
    galleryImage.alt = `blog-img`;

    carousel?.appendChild(uk_main);
    uk_main?.appendChild(main_card);
    main_card?.appendChild(galleryImage);
    galleryContainer?.appendChild(carouselOuter);
    carouselOuter?.appendChild(carousel);
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Use UIkit to update the grid and lightbox attributes
    UIkit.grid(carousel, {
      /* Additional options if needed */
    });
    UIkit.lightbox(carousel, { animation: "slide" });
  });
  
}


// Entry point: Fetch data and update the UI, then initialize Owl Carousel
async function main() {
  const blogSliderData = await fetchBlogSliderData();
  const gallerySliderData = await window.latestDevice;

  if (blogSliderData && blogSliderData.recent_blogs.length) {
    updateBlogSliderUI(blogSliderData?.recent_blogs)
    initCarouselBlog();
  }

  if (gallerySliderData && gallerySliderData.gallery.length) {
    updateGallerySliderUI(gallerySliderData?.gallery)
    initCarouselwell();
  }

}

function initCarouselBlog() {
  $(".Blog-Owl-Slider").owlCarousel({
    loop: true,
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
}

function initCarouselwell() {
  $(".Wall-of-Fame").owlCarousel({
    loop: true,
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
        items: 4,
      },
    },
  });
}

main();


