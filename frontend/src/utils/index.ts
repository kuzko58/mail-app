import type { ValidationError } from 'yup';

export const formatYupError = (err: ValidationError) => {
  let errList = {};
  err.inner.forEach((e) => {
    if (e.path) {
      errList = {
        ...errList,
        [e.path]: e.message,
      };
    }
  });
  return errList;
};
