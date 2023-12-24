import { Filter, MetricGroup, MetricsCustomFilters } from "./model";

export class MetricsController {
  async getMetricsByFilter(metrics: MetricsCustomFilters): Promise<MetricGroup[]> {
    const metricsFiltersMap: Map<string, string[]> = new Map();

    for (const metric in metrics) {
      const metricFilters = JSON.stringify(metrics[metric]);

      if (metricsFiltersMap.has(metricFilters)) {
        metricsFiltersMap.get(metricFilters)?.push(metric);
      } else {
        metricsFiltersMap.set(metricFilters, [metric]);
      }
    }

    const metricGroupResult: MetricGroup[] = Array.from(metricsFiltersMap.entries())
      .map(([key, value]) => {
        try {
          const parsedFilters: Filter[] = JSON.parse(key);
          return {
            metrics: value,
            filters: parsedFilters,
          };
        } catch (error) {
          console.error(`Error parsing JSON for key: ${key}`, error);
          return null;
        }
      })
      .filter((metricGroup): metricGroup is MetricGroup => metricGroup !== null);

    return metricGroupResult;
  }
}
