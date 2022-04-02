/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Company
// ====================================================

export interface Company_company_company {
  __typename: "Company";
  id: string;
  /**
   * 사업자등록번호
   */
  business_number: string;
  /**
   * 회사이름
   */
  company_name: string;
  /**
   * 대표자성명
   */
  president_name: string;
  /**
   * 개업일자
   */
  opening_date: string;
  /**
   * 전화번호(회사)
   */
  telephone: string;
  uid: string;
}

export interface Company_company {
  __typename: "CompanyOutput";
  ok: boolean;
  error: string | null;
  company: Company_company_company | null;
}

export interface Company {
  company: Company_company;
}
