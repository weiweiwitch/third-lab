/// <reference path="../../typings/tsd.d.ts"/>

import {Injectable } from 'angular2/angular2';

// base model for RecordStore
export class KeyModel {
  constructor(public key: number) { }
}

export class Todo extends KeyModel {
  constructor(key: number, public title: string, public completed: boolean) {
    super(key);
  }
}

@Injectable()
export class TodoFactory {
  _uid: number = 0;

  nextUid(): number {
    return ++this._uid;
  }

  create(title: string, isCompleted: boolean): Todo {
    return new Todo(this.nextUid(), title, isCompleted);
  }
}

interface LPredicate<T> {
  (value: T, index?: number, array?: T[]): boolean;
}

// Store manages any generic item that inherits from KeyModel
@Injectable()
export class TodoStore {
  list: List<KeyModel> = [];

  add(record: KeyModel): void {
    this.list.push(record);
  }

  remove(record: KeyModel): void {
    this._spliceOut(record);
  }

  removeBy(callback): void {
    let records = this.list.filter(callback);
    console.log(records);
    this.removeAll(this.list, records);
  }

  removeAll<T>(list: List<T>, items: List<T>) {
    for (var i = 0; i < items.length; ++i) {
      var index = list.indexOf(items[i]);
      list.splice(index, 1);
    }
  }

  private _spliceOut(record: KeyModel) {
    var i = this._indexFor(record);
    if (i > -1) {
      return this.list.splice(i, 1)[0];
    }
    return null;
  }

  private _indexFor(record: KeyModel) {
    return this.list.indexOf(record);
  }
}
