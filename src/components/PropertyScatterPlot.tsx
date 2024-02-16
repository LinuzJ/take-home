import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import { ScatterChart } from "@mui/x-charts";
import { useMemo, useState } from "react";
import { ExperimentData } from "../utils/experiment";
import AxisSelector from "./AxisSelector";
import "./PropertyScatterPlot.css";

type PropertyScatterPlotProps = {
  experimentData: ExperimentData;
  properties: string[];
};
type PropertyScatterPlotData = {
  id: string;
  x: number;
  y: number;
};

/**
  For this graph, the user should be able to choose two output properties, and compare their relationship in different experiments.
  The scatter-chart is chosen to easily display correlations and relationships between certain experiment groups.
  *  */
function PropertyScatterPlot({
  experimentData,
  properties,
}: PropertyScatterPlotProps) {
  const [selectedOutputs, setSelectedOutputs] = useState<{
    x?: string;
    y?: string;
  }>({});
  const [showLegend, setShowLegend] = useState(false);

  // use useMemo to save one recompute when changing legend
  const scatterData: PropertyScatterPlotData[] | undefined = useMemo(() => {
    const { x, y } = selectedOutputs;
    if (x && y && experimentData) {
      const labels = Object.keys(experimentData);
      return labels.flatMap((experimentLabel) => {
        return {
          id: experimentLabel,
          x: experimentData[experimentLabel].outputs[x],
          y: experimentData[experimentLabel].outputs[y],
        };
      });
    }
  }, [selectedOutputs]);

  return (
    <Paper className="scatterPlotPaper">
      <h3>Compare outputs for different experiments</h3>
      <div className="scatterPlotCol">
        <div className="scatterPlotRowButtons">
          <a>Select two output properties to compare</a>
          <AxisSelector
            outputProperties={properties}
            selectedOutputs={selectedOutputs}
            setSelectedOutputs={setSelectedOutputs}
          />
        </div>
        <div className="scatterPlotWrapper">
          {scatterData ? (
            <>
              <FormControlLabel
                checked={showLegend}
                control={
                  <Checkbox
                    onChange={(event) => setShowLegend(event.target.checked)}
                  />
                }
                label="Show legend"
                labelPlacement="end"
              />
              <ScatterChart
                slotProps={{ legend: { hidden: !showLegend } }}
                series={scatterData.map((scp) => {
                  return {
                    type: "scatter",
                    label: scp.id,
                    data: [
                      {
                        id: scp.id,
                        x: scp.x,
                        y: scp.y,
                      },
                    ],
                  };
                })}
              />
            </>
          ) : (
            <h2>Select values to view plot</h2>
          )}
        </div>
      </div>
    </Paper>
  );
}

export default PropertyScatterPlot;
