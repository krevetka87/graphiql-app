import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface InputProps {
  id: string;
  label: string;
  children: ReactNode;
  error: FieldError | undefined;
}
const InputWrapper = ({ id, label, error, children }: InputProps) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col relative pb-7">
      <label className="flex flex-col text-gray-700 font-semibold" htmlFor={id}>
        {label}
        {children}
      </label>
      {error && (
        <div className="absolute bottom-0 overflow-auto max-w-full">
          <span className="text-red-600 block whitespace-nowrap">
            {error.message || t('forms.errors.common')}
          </span>
        </div>
      )}
    </section>
  );
};

export default InputWrapper;
