# fanm

A simple glassmorphic quote app powered by the [ZenQuotes API](https://zenquotes.io/).

Plain HTML, CSS, and JavaScript with no build step. To deploy, drop the repo into Netlify. `netlify.toml` publishes the root folder and proxies `/api/quote` to ZenQuotes so the browser doesn't hit CORS errors.
