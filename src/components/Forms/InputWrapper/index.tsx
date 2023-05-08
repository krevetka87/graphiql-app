import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface InputProps {
  id: string;
  label: string;
  children: ReactNode;
  error: FieldError | undefined;
}

export default function InputWrapper({ id, label, error, children }: InputProps) {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col relative pb-7">
      <label className="flex flex-col text-gray-700" htmlFor={id}>
        {label}
        {children}
      </label>
      {error && (
        <span className="text-red-600 absolute bottom-0">
          {error.message || t('forms.errors.common')}
        </span>
      )}
    </section>
  );
}
