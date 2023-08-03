import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';

import cn from 'classnames';
import { useFieldFocus } from 'lkree-react-utils';

import { Icon } from '~/shared/ui/Icon';

import css from './EditableField.module.sass';

interface Props {
  value: number;
  onDelete?: () => Promise<any>;
  onAccept: (payload: number) => Promise<any>;
}

export const EditableField: FC<Props> = ({ value, onAccept, onDelete }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [stateValue, setStateValue] = useState(value);

  const onAcceptClick = () => {
    setIsEditing(false);

    if (stateValue !== value) {
      setIsLoading(true);
      void onAccept(stateValue).catch(() => setIsLoading(false));
    }
  };

  const onDeleteClick = () => {
    void onDelete?.().catch(() => setIsLoading(false));
  };

  const onRowWithValueClick = useCallback(() => setIsEditing(true), []);

  useLayoutEffect(() => {
    setStateValue(value);
    setIsLoading(false);
  }, [value]);

  useFieldFocus(inputRef, isEditing);

  if (isLoading) return <Spinner />;

  return (
    <Row className="h-100">
      <Col onClick={onRowWithValueClick} className="d-flex align-items-center">
        {isEditing ? (
          <Form.Control
            type="number"
            ref={inputRef}
            value={stateValue}
            onChange={({ target }) => setStateValue(+target.value)}
          />
        ) : (
          <div className={css.valueWrapper}>{value}</div>
        )}
      </Col>
      {isEditing && (
        <>
          <Col sm="auto">
            <Button
              title="Сохранить"
              variant="success"
              onClick={onAcceptClick}
              className={cn(css.button, 'rounded-circle')}
            >
              <Icon type="Mark" className={cn(css.icon, 'text-white')} />
            </Button>
          </Col>
          {onDelete && (
            <Col sm="auto">
              <Button
                title="Удалить"
                variant="danger"
                onClick={onDeleteClick}
                className={cn(css.button, 'rounded-circle position-relative')}
              >
                <div className={css.closeButtonContent}>&times;</div>
              </Button>
            </Col>
          )}
        </>
      )}
    </Row>
  );
};
