import { Paper, Title, Text, Group, Stack } from "@mantine/core";
import { DonutChart } from "@mantine/charts";

export default function ChartCard({
  title,
  data = [],
  height = 200,
  thickness = 30,
  strokeColor,
}) {
  return (
    <Paper padding="md" shadow="sm">
      <Stack align="center" style={{ width: "100%" }}>
        <Title order={5}>{title}</Title>

        <DonutChart
          data={data}
          h={height}
          thickness={thickness}
          withTooltip
          tooltipDataSource="segment"
          labelsType="value"
          strokeColor={strokeColor}
        />

        <Group justify="center" gap="lg" wrap>
          {data.map(({ name, color }) => (
            <Group key={name} gap="xs">
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: color,
                }}
              />
              <Text size="sm">{name}</Text>
            </Group>
          ))}
        </Group>
      </Stack>
    </Paper>
  );
}
