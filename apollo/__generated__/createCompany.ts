/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCompanyInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCompany
// ====================================================

export interface createCompany_createCompany_company {
  __typename: "Company";
  id: string;
}

export interface createCompany_createCompany {
  __typename: "CompanyOutput";
  ok: boolean;
  error: string | null;
  company: createCompany_createCompany_company | null;
  role: UserRole | null;
}

export interface createCompany {
  createCompany: createCompany_createCompany;
}

export interface createCompanyVariables {
  input: CreateCompanyInput;
}
