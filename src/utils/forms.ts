import { i18n } from '../localization';

const getFieldsOptions = () => ({
  email: {
    required: i18n.t('forms.errors.email.required'),
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]{2,4}$/,
      message: i18n.t('forms.errors.email.pattern'),
    },
  },
  password: {
    required: i18n.t('forms.errors.password.required') || '',

    minLength: {
      value: 8,
      message: i18n.t('forms.errors.password.minLength') || '',
    },
    validate: {
      letter: (value: string) =>
        (value && /[A-Za-z]/.test(value)) ||
        i18n.t('forms.errors.password.validation.letter') ||
        '',
      digit: (value: string) =>
        (value && /\d/.test(value)) || i18n.t('forms.errors.password.validation.digit') || '',
      special: (value: string) =>
        (value && /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(value)) ||
        i18n.t('forms.errors.password.validation.special') ||
        '',
      notCyrillic: (value: string) =>
        (value && /^((?![ЁёА-я]).)*$/.test(value)) ||
        i18n.t('forms.errors.password.validation.notCyrillic') ||
        '',
    },
  },
});

export { getFieldsOptions };
