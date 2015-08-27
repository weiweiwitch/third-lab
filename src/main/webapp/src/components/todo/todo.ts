/// <reference path="../../../typings/tsd.d.ts"/>

import { Component, View, CORE_DIRECTIVES, LifecycleEvent } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router } from 'angular2/router';
import { FormBuilder, FORM_DIRECTIVES, Control, ControlGroup, Validators } from 'angular2/angular2';
import { Http } from 'http/http';

import { PostService } from '../../services/postService';
import { Todo, TodoStore, TodoFactory } from '../../services/todoStore';

@Component({
  selector: 'todo'
})
@View({
  templateUrl: 'components/todo/todo.html',
  directives: [RouterOutlet, RouterLink, CORE_DIRECTIVES]
})
export class TodoCom {

  todoEdit: Todo = null;

  constructor(public todoStore: TodoStore, public factory: TodoFactory) {
    console.log(todoStore);
  }

  enterTodo(inputElement): void {
    this.addTodo(inputElement.value);
    inputElement.value = '';
  }

  editTodo(todo: Todo): void {
    this.todoEdit = todo;
  }

  doneEditing($event, todo: Todo): void {
    var which = $event.which;
    var target = $event.target;
    if (which === 13) {
      todo.title = target.value;
      this.todoEdit = null;
    } else if (which === 27) {
      this.todoEdit = null;
      target.value = todo.title;
    }
  }

  addTodo(newTitle: string): void {
    this.todoStore.add(this.factory.create(newTitle, false));
  }

  completeMe(todo: Todo): void {
    todo.completed = !todo.completed;
  }

  deleteMe(todo: Todo): void {
    this.todoStore.remove(todo);
  }

  toggleAll($event): void {
    var isComplete = $event.target.checked;
    this.todoStore.list.forEach((todo: Todo) => { todo.completed = isComplete; });
  }

  clearCompleted(): void {
    this.todoStore.removeBy((todo) => todo.completed);
  }

}
