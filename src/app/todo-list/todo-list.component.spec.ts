/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';

describe('Component: TodoList', () => {
  it('should create an instance', () => {
    let component = new TodoListComponent();
    expect(component).toBeTruthy();
  });
});
