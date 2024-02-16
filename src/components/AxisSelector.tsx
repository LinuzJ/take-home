import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import "./AxisSelector.css";

type AxisSelectorProps = {
  outputProperties: string[];
  selectedOutputs?: { x?: string; y?: string };
  setSelectedOutputs: (i: { x?: string; y?: string }) => void;
};

function AxisSelector({
  outputProperties,
  selectedOutputs,
  setSelectedOutputs,
}: AxisSelectorProps) {
  const handleXAxisChange = (event: SelectChangeEvent<string>) => {
    setSelectedOutputs({
      ...selectedOutputs,
      x: event.target.value,
    });
  };

  const handleYAxisChange = (event: SelectChangeEvent<string>) => {
    setSelectedOutputs({
      ...selectedOutputs,
      y: event.target.value,
    });
  };

  return (
    <Box className="axisSelectorBox">
      <div className="axisSelectorBoxButton">
        <FormControl>
          <InputLabel>X Axis</InputLabel>
          <Select value={selectedOutputs?.x ?? ""} onChange={handleXAxisChange}>
            {outputProperties.map((property, index) => (
              <MenuItem key={index} value={property}>
                {property}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="axisSelectorGap" />
      <div className="axisSelectorBoxButton">
        <FormControl>
          <InputLabel>Y Axis</InputLabel>
          <Select
            value={selectedOutputs?.y ?? ""}
            onChange={handleYAxisChange}
            label="Y Axis"
          >
            {outputProperties.map((property, index) => (
              <MenuItem key={index} value={property}>
                {property}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}

export default AxisSelector;
