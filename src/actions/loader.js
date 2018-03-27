import Types from './types';

export const showLoader = () => (
  { type: Types.loader.SHOW_LOADER }
);

export const hideLoader = () => (
  { type: Types.loader.HIDE_LOADER }
);
