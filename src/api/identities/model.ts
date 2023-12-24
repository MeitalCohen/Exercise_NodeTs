export type MergedIdentity = {
  account_name: string[];
  account_id: number[];
  deal_id: number[];
  email: string[];
  contact_id: number[];
};

export type SetIdentity = {
  [K in keyof Identity]: Identity[K] extends (infer U)[] ? Set<Exclude<U, null>> : Set<Exclude<Identity[K], null>>;
};

export type ArrayIdentity = {
  [K in keyof Identity]: Identity[K] extends (infer U)[] ? Array<Exclude<U, null>> : Array<Exclude<Identity[K], null>>;
};

export const defaultMergedArrayIdentity = (): ArrayIdentity => ({
  account_name: [],
  account_id: [],
  deal_id: [],
  email: [],
  contact_id: [],
});

export const defaultMergedSetIdentity = (): SetIdentity => ({
  account_name: new Set(),
  account_id: new Set(),
  deal_id: new Set(),
  email: new Set(),
  contact_id: new Set(),
});

export type Identity = {
  account_name: string | null;
  account_id: number | null;
  deal_id: number | null;
  email: string;
  contact_id: number | null;
};

export type identitiesKeys = keyof Identity;
