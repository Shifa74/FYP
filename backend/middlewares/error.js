const createError = (status, message, field = null) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  if (field) {
    err.field = field;
  }
  return err;
};

export default createError;
