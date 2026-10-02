// Small helpers create HTML elements and insert content as plain text.
const palette = ["#a64b35", "#8a6531", "#875365"];

function safeURL(value) {
  if (!value) return null;
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : null; }
  catch { return null; }
}
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function externalLink(label, url) {
  const a = element("a", "", label); a.href = url;
  a.target = "_blank"; a.rel = "noopener noreferrer";
  return a;
}
// Images can use a public web URL or a relative path such as images/project.jpg.
function projectImage(project, title) {
  const frame = element("div", "project-image");
  const value = (project.image || "").trim();
  frame.setAttribute("aria-hidden", "true");
  if (!value) return frame;
  try {
    const url = new URL(value, document.baseURI);
    const relative = !/^[a-z][a-z0-9+.-]*:|^\/\//i.test(value);
    if (!["https:", "http:"].includes(url.protocol) && !(relative && url.protocol === "file:")) return frame;
    const img = element("img");
    img.alt = project.image_alt || `${title} — featured image`;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("load", () => frame.removeAttribute("aria-hidden"));
    img.addEventListener("error", () => { img.remove(); frame.setAttribute("aria-hidden", "true"); });
    img.src = url.href;
    frame.append(img);
  } catch { /* Keep the neutral image area if the URL is invalid. */ }
  return frame;
}
function renderProjects(rows, gridId) {
  const grid = document.getElementById(gridId);
  grid.replaceChildren();
  rows.forEach(project => {
    const card = element("article", "project-card");
    const title = project.title || "Project in progress";
    const name = project.name || "";
    const top = element("div", "card-top");
    top.append(element("span", "", name));
    const bottom = element("div", "card-bottom");
    const url = safeURL(project.url);
    if (url) {
      const link = externalLink("View project ↗", url);
      link.setAttribute("aria-label", `View ${title} (opens in a new tab)`); bottom.append(link);
    } else bottom.append(element("span", "pending", "Coming soon"));
    card.append(projectImage(project, title), top, element("h3", "", title), element("p", "", project.description || ""), bottom);
    grid.append(card);
  });
}
function renderBooks(rows) {
  const shelf = document.getElementById("bookshelf");
  const detail = document.getElementById("book-detail");
  shelf.replaceChildren();
  detail.replaceChildren();
  rows.forEach((book, index) => {
    const button = element("button", "book"); button.type = "button";
    button.style.setProperty("--book-color", palette[index % palette.length]);
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-controls", "book-detail");
    button.setAttribute("aria-label", `${book.title}${book.author ? ` by ${book.author}` : ""}`);
    button.append(element("span", "book-title", book.title), element("span", "book-imprint", book.year || ""));
    button.addEventListener("click", () => {
      shelf.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === button)));
      const info = element("div");
      info.append(element("h3", "", book.title), element("p", "", [book.author, book.year].filter(Boolean).join(" — ")), element("p", "", book.description));
      const url = safeURL(book.url);
      if (url) info.append(externalLink("About this book ↗", url));
      detail.replaceChildren(element("span", "eyebrow", "Selected reading"), info);
    });
    shelf.append(button);
  });
  shelf.querySelector("button")?.click();
}
// Read data.js and draw the three sections. No server or network requests.
renderProjects(data.individual, "individual-grid");
renderProjects(data.teams, "team-grid");
renderBooks(data.books);
