/* eslint-disable react/jsx-props-no-spreading */

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { FormValues } from '../../../types/forms.types';
import { FormFields, FIELDS_OPTIONS } from '../../../constants/forms';
import InputWrapper from '../InputWrapper';
import { formsStore } from '../../../store/formsStore';

interface AuthFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const AuthForm = observer(({ onSubmit }: AuthFormProps) => {
  const { t } = useTranslation();

  const { isSignUp } = formsStore;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: 'onBlur' });

  useEffect(() => {
    reset();
  }, [isSignUp, reset]);

  const handleSwitchButton = () => {
    formsStore.toggleIsSignUp();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{!isSignUp ? t('forms.title.login') : t('forms.title.register')}</h2>
      <InputWrapper id={FormFields.email} label={t('forms.fields.email')} error={errors?.email}>
        <input
          type="email"
          id={FormFields.email}
          {...register(FormFields.email, FIELDS_OPTIONS.email)}
        />
      </InputWrapper>
      <InputWrapper
        id={FormFields.password}
        label={t('forms.fields.password')}
        error={errors?.password}
      >
        <input
          type="password"
          id={FormFields.password}
          autoComplete="on"
          {...register(FormFields.password, FIELDS_OPTIONS.password)}
        />
      </InputWrapper>
      <button type="submit">
        {!isSignUp ? t('forms.buttons.login') : t('forms.buttons.register')}
      </button>
      <div>
        <span>{!isSignUp ? t('forms.label.noAccount') : t('forms.label.haveAccount')}</span>
        <button type="button" onClick={handleSwitchButton}>
          {!isSignUp ? t('forms.buttons.register') : t('forms.buttons.login')}
        </button>
      </div>
    </form>
  );
});

export default AuthForm;
