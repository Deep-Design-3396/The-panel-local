// Function to fetch data from the API
async function fetchCurrentBlogData() {
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
    console.error("Error fetching data:", error);
  }
}

// Function to update the UI with data
function updateBlogDetailUI(blog) {
  const container = document.querySelector(".blog-detail-content");
  const card = document.createElement("div");
  card.className = "card border-0 bg-transparent";

  // Create link
  const link = document.createElement("a");
  link.innerHTML = `<img src="${window.storageUrl}/${blog?.image}" class="card-img-top blog-img" alt="blog"></a>`;
  link.setAttribute('aria-label', 'Link to blog details');

  // Create card body
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Create date and author section
  const dateAuthorSection = document.createElement("span");
  dateAuthorSection.className = "d-flex justify-content-between";

  const date = document.createElement("h6");
  date.className = "text-muted text-center";
  const originalDate = new Date(blog && blog.updated_at);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const dateFormatter = new Intl.DateTimeFormat("en-US", options);

  const formattedDate = dateFormatter.format(originalDate);
  date.textContent = formattedDate;

  const author = document.createElement("h6");
  author.className = "text-muted ms-3";
  author.textContent = `By: Admin`;

  dateAuthorSection.appendChild(date);
  dateAuthorSection.appendChild(author);

  // Create title
  const title = document.createElement("h3");
  title.className = "card-title text-center mt-4";
  title.innerHTML = `<a>${blog && blog.title}</a>`;

  // Create description
  const description = document.createElement("p");
  description.className = "card-text blog-description";
  description.innerHTML = blog && blog.description;

  const hrLink = document.createElement("hr");

  // Append elements to the card and container
  card.appendChild(link);
  card.appendChild(cardBody);
  cardBody.appendChild(dateAuthorSection);
  cardBody.appendChild(title);
  cardBody.appendChild(description);
  container.appendChild(card);
  cardBody.appendChild(hrLink);
}

// Function to update the UI with data
function updateRecentBlogDetailUI(data) {
  const container = document.querySelector(".recent-content");
  data.forEach((blog) => {
    // Create anchor element with href './blog-details.html'
    const anchor = document.createElement("a");
    anchor.href = "./blog-details.html";
    anchor.setAttribute('aria-label', 'Link to blog details');

    // Create content div with class 'content'
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    // Create left image div with class 'blogleftimg'
    const leftImgDiv = document.createElement("div");
    leftImgDiv.className = "blogleftimg";

    // Create image element
    const image = document.createElement("img");
    image.src = `${window.storageUrl}/${blog.image}`;
    image.alt = "blog";
    image.className = "img-fluid";

    // Append image to left image div
    leftImgDiv.appendChild(image);

    // Create right content div with class 'blogrightcontent'
    const rightContentDiv = document.createElement("div");
    rightContentDiv.className = "blogrightcontent";

    // Create title
    const title = document.createElement("p");
    title.innerHTML = `<a href="./blog-details.html?id=${blog.id}" class="blog-title">${blog.title}</a>`;

    // Create paragraph element for date
    const dateParagraph = document.createElement("p");
    dateParagraph.className = "date d-flex";

    // Create icon element
    const icon = document.createElement("i");
    icon.className = "calendar-icon me-2";
    icon.setAttribute("aria-hidden", "true");

    // Append icon to date paragraph
    dateParagraph.appendChild(icon);

    // Append date text to date paragraph
    const originalDate = new Date(blog.updated_at);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const dateFormatter = new Intl.DateTimeFormat("en-US", options);

    const formattedDate = dateFormatter.format(originalDate);
    dateParagraph.innerHTML += formattedDate;

    // Append paragraphs to right content div
    rightContentDiv.appendChild(title);
    rightContentDiv.appendChild(dateParagraph);
    contentDiv.appendChild(leftImgDiv);
    contentDiv.appendChild(rightContentDiv);
    anchor.appendChild(contentDiv);
    container.appendChild(anchor);
  });
}

// Entry point: Fetch data and update the UI
async function main() {
  const data = await fetchCurrentBlogData();
  fetchCurrentBlogData(data.blog);
  updateBlogDetailUI(data.blog);
  updateRecentBlogDetailUI(data.recent_blogs);
}

main();
