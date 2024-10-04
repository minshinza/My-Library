function titleCase(str) {
    // Split the string into an array of words
    var words = str.split(" ");
    
    // Iterate through each word
    for (var i = 0; i < words.length; i++) {
      // Capitalize the first letter and combine it with the rest of the word
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    
    // Join the array of words back into a single string
    return words.join(" ");
  }
  