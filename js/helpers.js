logDivider();

// Creates a visual divider between logs from different page loads.
function logDivider() {
  console.log(`
















  ---------------------------------------------------------
  ------------- This Page Load: ${Date.now()} -------------

  `);
}

// Returns a random integer between a and b (inclusive)
function randInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1) ) + a;
}
