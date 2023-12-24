import { MetricsController } from "./controller";
import { MetricGroup, MetricsCustomFilters } from "./model";

export class MetricsApi {
  private static controller: MetricsController;

  public static initRoutes(app: any): void {
    MetricsApi.controller = new MetricsController();
    app.post("/metrics", MetricsApi.getMetricsSortedByFilters);
  }

  private static async getMetricsSortedByFilters(
    req: any,
    res: any
  ): Promise<void> {
    try {
      const metricsCustomFilters: MetricsCustomFilters =
        req.body.metricsCustomFilters;

      const metricGroupResult: MetricGroup[] =
        await MetricsApi.controller.getMetricsByFilter(metricsCustomFilters);

      res.status(200).send(metricGroupResult);
    } catch (error) {
      res.status(500).send([]);
    }
  }
}
