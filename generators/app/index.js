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
    const done = this.async();
    this.prompt([
      // {
      //   type: 'input',
      //   name: 'featurePath',
      //   message: 'Specify the path to the directory where you want to store the feature files',
      //   default: 'features',
      //   required: true,
      //   store: true,
      // },
      // {
      //   type: 'input',
      //   name: 'stepsPath',
      //   message: 'Specify the path to the directory where you want to store the step definition files',
      //   default: 'step-definitions',
      //   required: true,
      //   store: true,
      // },
      {
        type: "list",
        name: "controls",
        message:
          "What kind of control(s) do you want to generate tests for?",
        choices: [LISTBOX]
      },
      {
        type: "input",
        name: "listboxUrl",
        message:
          'At what url can we find the listbox to test? Urls beginning with "/", will be appended to the baseUrl defined in the wdio configuration file.',
        // validate: validate.url,
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
        name: "listboxSelectorFirst",
        message:
          "What selector should be used to target the first option in the listbox?",
      },
      {
        type: "input",
        name: "listboxSelectorSecond",
        message:
          "What selector should be used to target the second option in the listbox?",
        when: function(answers) {
          const qtyAsNum = Number(answers.listboxQty);
          return qtyAsNum > 2;
        }
      },
      {
        type: "input",
        name: "listboxSelectorLast",
        message:
          "What selector should be used to target the last option in the listbox?",
      }
    ]).then(answers => {
      this.listboxUrl = answers.listboxUrl;
      this.listboxQty = answers.listboxQty;
      this.listboxSelectorFirst = answers.listboxSelectorFirst;
      this.listboxSelectorLast = answers.listboxSelectorLast;
      this.listboxSelectorSecond = answers.listboxSelectorSecond ?
        answers.listboxSelectorSecond : answers.listboxSelectorLast;
      done();
    });
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath("listbox_down.feature"),
      this.destinationPath("features/listbox/listbox_down.feature"),
      {
        listboxUrl: this.listboxUrl,
        listboxSelectorFirst: this.listboxSelectorFirst,
        listboxSelectorSecond: this.listboxSelectorSecond
      }
    );
  }
};