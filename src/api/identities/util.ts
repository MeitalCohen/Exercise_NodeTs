import { ArrayIdentity, Identity, SetIdentity, defaultMergedArrayIdentity } from "./model";

export class IdentifierUtils {
  private static mergeSets<T>(firstSet: Set<T>, secondSet: Set<T>): Set<T> {
    return new Set([...firstSet, ...secondSet]);
  }

  public static mergedIdentities(existingIdentity: SetIdentity, identity: SetIdentity): void {
    existingIdentity.account_id = this.mergeSets(existingIdentity.account_id, identity.account_id);
    existingIdentity.account_name = this.mergeSets(existingIdentity.account_name, identity.account_name);
    existingIdentity.deal_id = this.mergeSets(existingIdentity.deal_id, identity.deal_id);
    existingIdentity.email = this.mergeSets(existingIdentity.email, identity.email);
    existingIdentity.contact_id = this.mergeSets(existingIdentity.contact_id, identity.contact_id);
  }

  public static insertIdentity(existingIdentity: SetIdentity, identity: Identity): void {
    if (identity.account_id) {
      existingIdentity.account_id.add(identity.account_id);
    }

    if (identity.account_name) {
      existingIdentity.account_name.add(identity.account_name);
    }

    if (identity.deal_id) {
      existingIdentity.deal_id.add(identity.deal_id);
    }

    if (identity.contact_id) {
      existingIdentity.contact_id.add(identity.contact_id);
    }

    if (identity.email) {
      existingIdentity.email.add(identity.email);
    }
  }

  public static convertToMergeArrayIdentities(identity: SetIdentity): ArrayIdentity {
    const arrayIdentity: ArrayIdentity = defaultMergedArrayIdentity();
    for (const [key, value] of Object.entries(identity)) {
      (arrayIdentity[key as keyof ArrayIdentity] as (string | number)[]) = [...value];
    }

    return arrayIdentity;
  }

  public static convertToArrayIdentities(identity: Identity): SetIdentity {
    const mergedIdentity: SetIdentity = {
      account_name: new Set(),
      account_id: new Set(),
      deal_id: new Set(),
      email: new Set(),
      contact_id: new Set(),
    };

    for (const [key, value] of Object.entries(identity)) {
      const identityProperty = mergedIdentity[key as keyof SetIdentity];
      if (!value) {
        continue;
      }
      (identityProperty as Set<typeof value>).add(value);
    }

    return mergedIdentity;
  }

  public static haveCommonEntities(firstSetIdentity: SetIdentity, secondSetIdentity: SetIdentity): boolean {
    return (
      this.haveCommonElement(firstSetIdentity.account_name, secondSetIdentity.account_name) ||
      this.haveCommonElement(firstSetIdentity.account_id, secondSetIdentity.account_id) ||
      this.haveCommonElement(firstSetIdentity.contact_id, secondSetIdentity.contact_id) ||
      this.haveCommonElement(firstSetIdentity.deal_id, secondSetIdentity.deal_id) ||
      this.haveCommonEmailDomain(secondSetIdentity.email, firstSetIdentity.email)
    );
  }

  private static haveCommonEmailDomain(setEmails: Set<string>, secondSetEmails: Set<string>): boolean {
    return [...setEmails].some((email) => this.hasSameEmailDomain(email, secondSetEmails));
  }

  private static haveCommonElement<T>(firstSet: Set<T>, secondSet: Set<T>): boolean {
    for (const element of firstSet) {
      if (secondSet.has(element)) {
        return true;
      }
    }
    return false;
  }

  public static hasCommonEntity(identity: Identity, mergedIdentities: SetIdentity): boolean {
    return (
      this.haveCommonElement(new Set([identity.account_name]), mergedIdentities.account_name) ||
      this.haveCommonElement(new Set([identity.account_id]), mergedIdentities.account_id) ||
      this.haveCommonElement(new Set([identity.contact_id]), mergedIdentities.contact_id) ||
      this.haveCommonElement(new Set([identity.deal_id]), mergedIdentities.deal_id) ||
      this.haveCommonEmailDomain(new Set([identity.email]), mergedIdentities.email)
    );
  }

  private static hasSameEmailDomain(inputEmail: string, emails: Set<string>): boolean {
    const inputDomain: string = inputEmail.split("@")[1];
    return [...emails].some((email) => email.endsWith(`@${inputDomain}`));
  }
}
