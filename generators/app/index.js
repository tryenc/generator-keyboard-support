const CHECKBOX = 'checkbox';
const LISTBOX = 'listbox';
const RADIOGROUP = 'radioGroup';

const validate = require('./validators.js');

const listboxPrompts = require(
  './prompts/listbox_prompts.js'
);
const radioGroupPrompts = require('./prompts/radio_group_prompts.js');

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("babel");
  }
  prompting() {
    const done = this.async();
    this.prompt([
      {
        type: "list",
        name: "controls",
        message:
          "What kind of control(s) do you want to generate tests for?",
        choices: [LISTBOX, RADIOGROUP]
      },
      ...listboxPrompts,
      ...radioGroupPrompts,
    ]).then(answers => {
      this.controls = answers.controls;
      this.listboxUrl = answers.listboxUrl;
      this.listboxSelector = answers.listboxSelector;
      this.listboxHomeEndSupport = answers.listboxHomeEndSupport;
      done();
    });
  }
  writing() {
    this.fs.copy(
      this.templatePath("support/**"),
      this.destinationPath("support/")
    );
    this.fs.copy(
      this.templatePath("step-definitions/given.js"),
      this.destinationPath("features/step-definitions/given.js")
    );
    this.fs.copy(
      this.templatePath("step-definitions/then.js"),
      this.destinationPath("features/step-definitions/then.js")
    );
    this.fs.copy(
      this.templatePath("step-definitions/when.js"),
      this.destinationPath("features/step-definitions/when.js")
    );

    if (this.controls.indexOf(LISTBOX) > -1) {
      this.fs.copy(
        this.templatePath("step-definitions/listbox_steps.js"),
        this.destinationPath("features/step-definitions/listbox_steps.js")
      );
      this.fs.copyTpl(
        this.templatePath("features/listbox_keyboard_interaction.feature"),
        this.destinationPath("features/listbox_keyboard_interaction.feature"),
        {
          listboxUrl: this.listboxUrl,
          listboxSelector: this.listboxSelector,
          listboxHomeEndSupport: this.listboxHomeEndSupport
        }
      );
    }
  }
};