# Shikivost

[![Shikivost](https://img.shields.io/amo/v/shikivost)](https://addons.mozilla.org/ru/firefox/addon/shikivost/)
[![Shikivost](https://img.shields.io/chrome-web-store/v/alfpkdagonppegpjijmcgcccafchklmc)](https://chromewebstore.google.com/detail/alfpkdagonppegpjijmcgcccafchklmc)

## Description

Tired of juggling between Animevost.org and Shikimori.one to keep track of your anime progress? Introducing Shikivost – your go-to extension for a hassle-free anime-watching experience. This nifty tool effortlessly syncs your watched episodes on Animevost.org with your Shikimori.one account. No more manual updates, no more confusion about where you left off – Shikivost does it all in the background.

## Usage

1. Install extension
2. Login to the Shikimori.one
   ![Login page](https://raw.githubusercontent.com/cjvnjde/shikivost/main/docs/img/1.png)
3. Open the anime page on Animevost.org
   ![Anime page](https://raw.githubusercontent.com/cjvnjde/shikivost/main/docs/img/2.png)

## Development

Follow the instructions below to set up and run the project.

Please note that you need to have pnpm installed globally to execute the commands above.

**Installation**

```bash
pnpm install
```

**Running the extension for firefox**

```bash
pnpm run start:extension:firefox
```

**Building the project**

```bash
pnpm run build
```

**Bundling the project**

```bash
pnpm run bundle
```

## TODO

- [x] add ability to add to the list
- [x] add ability to remove from the list
- [x] add link to the anime page on shikimori site
- [x] add shikimori rating
- [x] add shikimori episode selection (simple increment)
- [x] auto add episode to the list during watching
- [ ] add extended rating editing form
- [x] add settings page
- [ ] add shikimori logout button
- [ ] add watched/unwatched button to the episodes list block
- [x] update algo to detect wathed episodes
- [x] add chrome support
