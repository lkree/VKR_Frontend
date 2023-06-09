import type { FC } from 'react';
import { useRef } from 'react';
import { Button, Col, Form, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import {
  selectNewCityName,
  selectNewCityPrefix,
  selectShowNewCityForm,
  actions,
} from '~/entities/CitiesPrefixEdit/model';

import { stopPropagation } from '~/shared/lib/helpers';
import { useActions, useFieldFocus, useWindowEvent } from '~/shared/lib/hooks';

export const AddItemButton: FC = () => {
  const cityPrefixInputRef = useRef<HTMLInputElement>(null);
  const popoverBodyRef = useRef<HTMLDivElement>(null);
  const { setNewCityPrefix, setNewCityName, saveNewCityItem, setShowNewCityForm } = useActions(actions);

  const cityPrefix = useSelector(selectNewCityPrefix);
  const cityName = useSelector(selectNewCityName);
  const showNewCityForm = useSelector(selectShowNewCityForm);

  useFieldFocus(cityPrefixInputRef, showNewCityForm);

  useWindowEvent('click', e => {
    if (
      popoverBodyRef.current?.parentElement &&
      showNewCityForm &&
      e.target &&
      !popoverBodyRef.current.parentElement.contains(e.target as HTMLElement)
    ) {
      setShowNewCityForm(false);
    }
  });

  useWindowEvent('keyup', e => {
    if (showNewCityForm && cityPrefix && cityName) {
      switch (e.code) {
        case 'Enter':
          void saveNewCityItem();
          return;
        case 'Escape':
          setShowNewCityForm(false);
      }
    }
  });

  return (
    <OverlayTrigger
      show={showNewCityForm}
      trigger="click"
      onToggle={() => setShowNewCityForm(!showNewCityForm)}
      placement="left"
      overlay={
        <Popover>
          <Popover.Header as="h3">Новый город</Popover.Header>

          <Popover.Body ref={popoverBodyRef}>
            <Form className="d-flex flex-column gap-4">
              <Row>
                <Col>
                  <Form.Control
                    ref={cityPrefixInputRef}
                    placeholder="Префикс"
                    value={cityPrefix}
                    onChange={e => setNewCityPrefix(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control placeholder="Имя" value={cityName} onChange={e => setNewCityName(e.target.value)} />
                </Col>
              </Row>
              {cityName && cityPrefix && (
                <Row>
                  <Col>
                    <Button onClick={() => void saveNewCityItem()} variant="success">
                      Сохранить
                    </Button>
                  </Col>
                </Row>
              )}
            </Form>
          </Popover.Body>
        </Popover>
      }
    >
      <Button variant="success" onClick={stopPropagation}>
        Добавить ещё
      </Button>
    </OverlayTrigger>
  );
};
