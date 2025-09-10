'use client';
import React, { useImperativeHandle, useRef } from 'react';
import { LabeledInput } from '@/UI/components/form/Input';
import { LabeledTextarea } from '@/UI/components/form/TextArea';
import Button from '@/UI/components/Button';
import { useTranslations } from 'next-intl';
import { useForm, ValidationError } from '@formspree/react';
import styles from './styles.module.scss';

const ContactForm = React.forwardRef<
  HTMLFormElement,
  { customSubmit?: boolean }
>(({ customSubmit = false }, imperativeRef) => {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_FORMSPREE_CONTACTUS || 'xyzdopal'
  );

  const ref = useRef<HTMLFormElement>(null);
  const t = useTranslations('contact');
  console.log(state?.errors);

  useImperativeHandle(imperativeRef, () => ref.current!);

  return (
    <form ref={ref} onSubmit={handleSubmit} className={styles.form__body}>
      <LabeledInput
        sizeStyle="lg"
        name="name"
        label={t('fields.full_name')}
        placeholder={t('fields.full_name_placeholder')}
        required
      />
      <LabeledInput
        sizeStyle="lg"
        type="email"
        name="email"
        label={t('fields.email')}
        placeholder={t('fields.email_placeholder')}
        required
      />
      <LabeledTextarea
        sizeStyle="lg"
        name="message"
        label={t('fields.message')}
        placeholder={t('fields.message_placeholder')}
        rows={6}
        required
      />
      {!customSubmit && (
        <div className="fbox">
          <Button
            type="submit"
            text={t('submit')}
            disabled={state.submitting}
          />
        </div>
      )}
      {state.succeeded && (
        <p className="color-primary-lighter">
          {t('success_message')} <br />
        </p>
      )}
      {state.errors && (
        <p className="color-red">
          {t('error_message')}
          <small>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </small>
        </p>
      )}
    </form>
  );
});

export default ContactForm;
