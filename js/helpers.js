/* ==========================================================================
| =========---------- Helpers.js by James D Bartlett III ----------==========
| This lightweight JavaScript library is designed to add a few handy
| utilities to any project. Simply call this file in your <head> before all
| your other JavaScript files (to make sure its functions are loaded first).
| Then, either add functions to the "Functions to load at page load time"
| section below, or call them from other scripts or funcitons later.
========================================================================== */

// Functions to load at page load time [edit this section per project]

logDivider();




// Function Definitions [do not edit this section per project]

// Creates a visual divider between logs from different page loads.
function logDivider() {
  console.log(`
















  -----------------------------
  This Page Load: ${Date.now()}

  `);
}

// Returns a random integer between a and b (inclusive)
function randInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1) ) + a;
}
