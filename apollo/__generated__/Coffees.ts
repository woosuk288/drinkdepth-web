/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Coffees
// ====================================================

export interface Coffees_coffees_coffees {
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
  company_id: string | null;
  uid: string | null;
}

export interface Coffees_coffees {
  __typename: "CoffeesOutput";
  ok: boolean;
  coffees: Coffees_coffees_coffees[] | null;
}

export interface Coffees {
  coffees: Coffees_coffees;
}
