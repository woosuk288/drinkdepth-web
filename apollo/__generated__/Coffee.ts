/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CoffeeInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: Coffee
// ====================================================

export interface Coffee_coffee_coffee {
  __typename: "CoffeeClient";
  id: string;
  name: string;
  image_url: string;
  description: string;
  tags: string[];
  taste_body: string | null;
  taste_sweet: string | null;
  taste_bitter: string | null;
  taste_sour: string | null;
  type: string | null;
  roasting: string | null;
  roasting_date: any | null;
  process: string | null;
  company_id: string;
  uid: string | null;
}

export interface Coffee_coffee {
  __typename: "CoffeeOutput";
  ok: boolean;
  error: string | null;
  coffee: Coffee_coffee_coffee | null;
}

export interface Coffee {
  coffee: Coffee_coffee;
}

export interface CoffeeVariables {
  input: CoffeeInput;
}
