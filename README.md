# fanm

A simple glassmorphic affirmation app powered by [affirmations.dev](https://www.affirmations.dev).

Plain HTML, CSS, and JavaScript with no build step. To deploy, drop the repo into Netlify. `netlify.toml` publishes the root folder and proxies `/api/affirmation` to affirmations.dev so the browser doesn't hit CORS errors.
