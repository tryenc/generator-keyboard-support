module.exports = {
  controlQty: function(value) {
    const valAsNum = Number(value);

    if (Number.isNaN(valAsNum)) {
      return "The value that you've entered in not a number. Please enter an integer.";
    }
    if (!Number.isSafeInteger(valAsNum)) {
      return "You've enetered a value with a decimal point. Please enter an integer";
    }

    return true;
  },
  url: function(value) {
    let pass;
    if (value.charAt(0) === '/') {
      // validate path
    } else {
      // validate url
      pass = value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i);
    }

    return Boolean(pass) || 'Please enter a valid url';
  }
}