export type FilterData = {
  fieldIndex: number;
  variant: number;
  selectedOptions: string[];
};

export type Filter = {
  kind: string;
  data: FilterData;
};

export type MetricsCustomFilters = {
  [metric: string]: Filter[];
};

export type MetricGroup = {
  metrics: string[];
  filters: Filter[];
};
