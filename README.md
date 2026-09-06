# will-you-marry-me-lalithya
A romantic marriage proposal for Lalithya, with animated hearts and a joyful Yes celebration.

A responsive, dependency-free website with a romantic backdrop, a playful escaping
**No** button, and a heartfelt **Yes** celebration. It supports keyboards, touch
screens, and reduced-motion preferences. No answers or personal data are collected.

## Preview locally

From the repository directory, run:

```sh
python3 -m http.server 8080
```

Open <http://localhost:8080>. No installation or build is required.

## Publish with GitHub Pages

1. In this repository, open **Settings → Pages → Build and deployment** and select
   **GitHub Actions** as the source. This one-time setting must be enabled by a
   repository administrator before deployment.
2. Merge the website changes into `main`. The **Deploy proposal to GitHub Pages**
   workflow runs automatically on pushes to `main`.
3. Wait for the workflow to succeed in **Actions**, then open:
   <https://gsubhashreddy.github.io/will-you-marry-me-lalithya/>.

To redeploy, select that workflow under **Actions → Run workflow** and choose
`main`. The workflow only deploys `main` and publishes the HTML, CSS, JavaScript,
and `our-moment.jpg` celebration image, not repository metadata or documentation.

The URL above is the intended published address; it will not serve this website
until Pages is enabled and the deployment succeeds. GitHub Pages is public, so
avoid adding private photos, contact information, or other sensitive details.

## Make it your own

- Edit `index.html` to personalize the question and promises.
- Edit `styles.css` to change the colors and visual design.
- Edit `script.js` to adjust the playful interactions and celebration.
