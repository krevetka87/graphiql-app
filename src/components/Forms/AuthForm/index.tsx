import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { FormValues, InputPasswordType } from 'src/types/forms.types';
import { FormFields } from 'src/constants/forms';
import { formsStore } from 'src/store/formsStore';
import { getFieldsOptions } from 'src/utils/forms';
import { ReactComponent as EyeIcon } from 'src/assets/eye-outline.svg';
import { ReactComponent as EyeOffIcon } from 'src/assets/eye-off-outline.svg';
import { ReactComponent as SpinnerIcon } from 'src/assets/spinner.svg';
import InputWrapper from '../InputWrapper';

interface AuthFormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const AuthForm = observer(({ onSubmit }: AuthFormProps) => {
  const { t } = useTranslation();

  const [typePasswordInput, setTypePasswordInput] = useState<InputPasswordType>('password');

  const { isSignUp, isLoading } = formsStore;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const handleSwitchButton = () => {
    formsStore.toggleIsSignUp();
  };

  const toggleType = () => {
    setTypePasswordInput(typePasswordInput === 'password' ? 'text' : 'password');
  };

  useEffect(() => {
    reset();
  }, [isSignUp, reset]);

  useEffect(() => {
    if (errors.email || errors.password) {
      trigger();
    }
  }, [t, trigger, errors]);

  return (
    <form
      className={`bg-white p-6 flex flex-col min-h-full justify-center gap-4 w-6/12 ml-auto transition-all duration-300 shadow-xl ${
        isSignUp ? '-translate-x-0' : '-translate-x-full'
      } max-md:w-full max-md:-translate-x-0`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-semibold mb-6">
        {!isSignUp ? t('forms.title.login') : t('forms.title.register')}
      </h1>
      <InputWrapper id={FormFields.email} label={t('forms.fields.email')} error={errors?.email}>
        <input
          className="border-2 rounded-md px-4 py-2 text-gray-700 focus:outline-none"
          type="email"
          id={FormFields.email}
          placeholder="example1@gmail.com"
          {...register(FormFields.email, getFieldsOptions().email)}
        />
      </InputWrapper>
      <InputWrapper
        id={FormFields.password}
        label={t('forms.fields.password')}
        error={errors?.password}
      >
        <div className="flex border-2 rounded-md px-4 py-2 pr-9 text-gray-700 relative">
          <input
            type={typePasswordInput}
            className="w-full focus:outline-none"
            id={FormFields.password}
            autoComplete="on"
            placeholder="*********"
            {...register(FormFields.password, getFieldsOptions().password)}
          />
          <button
            className="absolute right-2 flex top-1/2 -translate-y-1/2"
            type="button"
            onClick={toggleType}
          >
            {typePasswordInput === 'password' ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </InputWrapper>
      <button
        className="flex justify-center items-center text-lg font-semibold bg-gray-300 rounded-full py-3 transition-all hover:bg-gray-400"
        type="submit"
      >
        {!isLoading && !isSignUp && t('forms.buttons.login')}
        {!isLoading && isSignUp && t('forms.buttons.register')}
        {isLoading && <SpinnerIcon className="h-7" />}
      </button>
      <div className="flex gap-1">
        <span>{!isSignUp ? t('forms.label.noAccount') : t('forms.label.haveAccount')}</span>
        <button
          className="border-b border-b-black transition-all  hover:font-semibold"
          type="button"
          onClick={handleSwitchButton}
        >
          {!isSignUp ? t('forms.buttons.register') : t('forms.buttons.login')}
        </button>
      </div>
    </form>
  );
});

export default AuthForm;
