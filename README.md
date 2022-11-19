# Scrimba Solo Project - Movie Watchlist

This is a solution to the [movie watchlist solo project on Scrimba's front end career path course](https://scrimba.com).

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
-   [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

-   View the app on any device
-   Search for movies by title
-   Add movies to a watchlist
-   Access the watchlist from a second page
-   Access watchlist items from local storage

### Screenshots

![](/images/screenshot-1.png)
![](/images/screenshot-2.png)
![](/images/screenshot-3.png)
![](/images/screenshot-4.png)

### Links

-   [Live Site URL](https://syd-movie-watchlist.netlify.app)

## My process

### Built with

-   The [Open Movie Database](https://www.omdbapi.com/)
-   Vanila HTML, CSS, And Javascript
-   CSS Flexbox
-   Mobile-first workflow

### What I learned

In JS, I learned I needed to use `Async Await` even when calling an Async function inside a loop:

```js
moviesList.forEach(async movie => {
	const movieData = await getMovieData(movie.imdbID)
	moviesListContainer.innerHTML += getMovieHtml(movieData, "add")
})
```

This is how you select a child element:

```js
document.querySelector("parent > child")
```

In the CSS, I tried to have the movie plot on a separate line on smaller devices, and then move it next to the poster on larger device, but I found it too complicated. In the end, I decided to just have one layout, but making sure the poster won't be sqeezed when the viewport is too small.

```css
.movie-poster {
	width: 20%;
	align-self: flex-start; /* the magic line that helped keep the aspect ratio*/
	border-radius: 3px;
}
```

Other stuff

-   Apparantly, you can't change an SVG's fill color using CSS if it's inserted directly in the HTML.
-   The `indexOf()` method returns `-1` if it does not find anything (and not `undefined`.)

### Continued development

-   Add a _Next Page_ function to the search results
-   Make the site a PWA

## Acknowledgments

Header photo by <a href="https://unsplash.com/@felixmooneeram?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Felix Mooneeram</a> on <a href="https://unsplash.com/s/photos/cinema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
