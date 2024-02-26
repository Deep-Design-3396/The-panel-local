function applydata(data) {
  let title = document.querySelector("#Header-title");

  let ptecontent = document.querySelector("#pte-academic");
  let naaticontent = document.querySelector("#naati-ccl");

  let pte_tool_content_1 = document.querySelector(".pte-tool-content-1");
  let pte_tool_content_2 = document.querySelector(".pte-tool-content-2");
  let pte_tool_content_3 = document.querySelector(".pte-tool-content-3");
  let pte_tool_content_4 = document.querySelector(".pte-tool-content-4");

  let updates_speaking = document.querySelector(".updates-speaking");
  let updates_listening = document.querySelector(".updates-listening");
  let updates_writing = document.querySelector(".updates-writing");
  let updates_reading = document.querySelector(".updates-reading");

  let gallery_Image = document.querySelectorAll(".gallery-Image");

  let Student_Name = document.querySelectorAll(".Student-Name");
  let client_description = document.querySelectorAll(".client-description");
  let client_img = document.querySelectorAll(".client-image");

  title.innerHTML = data && data.response && data.response?.home_page_header_title;
  if(title !== "") {
    title.classList.remove('loading-placeholder')
  }

  ptecontent.innerHTML = data.response.pte_academic_main_content;

  if(ptecontent !== "") {
    ptecontent.classList.remove('loading-placeholder')
  }
  naaticontent.innerHTML = data.response.naati_main_ccl;

  if(naaticontent !== "") {
    naaticontent.classList.remove('loading-placeholder')
  }

  pte_tool_content_1.innerHTML = data.response.pte_tool_content_a;
  pte_tool_content_2.innerHTML = data.response.pte_tool_content_b;
  pte_tool_content_3.innerHTML = data.response.pte_tool_content_c;
  pte_tool_content_4.innerHTML = data.response.pte_tool_content_d;
    
  updates_speaking.innerHTML = data.response.updates_speaking;
  updates_listening.innerHTML = data.response.updates_listening;
  updates_writing.innerHTML = data.response.updates_writing;
  updates_reading.innerHTML = data.response.updates_reading;

  data.gallery.forEach((gallery, i) => {
    if (i < gallery_Image.length) {
      gallery_Image[
        i
      ].src = `${window.storageUrl}/${gallery.filename}`;
    }
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
}