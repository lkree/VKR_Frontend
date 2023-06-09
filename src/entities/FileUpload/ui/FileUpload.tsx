import { ChangeEvent, FormEvent, memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { isObject } from '~/shared/lib/helpers/typeGuards';
import { useActions, useShowAlert } from '~/shared/lib/hooks';
import type { Nullable } from '~/shared/lib/ts';

import { selectFileUploadDate, actions, selectIsFileUploading, selectIsLastUpdatedEqualUploadDate } from '../model';

const formatter = new Intl.DateTimeFormat('ru', {
  hour: '2-digit',
  minute: '2-digit',
  day: 'numeric',
  month: 'short',
  year: '2-digit',
});

export const FileUpload = memo(() => {
  const formRef = useRef<Nullable<HTMLFormElement>>(null);
  const [file, setFile] = useState<Nullable<File>>(null);

  const fileUploadDate = useSelector(selectFileUploadDate);
  const isLastUpdatedEqualUploadDate = useSelector(selectIsLastUpdatedEqualUploadDate);
  const isFileUploading = useSelector(selectIsFileUploading);

  const formattedFileUploadDate = fileUploadDate ? formatter.format(new Date(fileUploadDate)) : null;

  const { getUploadDate, uploadFile, acceptFile } = useActions(actions);

  const { Alert, setAlertState } = useShowAlert();

  const onFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (file)
        void uploadFile(file)
          .unwrap()
          .then(() => {
            setFile(null);
            formRef.current?.reset();
            setAlertState({ variant: 'success', children: 'Файл успешно загружен' });
          });
    },
    [file]
  );

  const onUpdateLeftoversClick = useCallback(
    () =>
      void acceptFile()
        .unwrap()
        .then(() => setAlertState({ variant: 'success', children: 'Данные с файла успешно считаны и записаны' })),
    []
  );

  const onFileAdd = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    if (isObject(target) && 'files' in target && target.files?.[0]) {
      setFile(target.files[0]);
    }
  }, []);

  useLayoutEffect(() => {
    if (fileUploadDate === null) void getUploadDate();
  }, []);

  return (
    <>
      <Form ref={formRef} onSubmit={onFormSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            <div>
              <div>Загрузить можно .html файл (специально выгруженный из 1с)</div>
              {formattedFileUploadDate && (
                <div>
                  Дата последней загрузки файла: <strong>{formattedFileUploadDate}</strong>
                </div>
              )}
            </div>
          </Form.Label>

          <Form.Control onChange={onFileAdd} type="file" accept=".html" />
        </Form.Group>

        <div className="d-flex gap-3">
          <Button disabled={!file || isFileUploading} type="submit">
            Загрузить
          </Button>

          <Button
            onClick={onUpdateLeftoversClick}
            variant="success"
            disabled={isFileUploading || isLastUpdatedEqualUploadDate || !fileUploadDate}
            type="button"
          >
            Обновить
          </Button>
        </div>
      </Form>

      <Alert />
    </>
  );
});
