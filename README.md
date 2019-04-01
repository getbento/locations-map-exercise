# BentoBox Locations Map Excercise

This exercise requires you to display 25 random BentoBox locations on a map in React.

Use whatever other tools you think are best to accomplish the requirements below (for example, local component state using `setState()`, Redux, MobX, etc).

We're primarily interested in seeing how you structure and implement a small JavaScript project so there is no requirement to spend a lot of time on styling (though it should be presentable). However, if CSS is your strength, feel free to make it beautiful!

We estimate this exercise will take somewhere between 2-3 hours to complete. Please attempt to write modular, reusable code, where possible.

# Instructions

1.  Fork this repository.
2.  Install dependencies with `npm install` or `yarn`.
3.  Run `npm start` or `yarn start`. This should start a webpack dev server, and the app should be accessible at `http://localhost:8080/`
4.  When you're done, please open a pull request and send us an email letting us know you're done.

If you have any problems getting the app started or installing the dependencies, please let us know.

# Location Data

`src/helpers/api.js` contains the function `fetchLocations` which will fetch 25 random locations from BentoBox. It is currently called in `<App />`, but feel free to move it to whichever component you think makes the most sense.

# Requirements

1.  When `fetchLocations()` is called, display an indication to the user that the locations are loading (this could be a loader or a simple message).

2.  Based on the response from `fetchLocations()`, place corresponding pins on a map (use whatever mapping library you choose).

3.  Add tooltips that open when clicking a pin. The tooltip should contain the name and address of the location, as well as a button to "view details.""

4.  When a user clicks on "view details", this should display all the location data (e.g., name, address, an image, and hours if present in response, etc.) somewhere else on the page. For example, you could have the map on one side of the screen and the selected location details on the other, or you could display the details in a modal.

# Optional

1.  If more than one image is returned by the API for a given location, display an image slider.
2.  Implement undo/redo functionality to cycle through the previously selected locations.

# Notes

The smaller size and shorter time frame of this project influenced most of my decisions, and I've included some relevant notes below.

- I hadn't worked with a mapping library in over a year, but after a bit of research my inclination was to use react-mapbox-gl (a react wrapper for mapbox-gl-js). For a small project like this I thought the benefits of its familiar, declaritive style would outweigh the flexibility I'd need to give up by using someone else's werapper. However, it didn't play nicely with the project's current configuration and I couldn't get it to run. Rather than dive into babel/webpack, I decided to use pure mapbox-gl-js.
- I normally use Redux to implement global state management. However, because of the limited scope of the project I never got to a point where it seemed like it would be helpful, and I wound up sticking with local state management.
- I used inline styling for my React components, and a style tag in index.html for the mapbox popups and markers. In a larger project I'd focus on building out a full stylesheet.
- I used an array on local state to implement navigation through selection history. There's no limit on the size of the array, just catches to make sure that you can't navigate outside the array. It might be worthwhile to have some sort of bound on the size of the selection history.
- I used a library called DOMPurify to handle the HTML strings we received from the API. I spent a little bit of time reviewing it, but would want to spend more time confirming it's the right library for the job.
- I broke out a component called NavigationButton.js to clean up FullDetails.js. In a larger project, it probably would have been better not to make it specific to navigation, and use the same component for the close button that also appears in FullDetails.js.
- I decided to use a default image when one wasn't provided by the API, which helped with styling and formatting.
