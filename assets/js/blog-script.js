// Function to fetch data from the API
async function fetchData() {
    try {
        const apiUrl = `${window.apiUrl}/content`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to fetch data from the API
async function fetchCurrentBlogData() {
    try {
        const blogDetailUrl = `${window.apiUrl}/blog-detail`;
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        const urlParams = new URLSearchParams(url.search);
        const id = urlParams.get('id'); 

        const response = await fetch(blogDetailUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'id': id }),
        });
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to update the UI with data
function updateUI(data) {
    const container = document.querySelector('.blog-content');

    data.forEach(blog => {
        // Create card
        const card = document.createElement('div');
        card.className = 'card border-0 bg-transparent';

        // Create link
        const link = document.createElement('a');
        link.href = `./blog-details.html?id=${blog.id}`;
        link.innerHTML = `<img src="${window.storageUrl}/${blog.image}" class="card-img-top blog-img" alt="${blog.title}"></a>`;
        link.setAttribute('aria-label', 'Link to blog details');

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Create title
        const title = document.createElement('h5');
        title.className = 'card-title text-center';
        title.innerHTML = `<a href="./blog-details.html?id=${blog.id}" class="blog-title">${blog.title}</a>`;

        // Create description
        const description = document.createElement('p');
        description.className = 'card-text blog-description';
        description.innerHTML = blog.description;

        // Create card body
        const readmore_btn = document.createElement('div');
        readmore_btn.className = 'readmore-btn d-flex justify-content-center';

        // Create "Read More" link
        const readMoreLink = document.createElement('a');
        readMoreLink.href = `./blog-details.html?id=${blog.id}`;
        readMoreLink.className = 'btn custom-button';
        readMoreLink.textContent = 'Read More';

        const hrLink = document.createElement('hr');
        // Append elements to the card and container
        card.appendChild(link);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(readmore_btn);
        readmore_btn.appendChild(readMoreLink);
        cardBody.appendChild(hrLink);
        container.appendChild(card);
    });
}

// Function to update the UI with data
function updateRecentBlogDetailUI(data) {
    const container = document.querySelector('.recent-content');
    data.forEach(blog => {
        // Create anchor element with href './blog-details.html'
        const anchor = document.createElement('a');
        anchor.href = './blog-details.html';
        anchor.setAttribute('aria-label', 'Link to blog details');

        // Create content div with class 'content'
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';

        // Create left image div with class 'blogleftimg'
        const leftImgDiv = document.createElement('div');
        leftImgDiv.className = 'blogleftimg';

        // Create image element
        const image = document.createElement('img');
        image.src = `${window.storageUrl}/${blog.image}`;
        image.alt = 'blog';
        image.className = 'img-fluid';

        // Append image to left image div
        leftImgDiv.appendChild(image);

        // Create right content div with class 'blogrightcontent'
        const rightContentDiv = document.createElement('div');
        rightContentDiv.className = 'blogrightcontent';

          // Create title
          const title = document.createElement('p');
          title.innerHTML = `<a href="./blog-details.html?id=${blog.id}" class="blog-title">${blog.title}</a>`;
  
        // Create paragraph element for date
        const dateParagraph = document.createElement('p');
        dateParagraph.className = 'date';

        // Create icon element
        const icon = document.createElement('i');
        icon.className = 'calendar.icon me-2';
        icon.setAttribute('aria-hidden', 'true');

        // Append icon to date paragraph
        dateParagraph.appendChild(icon);

        // Append date text to date paragraph
        const originalDate = new Date(blog.updated_at);
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    
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
    const data = await fetchData();
    updateUI(data.blog);
    const data1 = await fetchCurrentBlogData();
    updateRecentBlogDetailUI(data1.recent_blogs);
}

main();