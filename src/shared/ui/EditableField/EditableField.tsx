import type { FC } from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';

import cn from 'classnames';

import { useFieldFocus } from '~/shared/lib/hooks';
import { Icon } from '~/shared/ui/Icon';

import css from './EditableField.module.sass';

interface Props {
  value: number;
  onAccept: (payload: number) => any;
  onDelete: () => any;
}

export const EditableField: FC<Props> = ({ value, onAccept, onDelete }) => {
  const minimalLeftoverInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [stateValue, setStateValue] = useState(value);

  const onAcceptClick = () => {
    setIsEditing(false);

    if (stateValue !== value) {
      onAccept(stateValue);
      setIsLoading(true);
    }
  };

  const onRowWithMinimalLeftoverClick = useCallback(() => setIsEditing(true), []);

  useLayoutEffect(() => {
    setStateValue(value);
    setIsLoading(false);
  }, [value]);

  useFieldFocus(minimalLeftoverInputRef, isEditing);

  if (isLoading) return <Spinner />;

  return (
    <Row className="h-100">
      <Col onClick={onRowWithMinimalLeftoverClick} className="d-flex align-items-center">
        {isEditing ? (
          <Form.Control
            ref={minimalLeftoverInputRef}
            onChange={({ target }) => setStateValue(+target.value)}
            type="number"
            value={stateValue}
          />
        ) : (
          <div className={css.minimalLeftoverWrapper}>{value}</div>
        )}
      </Col>
      {isEditing && (
        <Col sm="6">
          <div className="d-flex gap-2">
            <Button
              variant="success"
              title="Сохранить"
              className={cn(css.button, 'rounded-circle')}
              onClick={onAcceptClick}
            >
              <Icon type="Mark" className={cn(css.icon, 'text-white')} />
            </Button>

            <Button
              variant="danger"
              title="Удалить"
              className={cn(css.button, 'rounded-circle position-relative')}
              onClick={onDelete}
            >
              <div className={css.closeButtonContent}>&times;</div>
            </Button>
          </div>
        </Col>
      )}
    </Row>
  );
};
