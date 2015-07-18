/// <reference path="../../typings/tsd.d.ts" />

import { Ancestor, NgFormModel, Component, View, coreDirectives, EventEmitter } from 'angular2/angular2';

@Component({
  selector: 'show-error',
  properties: ['controlPath: control', 'errorTypes: errors']
})
@View({
  template: `
    <span *ng-if="errorMessage !== null">{{errorMessage}}</span>
  `,
  directives: [coreDirectives]
})
export class ShowError {
  formDir;
  controlPath: string;
  errorTypes: List<string>;

  constructor( @Ancestor() formDir: NgFormModel) { this.formDir = formDir; }

  get errorMessage() {
    var c = this.formDir.form.find(this.controlPath);
    for (var i = 0; i < this.errorTypes.length; ++i) {
      if (c !== null && c.touched && c.hasError(this.errorTypes[i])) {
        return this._errorMessage(this.errorTypes[i]);
      }
    }
    return null;
  }

  _errorMessage(code) {
    var config = { 'required': 'is required', 'tooShort': 'title too short' };
    return config[code];
  }
}