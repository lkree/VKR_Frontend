import { bindActionCreators } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';

export const useActions = <T extends Parameters<typeof bindActionCreators>[0]>(
  actions: T
) => bindActionCreators(actions, useDispatch());
