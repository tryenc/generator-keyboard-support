const validateQty = require('../validators.js').controlQty;

module.exports = [
  {
    type: "input",
    name: "radioGroupUrl",
    message: "At what url can we find the radio group to test?",
    when: function(answers) {
      return answers.controls.indexOf("radioGroup") > -1;
    }
  },
  {
    type: "input",
    name: "radioGroupSelector",
    message:
      "What selector should be used to target the parent of the radio button group?",
    when: function(answers) {
      return answers.controls.indexOf("radioGroup") > -1;
    }
  },
  {
    type: "input",
    name: "radioGroupQty",
    message: "How many radio buttons are in this group?",
    validate: validateQty,
    when: function(answers) {
      return answers.controls.indexOf("radioGroup") > -1;
    }
  }
];