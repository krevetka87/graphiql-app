/* eslint-disable react/jsx-props-no-spreading */

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { FormValues } from '../../../types/forms.types';
import { FormFields, FIELDS_OPTIONS } from '../../../constants/forms';
import { formsStore } from '../../../store/formsStore';
import InputWrapper from '../InputWrapper';
import eye from '../../../assets/eye-outline.svg';
import eyeOff from '../../../assets/eye-off-outline.svg';

interface AuthFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const AuthForm = observer(({ onSubmit }: AuthFormProps) => {
  const { t } = useTranslation();

  const [type, setType] = useState('password');

  const { isSignUp, isLoading } = formsStore;

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

  const toggleType = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <form
      className="px-6 flex flex-col min-h-full justify-center gap-4 w-6/12 ml-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-lg">{!isSignUp ? t('forms.title.login') : t('forms.title.register')}</h2>
      <InputWrapper id={FormFields.email} label={t('forms.fields.email')} error={errors?.email}>
        <input
          className="border-2 rounded-md px-4 py-2 text-gray-700 focus:outline-none"
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
        <div className="flex border-2 rounded-md px-4 py-2 pr-9 text-gray-700 relative">
          <input
            type={type}
            className="w-full focus:outline-none"
            id={FormFields.password}
            autoComplete="on"
            {...register(FormFields.password, FIELDS_OPTIONS.password)}
          />
          <button
            className="absolute right-2 flex top-1/2 -translate-y-1/2"
            type="button"
            onClick={toggleType}
          >
            <img className="w-5 h-5" src={type === 'password' ? eye : eyeOff} alt="" />
          </button>
        </div>
      </InputWrapper>
      <button className="bg-gray-300 rounded-full py-3" type="submit">
        {!isSignUp ? t('forms.buttons.login') : t('forms.buttons.register')}
        {isLoading && 'Loading...'}
      </button>
      <div className="flex gap-1">
        <span>{!isSignUp ? t('forms.label.noAccount') : t('forms.label.haveAccount')}</span>
        <button className="border-b border-b-black" type="button" onClick={handleSwitchButton}>
          {!isSignUp ? t('forms.buttons.register') : t('forms.buttons.login')}
        </button>
      </div>
    </form>
  );
});

export default AuthForm;
