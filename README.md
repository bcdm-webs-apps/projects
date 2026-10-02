# BCDM Webs and Apps — Lite

A class project gallery built with HTML, CSS and plain JavaScript. Open `index.html` directly in your browser. No installation, Python, local server or build command is needed.

## Start here

1. Keep the files together in one folder.
2. Double-click `index.html` to see the website.
3. Open the folder in a code editor.
4. Edit `data.js`, save it, and refresh the browser to see your changes.

The lite version does **not** connect to Google Sheets. `data.js` is its source of content. Editing the original spreadsheet will not change this version.

## What each file does

| File | Responsibility | Example change |
| --- | --- | --- |
| `index.html` | Page structure, headings, navigation and metadata | Change the introduction |
| `styles.css` | Typography, colors, spacing and responsive layout | Change the accent color |
| `data.js` | Project and book content | Add a title, image or link |
| `app.js` | Creates project cards and handles book selection | Change how a card is assembled |
| `README.md` | These instructions, displayed by GitHub | Add notes about your own decisions |

The README is not part of the website navigation.

## What happens when you open the page?

The browser reads `index.html`, which links to the stylesheet and two scripts:

```html
<link rel="stylesheet" href="styles.css">
<script src="data.js" defer></script>
<script src="app.js" defer></script>
```

`defer` tells the browser to run the scripts after the HTML has been parsed. The scripts run in the order shown: `data.js` defines the content, then `app.js` uses it to create elements inside the page.

```text
index.html supplies the containers
       ↓
data.js supplies the content
       ↓
app.js creates the cards and book buttons
       ↓
styles.css controls their appearance
```

The data is loaded as an ordinary JavaScript file, not requested with `fetch()`. That is why the content works when you double-click the HTML. Google Fonts and any externally hosted images still need internet access. When fonts cannot load, the browser uses the fallback fonts in the stylesheet.

## Edit a project

`data.js` contains one object called `data`, with three lists:

- `individual`: individual projects.
- `teams`: team projects.
- `books`: bibliography entries.

An object uses `{ }` to group related information. An array uses `[ ]` to hold a list of objects. Each project object becomes one card, in the same order as the list.

Find an entry in `individual` or `teams` and replace its values:

```js
{
  "name": "Alex Rivera",
  "title": "A Guide to the City",
  "description": "A collection of quiet places to explore on foot.",
  "url": "https://your-username.github.io/your-project/",
  "image": "images/city-guide.jpg",
  "image_alt": "Map of the city with three walking routes highlighted"
}
```

| Field | Meaning |
| --- | --- |
| `name` | Student name or team label, such as `Team A` |
| `title` | Project title; an empty value displays “Project in progress” |
| `description` | Brief explanation of the project |
| `url` | Full `https://` project address; an empty or invalid value displays “Coming soon” |
| `image` | Local image path or a direct web image URL |
| `image_alt` | A useful description for people who cannot see the image |

To add a project, copy a complete object into the relevant list and put a comma between it and the next object. To remove one, delete that object and keep the commas valid. To reorder projects, move their objects within the list.

### Avoid common editing mistakes

- Keep keys and text values inside quotation marks.
- Use straight quotes (`"`), not word-processor “smart quotes”.
- Separate objects with commas.
- Keep the opening and closing braces and brackets paired.
- To include quotation marks inside a value, escape them: `"A project about \"home\""`.
- Keep the `const data =` line and the final `};`.

A syntax error in `data.js` can prevent all the cards from appearing. Save often and refresh after small changes.

## Add featured images

Create an `images` folder alongside `index.html` and add your files:

```text
lite/
  index.html
  styles.css
  app.js
  data.js
  README.md
  images/
    city-guide.jpg
    team-a.png
```

Then put `images/city-guide.jpg` in the project's `image` field. That path means “look in the images folder next to this page”. It works both locally and on GitHub Pages.

Use simple filenames with matching capitalization. `city-guide.jpg` and `City-Guide.jpg` may behave differently on GitHub Pages. Avoid computer-specific paths such as `/Users/your-name/Desktop/photo.jpg`, and do not start a project-relative path with `/`.

Images are shown in a **16:10 landscape frame**. CSS `object-fit: cover` fills the frame and may crop the edges. An image around 1200 × 750 pixels is a useful starting size; compress it before uploading. Missing or broken images leave a neutral area.

A web image address must point directly to an image, not to a sharing page. Keeping images in the project folder is the easiest approach for this example.

## Edit the bookshelf

Each object in `books` has these fields:

```js
{
  "title": "The Vignelli Canon",
  "author": "Massimo Vignelli",
  "year": "2010",
  "description": "An introduction to clear, disciplined design.",
  "url": "https://www.lars-mueller-publishers.com/vignelli-canon"
}
```

`renderBooks()` creates a button for every book. Clicking a button updates the description below the shelf. The first book is selected when the page opens.

CSS places the buttons in a row and aligns their bottom edges. Vertical text creates the spines. A subtle highlight indicates the selected book without moving it off the shelf. The `palette` array at the top of `app.js` supplies the book colors and repeats if there are more books than colors.

## Understand the main JavaScript functions

- `element()` creates an HTML element and adds text using `textContent`. Content stays text rather than being interpreted as HTML.
- `safeURL()` accepts full HTTP or HTTPS project/book links.
- `externalLink()` creates a link that opens in a new tab.
- `projectImage()` creates the image area and handles missing or broken images.
- `renderProjects()` loops through a list and builds each card.
- `renderBooks()` builds the shelf and attaches a click event to each button.

The final three calls draw the collections:

```js
renderProjects(data.individual, "individual-grid");
renderProjects(data.teams, "team-grid");
renderBooks(data.books);
```

The IDs in these calls match containers in `index.html`. Changing an ID in only one file breaks that connection.

## Change the design

At the top of `styles.css`, `:root` contains CSS custom properties such as `--background`, `--ink` and `--accent`. Changing one of these values updates the places that use it.

Both project sections use the same `.project-grid` and `.project-card` rules. The grid has three columns on large screens, two at widths of 1000 pixels or less, and one at 640 pixels or less. These changes are controlled by `@media` rules.

Headings use Google-hosted **Barlow Condensed**. Body text uses **Georgia**, with Google-hosted **Source Serif 4** and the browser's generic serif as fallbacks. The Google Fonts link is in the HTML head; the `font-family` declarations are in CSS.

Keep visible keyboard focus styles. Try navigating with Tab and selecting a book with Enter or Space. The stylesheet also respects the reduced-motion preference.

## Publish on GitHub Pages

**Yes: this version works on GitHub Pages.** It consists entirely of static files and uses relative paths.

1. Create a GitHub repository.
2. Upload the **contents of `lite`** to its root: `index.html`, the CSS and JavaScript files, the README, and any images.
3. Open repository **Settings → Pages**.
4. Under Source, choose **Deploy from a branch**.
5. Choose **main** and **/(root)**, then save.
6. When deployment finishes, open the URL shown by GitHub and check the page.

For an ordinary project repository, the address is typically `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

If you upload the full original website and keep this version inside its `lite` folder, publish the repository root and visit `/lite/` at the end of the site URL. The branch-publishing folder selector supports the root or `/docs`, not an arbitrary `/lite` folder.

After editing locally, upload or commit the changed files to GitHub. Saving a file on your computer does not update the published site automatically. GitHub republishes after changes reach the selected branch.

[GitHub's publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Check your work

- Open the page locally and confirm the projects appear.
- Resize the browser and inspect both project grids.
- Open a project link and select each book.
- Check that featured images load and have useful alternative text.
- Repeat these checks at the published GitHub Pages URL.

If the page has headings but no cards, check the browser's developer console for a JavaScript error, especially a missing comma or quotation mark in `data.js`. If an image is missing online, check its filename, capitalization and whether it was uploaded. If a change does not appear, confirm deployment completed and try a hard refresh.

## Try it in class

1. Change one project title and explain which file you edited.
2. Add a featured image and describe how its relative path works.
3. Duplicate a card by adding a data object, without changing the HTML.
4. Change the accent color and resize the page.
5. Explain how a book click updates the description.

This example was developed with AI assistance and instructor direction. When adapting it, keep track of your own decisions, changes and tests, and be ready to explain the code you use.
