import { Grid } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import MetricCard from "../../../shared/components/MetricCard";
import { kpiConfig } from "../utils/dataConfigs";

export default function AdminKPIGrid({ stats }) {
  const { width } = useViewportSize();
  const cards = kpiConfig(stats);

  const getSpan = () => {
    if (width >= 1100) return 3; // 4 per row
    if (width >= 800) return 4; // 3 per row
    if (width >= 500) return 6; // 2 per row
    return 12; // 1 per row
  };

  return (
    <Grid grow>
      {cards.map(
        ({ key, label, value, description, icon: IconComponent, color }) => (
          <Grid.Col key={key} span={getSpan()}>
            <MetricCard
              label={label}
              value={value}
              description={description}
              icon={<IconComponent size={24} color={color} />}
            />
          </Grid.Col>
        ),
      )}
    </Grid>
  );
}
