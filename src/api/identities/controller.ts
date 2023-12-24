import * as model from "./model";
import { IdentifierUtils } from "./util";

export class IdentitiesController {
  async mergeIdentities(identities: model.Identity[]): Promise<model.ArrayIdentity[]> {
    const mergedIdentitiesTemp: model.SetIdentity[] = [];
    const mergedIdentitiesResult: model.SetIdentity[] = [];

    identities.forEach((identity: model.Identity) => {
      const existingIdentity: model.SetIdentity | undefined = mergedIdentitiesTemp.find((mergedIdentity) =>
        IdentifierUtils.hasCommonEntity(identity, mergedIdentity)
      );
      if (existingIdentity) {
        IdentifierUtils.insertIdentity(existingIdentity, identity);
      } else {
        const mergedIdentity: model.SetIdentity = IdentifierUtils.convertToArrayIdentities(identity);
        mergedIdentitiesTemp.push(mergedIdentity);
      }
    });

    //make sure every identity is merged
    mergedIdentitiesTemp.forEach((identity: model.SetIdentity) => {
      const existingMerged: model.SetIdentity | undefined = mergedIdentitiesResult.find(
        (mergedIdentity: model.SetIdentity) => IdentifierUtils.haveCommonEntities(identity, mergedIdentity)
      );
      if (existingMerged) {
        IdentifierUtils.mergedIdentities(existingMerged, identity);
      } else {
        mergedIdentitiesResult.push(identity);
      }
    });

    return mergedIdentitiesResult.map((identity: model.SetIdentity) =>
      IdentifierUtils.convertToMergeArrayIdentities(identity)
    );
  }
}
