const CHECKBOX = 'checkbox';
const LISTBOX = 'listbox';
const RADIOGROUP = 'radio-group';

const validate = require('./validators.js');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("babel");
  }
  prompting() {
    this.prompt([
      {
        type: "list",
        name: "controls",
        message:
          "What kind of control(s) do you want to generate tests for?",
        choices: [CHECKBOX, LISTBOX, RADIOGROUP]
      },
      {
        type: "input",
        name: "checkboxUrl",
        message:
          'At what url can we find the checkbox to test? Urls beginning with "/", will be appended to the baseUrl defined in the wdio configuration file.',
        validate: validate.url,
        when: function(answers) {
          return answers.controls.indexOf(CHECKBOX) > -1;
        }
      },
      {
        type: "input",
        name: "checkboxQty",
        message: "How many checkboxes are in this group?",
        validate: validate.qty,
        when: function(answers) {
          return answers.checkboxUrl;
        }
      },
      {
        type: "input",
        name: "listboxUrl",
        message:
          'At what url can we find the listbox to test? Urls beginning with "/", will be appended to the baseUrl defined in the wdio configuration file.',
        validate: validate.url,
        when: function(answers) {
          return answers.controls.indexOf(LISTBOX) > -1;
        }
      },
      {
        type: "input",
        name: "listboxQty",
        message: "How many options are in this listbox?",
        validate: validate.qty,
        when: function(answers) {
          return answers.listboxUrl;
        }
      },
      {
        type: "input",
        name: "radioGroupUrl",
        message:
          'At what url can we find the radio-group to test? Urls beginning with "/", will be appended to the baseUrl defined in the wdio configuration file.',
        validate: validate.url,
        when: function(answers) {
          return answers.controls.indexOf(RADIOGROUP) > -1;
        }
      },
      {
        type: "input",
        name: "radioGroupQty",
        message: "How many button are in this radio-group?",
        validate: validate.qty,
        when: function(answers) {
          return answers.radioGroupUrl;
        }
      }
    ]).then(answers => {
      this.checkboxUrl = answers.checkboxUrl;
      this.checkboxQty = answers.checkboxQty;
      this.listboxUrl = answers.listboxUrl;
      this.listboxQty = answers.listboxQty;
      this.radioGroupUrl = answers.radioGroupUrl;
      this.radioGroupQty = answers.radioGroupQty;
    });
  }
};