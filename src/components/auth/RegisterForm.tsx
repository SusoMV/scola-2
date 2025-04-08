
import React from 'react';
import { Form } from '@/components/ui/form';
import RegisterFormLayout from './register/RegisterFormLayout';
import AccountFields from './register/AccountFields';
import PersonalInfoFields from './register/PersonalInfoFields';
import RoleAndSpecialtyFields from './register/RoleAndSpecialtyFields';
import SchoolField from './register/SchoolField';
import { useRegisterForm } from './register/useRegisterForm';

const RegisterForm = () => {
  const { form, isSubmitting, serverError, showSpecialty, onSubmit } = useRegisterForm();

  return (
    <RegisterFormLayout
      isSubmitting={isSubmitting}
      serverError={serverError}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <AccountFields form={form} />
            <PersonalInfoFields form={form} />
          </div>
          <div className="space-y-4">
            <RoleAndSpecialtyFields form={form} showSpecialty={showSpecialty} />
            <SchoolField form={form} />
          </div>
        </div>
      </Form>
    </RegisterFormLayout>
  );
};

export default RegisterForm;
