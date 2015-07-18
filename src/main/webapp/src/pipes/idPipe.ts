/// <reference path="../../typings/tsd.d.ts" />

import { Pipe, PipeFactory, NullPipeFactory } from 'angular2/angular2';

export class IdPipe implements Pipe {
  supports(obj) {
    return true;
  }

  onDestroy() { }

  transform(value, args = []) {
    return `${value}${value}`;
  }
}

export let idPipe = new IdPipe();