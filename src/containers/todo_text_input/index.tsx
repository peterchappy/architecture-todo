import * as React from 'react';
import * as classnames from 'classnames';

type TodoInputProp = {
  editing?: boolean;
  isNew?: boolean;
  placeholder?: string;
  value?: string;
  onBlur?: () => any;
  onChange?: () => any;
  onSubmit?: () => any;
}

export default ({ editing = false, isNew = false, placeholder, value = '', onBlur, onChange, onSubmit }: TodoInputProp) => (
  <input
    type='text'
    className={classnames({ edit: editing, 'new-todo': isNew })}
    autoFocus
    onKeyDown={e => e.which === 13 && onSubmit()}
    { ...{ value, placeholder, onBlur, onChange } }
  />
);
