import { IdentitiesController } from "./controller";
import { ArrayIdentity, Identity } from "./model";

export class IdentitiesApi {
  private static controller: IdentitiesController;

  public static initRoutes(app: any): void {
    IdentitiesApi.controller = new IdentitiesController();
    app.post("/mergeIdentities", IdentitiesApi.mergeIndentities);
  }

  private static async mergeIndentities(req: any, res: any): Promise<void> {
    try {
      const identitiesArray: Identity[] = req.body;

      const mergedIndentities: ArrayIdentity[] = await IdentitiesApi.controller.mergeIdentities(identitiesArray);

      res.status(200).send(mergedIndentities);
    } catch (error) {
      console.error("Error processing request:", error);

      res.status(500).send([]);
    }
  }
}
