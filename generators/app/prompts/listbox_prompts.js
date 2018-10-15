module.exports = [
  {
    type: "input",
    name: "listboxUrl",
    message: "At what url can we find the listbox to test?",
    when: function(answers) {
      return answers.controls.indexOf("listbox") > -1;
    }
  },
  {
    type: "input",
    name: "listboxSelector",
    message: "What selector should be used to target the listbox?",
    when: function(answers) {
      return answers.controls.indexOf("listbox") > -1;
    }
  },
  {
    type: "confirm",
    name: "listboxHomeEndSupport",
    message: "Would you like to add tests for the Home and End keys?",
    when: function(answers) {
      return answers.controls.indexOf("listbox") > -1;
    }
  }
];