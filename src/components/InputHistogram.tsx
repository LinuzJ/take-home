import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useEffect, useMemo, useState } from "react";
import { ExperimentData } from "../utils/experiment";
import RangeAndPropertySelector from "./RangeAndPropertySelector";
import "./InputHistogram.css";

type InputPlotProps = {
  experimentData: ExperimentData;
  properties: string[];
};

type InputPlotData = {
  [key: string]: number | string;
};

function getRangeForProperty(
  property: string,
  experimentData: ExperimentData
): [number, number] {
  const everyExperiment = Object.keys(experimentData);
  const valuesOfProperty = everyExperiment.map(
    (exp) => experimentData[exp].outputs[property]
  );
  return [Math.min(...valuesOfProperty), Math.max(...valuesOfProperty)];
}

/**
  This graph the user will be able to see which inputs produce the selected range of a certain output.
  The graph is a histogram with X axis having the different inputs. 
  Each input has a bar for every experiment with output property in the desired range.
 *  */
function InputHistogramPlot({ experimentData, properties }: InputPlotProps) {
  const [outputPropertySelected, setOutputPropertySelected] =
    useState<string>();
  const [range, setRange] = useState<[number, number]>([0, 100]);
  const [inputPropertiesSelected, setInputProperties] = useState<string[]>();
  const [showLegend, setShowLegend] = useState(false);

  const plotData = useMemo(() => {
    if (!outputPropertySelected) return;
    const experimentsWithinRange = Object.keys(experimentData).filter(
      (exp) =>
        experimentData[exp].outputs[outputPropertySelected] >= range[0] &&
        experimentData[exp].outputs[outputPropertySelected] <= range[1]
    );
    const relevantInputVariables = Object.keys(
      experimentData[Object.keys(experimentData)[0]].inputs
    ).filter((inpProp) => inputPropertiesSelected?.includes(inpProp));

    return relevantInputVariables
      ? relevantInputVariables.map((inp) => {
          let datapoint: InputPlotData = {
            inputProperty: inp,
          };
          experimentsWithinRange.forEach((experiment) => {
            const inputData = experimentData[experiment].inputs[inp];
            if (inputData != 0) {
              datapoint = {
                ...datapoint,
                [experiment]: experimentData[experiment].inputs[inp],
              };
            }
          });
          return datapoint;
        })
      : [];
  }, [outputPropertySelected, inputPropertiesSelected, range]);

  const availableRange: [number, number] = useMemo(() => {
    if (!outputPropertySelected) return [0, 100];

    return getRangeForProperty(outputPropertySelected, experimentData);
  }, [outputPropertySelected, experimentData]);

  useEffect(() => {
    setRange([availableRange[0], availableRange[1]]);
  }, availableRange);

  return (
    <Paper className="histogramPaper">
      <h3>Analyze input values based on desired output property range</h3>
      {experimentData && (
        <>
          <RangeAndPropertySelector
            outputProperty={outputPropertySelected}
            outputProperties={properties}
            setSelectedOutputProperty={setOutputPropertySelected}
            rangeAvailable={availableRange}
            range={range}
            setRange={setRange}
            experimentData={experimentData}
            setInputProperties={setInputProperties}
            inputPropertiesSelected={
              inputPropertiesSelected ? inputPropertiesSelected : []
            }
          />
          {plotData &&
          plotData.length > 0 &&
          inputPropertiesSelected &&
          outputPropertySelected ? (
            <div className="inputHistogramWrapper">
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
              <BarChart
                dataset={plotData}
                slotProps={{ legend: { hidden: !showLegend } }}
                series={Object.keys(experimentData)
                  .filter(
                    (exp) =>
                      experimentData[exp].outputs[outputPropertySelected] >=
                        range[0] &&
                      experimentData[exp].outputs[outputPropertySelected] <=
                        range[1]
                  )
                  .filter((dp) => dp != "inputProperty")
                  .map((exp) => {
                    return { dataKey: exp, label: exp };
                  })}
                xAxis={[
                  {
                    dataKey: "inputProperty",
                    scaleType: "band",
                  },
                ]}
                margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
              />
            </div>
          ) : (
            <h2>Select values to view plot</h2>
          )}
        </>
      )}
    </Paper>
  );
}

export default InputHistogramPlot;
