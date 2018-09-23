Feature: Listbox Keyboard Support Down Arrow
  Background:
    Given I open the site "<%= listboxUrl %>"

  Scenario: Moves focus to and selects the next option
    Given I click on the element "<%= listboxSelectorFirst %>"
    And the element "<%= listboxSelectorFirst %>" is selected
    When I type "ArrowDown"
    Then I expect the element "<%= listboxSelectorSecond %>" is focused
    And I expect the element "<%= listboxSelectorSecond %>" is selected
