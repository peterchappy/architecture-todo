import * as React from 'react';
import * as classnames from 'classnames';
import TodoTextInput from '../../containers/todo_text_input/container';

class TodoItem extends React.Component {

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id, text){
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    // this.setState({ editing: false });
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props;

    let element;
    // if (this.state.editing) {
    //   element = (
    //     <TodoTextInput
    //       text={todo.text}
    //       editing={this.state.editing}
    //       onSave={text => this.handleSave(todo.id, text)} />
    //   );
    // } else {
      element = (
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button
            className='destroy'
            onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    // }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: false,
      })}
      >
        {element}
      </li>
    );
  }
}

// TodoItem.propTypes = {
//   todo: PropTypes.object.isRequired,
//   editTodo: PropTypes.func.isRequired,
//   deleteTodo: PropTypes.func.isRequired,
//   completeTodo: PropTypes.func.isRequired,
// }

export default TodoItem;
