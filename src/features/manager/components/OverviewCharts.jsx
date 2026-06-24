import { Grid } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import ChartCard from "../../../shared/components/ChartCard";
import { chartConfig } from "../utils/dataConfigs";

export default function OverviewCharts({ stats }) {
  const { width } = useViewportSize();
  const charts = chartConfig(stats);

  const getSpan = () => {
    if (width >= 1300) return 3; // 4 per row
    if (width >= 1000) return 4; // 3 per row
    if (width >= 600) return 6; // 2 per row
    return 12; // 1 per row
  };

  return (
    <Grid grow>
      {charts.map(({ key, title, data }) => (
        <Grid.Col key={key} span={getSpan()}>
          <ChartCard title={title} data={data} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
