/**
 * validators
 *
 *
 */

export const checkForFields = (body, fields) => {
  const requiredFields = fields || [
    'firstName',
    'lastName',
    'email',
    'password',
  ];
  const missingField = requiredFields.find((field) => !(field in body));
  if (missingField) {
    return {
      code: 422,
      reason: 'ValidationError',
      message: 'Missing required field',
      location: missingField,
    };
  }
};

export const checkForValidType = (body, fields, type) => {
  const stringFields = fields;
  const nonStringField = stringFields.find(
    // eslint-disable-next-line valid-typeof
    (field) => field in body && typeof body[field] !== type,
  );

  if (nonStringField) {
    return {
      code: 422,
      reason: 'ValidationError',
      message: `Incorrect field type: expected '${type}', actual '${typeof body[
        nonStringField
      ]}'`,
      location: nonStringField,
    };
  }
};

export const checkForValidStrings = (body, fields) => {
  const stringFields = fields || [
    'email',
    'username',
    'password',
    'firstName',
    'lastName',
  ];
  const nonStringField = stringFields.find(
    (field) => field in body && typeof body[field] !== 'string',
  );

  if (nonStringField) {
    return {
      code: 422,
      reason: 'ValidationError',
      message: `Incorrect field type: expected 'string', actual '${typeof body[
        nonStringField
      ]}'`,
      location: nonStringField,
    };
  }
};

export const checkForValidInteger = (body, fields) => {
  const integerFields = fields;
  const nonIntegerField = integerFields.find(
    (field) =>
      field in body &&
      (typeof body[field] !== 'number' || !Number.isInteger(body[field])),
  );

  if (nonIntegerField) {
    return {
      code: 422,
      reason: 'ValidationError',
      message: `Incorrect field type: expected 'integer', actual '${typeof body[
        nonIntegerField
      ]}'`,
      location: nonIntegerField,
    };
  }
};

// other static types to avoid having to provide extra type argument
export const checkForValidNumber = (body, fields) =>
  checkForValidType(body, fields, 'number');
export const checkForValidBoolean = (body, fields) =>
  checkForValidType(body, fields, 'boolean');

export const checkForSizedFields = (body, _sizedFields) => {
  const sizedFields = _sizedFields || {
    username: {
      min: 1,
    },
    password: {
      min: 10,
      // bcrypt truncates after 72 characters, so let's not give the illusion
      // of security by storing extra (unused) info
      max: 72,
    },
  };
  const tooSmallField = Object.keys(sizedFields).find(
    (field) =>
      'min' in sizedFields[field] &&
      body[field].trim().length < sizedFields[field].min,
  );
  const tooLargeField = Object.keys(sizedFields).find(
    (field) =>
      'max' in sizedFields[field] &&
      body[field].trim().length > sizedFields[field].max,
  );

  if (tooSmallField || tooLargeField) {
    return {
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
        : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
      location: tooSmallField || tooLargeField,
    };
  }
};
