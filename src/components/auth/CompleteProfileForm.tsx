
import React from 'react';
import CompleteProfileFormLayout from './complete-profile/CompleteProfileFormLayout';
import FullNameField from './complete-profile/FullNameField';
import SchoolField from './complete-profile/SchoolField';
import RoleField from './complete-profile/RoleField';
import SpecializationField from './complete-profile/SpecializationField';
import { useCompleteProfileForm } from './complete-profile/useCompleteProfileForm';

const CompleteProfileForm = () => {
  const { form, isSubmitting, searchQuery, setSearchQuery, onSubmit } = useCompleteProfileForm();

  return (
    <CompleteProfileFormLayout
      form={form}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
    >
      <FullNameField form={form} />
      <SchoolField form={form} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <RoleField form={form} />
      <SpecializationField form={form} />
    </CompleteProfileFormLayout>
  );
};

export default CompleteProfileForm;
