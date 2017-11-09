import {
  always, append, identity, is, mergeDeepRight,
  evolve, complement, cond, not,
  propEq, filter, map, T
} from 'ramda';
import * as React from 'react';

import { container } from 'architecture';
import Message, { Activate } from 'architecture/message';

import { TodoFilter, TodoAppModel } from './model';
import App from './index';

class AddTodo extends Message {};

class ShowFilter extends Message { };

class ClearCompleted extends Message {};

class DeleteTodo extends Message {
  public static expects = { value: is(Number) };
};

class CompleteTodo extends Message {
  public static expects = { value: is(Number) };
};

class EditTodo extends Message {
  public static expects = { value: is(Number) };
};

const createTodoId = () => new Date().valueOf();

const emptyInput = {
  text: '',
},

export default container({
  name: 'AppContainer',

  init: always({
    todos: [
      {
        text: 'Use Architecture',
        completed: false,
        editing: false,
        id: createTodoId(),
      },
    ],
    filter: TodoFilter.ShowAll,
    todo_input: emptyInput,
  }),

  update: [
    [Activate, identity],

    [AddTodo, (state: TodoAppModel) => evolve({
      todos: append({
        text: state.todo_input.text,
        completed: false,
        editing: false,
        id: createTodoId(),
      }),
      todo_input: always(emptyInput)
    }, state)],

    [CompleteTodo, (state: TodoAppModel, { value }) => evolve({
      todos: map(cond([
              [propEq('id', value), evolve({ completed: not })],
              [T, identity]
            ]))
    }, state)],

    [DeleteTodo, (state: TodoAppModel, { value }) => evolve({
      todos: filter(complement(propEq('id', value)))
    }, state)],

    [EditTodo, (state: TodoAppModel, { value }) => evolve({
      todos: map(cond([
        [propEq('id', value), evolve({ editing: not })],
        [T, identity]
      ]))
    }, state)],

    [ClearCompleted, evolve({
      todos: filter(propEq('completed', false))
    })],

    [ShowFilter, (state: TodoAppModel, { value }) => mergeDeepRight(state, { filter: value })],
  ],

  view: ({ emit, todos, filter }) => (
    <App
      todos={todos}
      addTodo={emit(AddTodo)}
      actions={{
        deleteTodo: emit(DeleteTodo),
        completeTodo: emit(CompleteTodo),
        editTodo: emit(EditTodo),
      }}
      clearCompleted={emit(ClearCompleted)}
      onShow={emit(ShowFilter)}
      filter={filter}
    />
  ),
});
