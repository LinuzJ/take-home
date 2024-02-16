import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";
import { ExperimentData } from "../utils/experiment";
import InputPropertySelector from "./InputPropertySelector";
import "./RangeAndPropertySelector.css";

type RangeAndPropertySelectorProps = {
  outputProperty?: string;
  outputProperties: string[];
  setSelectedOutputProperty: (a: string) => void;
  rangeAvailable: [number, number];
  range: [number, number];
  setRange: (r: [number, number]) => void;
  experimentData: ExperimentData;
  setInputProperties: (inpProps: string[]) => void;
  inputPropertiesSelected: string[];
};

const minDistance = 0.1;

function valuetext(value: number) {
  return `${value}`;
}
function RangeAndPropertySelector({
  outputProperty,
  outputProperties,
  setSelectedOutputProperty,
  rangeAvailable,
  range,
  setRange,
  experimentData,
  setInputProperties,
  inputPropertiesSelected,
}: RangeAndPropertySelectorProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOutputProperty(event.target.value);
  };

  const handleRangeChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue) || newValue.length !== 2) {
      return;
    }

    const newRange = newValue as [number, number];

    if (newRange[1] - newRange[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newRange[0], rangeAvailable[1] - minDistance);
        setRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newRange[1], minDistance);
        setRange([clamped - minDistance, clamped]);
      }
    } else {
      setRange(newRange);
    }
  };

  return (
    <div className="inputHistogramSelector">
      <div className="outputHistogramPanel">
        <a className="selectorLabel">
          Select a Output property and a desired range
        </a>
        <FormControl>
          <InputLabel>Output Property</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={outputProperty ?? outputProperties[0]}
            label="Output Property"
            onChange={handleChange}
            size="medium"
          >
            {outputProperties.map((op) => {
              return (
                <MenuItem key={op} value={op}>
                  {op}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className="outputPropertyValueSlider">
          <p className="rangeSliderMinValue">{rangeAvailable[0]}</p>
          <Slider
            getAriaLabel={() => "Minimum distance shift"}
            min={rangeAvailable[0]}
            max={rangeAvailable[1]}
            value={range}
            onChange={handleRangeChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            sx={{
              width: "auto",
              height: "auto",
              maxWidth: "400px",
              maxHeight: "40px",
              minHeight: "20px",
              minWidth: "250px",
            }}
          />
          <p className="rangeSliderMinValue">{rangeAvailable[1]}</p>
        </div>
      </div>
      <div className="inputPropertyValueSelector">
        <a className="selectorLabel">
          Select all input properties you want to compare
        </a>
        <InputPropertySelector
          experimentData={experimentData}
          setInputProperties={setInputProperties}
          inputPropertiesSelected={inputPropertiesSelected}
        />
      </div>
    </div>
  );
}

export default RangeAndPropertySelector;
