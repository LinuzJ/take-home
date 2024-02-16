import { useEffect, useState } from "react";
import "./index.css";
import PropertyScatterPlot from "./components/PropertyScatterPlot";
import { ExperimentData } from "./utils/experiment";
import InputHistogramPlot from "./components/InputHistogram";
import QueryTable from "./components/QueryTable";

function App() {
  const [experimentData, setExperimentData] = useState<
    ExperimentData | undefined
  >();

  const getData = async () => {
    try {
      const response = await fetch("uncountable_front_end_dataset.json");
      const jsonData = await response.json();
      setExperimentData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const outputProperties = Object.keys(
    Object.values(experimentData ?? {})?.[0]?.outputs ?? {}
  );

  const inputProperties = Object.keys(
    Object.values(experimentData ?? {})?.[0]?.inputs ?? {}
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2>Uncountable take-home</h2>
      {experimentData && (
        <>
          <PropertyScatterPlot
            experimentData={experimentData}
            properties={outputProperties}
          />
          <InputHistogramPlot
            experimentData={experimentData}
            properties={outputProperties}
          />
          <QueryTable
            experimentData={experimentData}
            outputProperties={outputProperties}
            inputProperties={inputProperties}
          />
        </>
      )}
    </div>
  );
}

export default App;
