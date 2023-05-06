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
    <section>
      <label htmlFor={id}>
        {label}
        {children}
      </label>
      {error && <span>{error.message || t('forms.errors.common')}</span>}
    </section>
  );
}
