
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
    <div className="w-full max-w-md">
      <RegisterFormLayout
        isSubmitting={isSubmitting}
        serverError={serverError}
        onSubmit={onSubmit}
      >
        <Form {...form}>
          <div className="space-y-4">
            <AccountFields form={form} />
            <PersonalInfoFields form={form} />
            <RoleAndSpecialtyFields form={form} showSpecialty={showSpecialty} />
            <SchoolField form={form} />
          </div>
        </Form>
      </RegisterFormLayout>
    </div>
  );
};

export default RegisterForm;
