import { i18n } from '../localization';

const getFieldsOptions = () => ({
  email: {
    required: i18n.t('forms.errors.email.required'),
    pattern: {
      value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      message: i18n.t('forms.errors.email.pattern'),
    },
    validate: {
      letter: (value: string) =>
        (value && /[A-Za-z]/.test(value)) || i18n.t('forms.errors.email.validation.letter') || '',
      digit: (value: string) =>
        (value && /\d/.test(value)) || i18n.t('forms.errors.email.validation.digit') || '',
      special: (value: string) =>
        (value && /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(value)) ||
        i18n.t('forms.errors.email.validation.special') ||
        '',
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
    },
  },
});

export { getFieldsOptions };
