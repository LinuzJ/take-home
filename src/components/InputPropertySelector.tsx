import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Chip } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { ExperimentData } from "../utils/experiment";
import "./InputPropertySelector.css";

interface InputPropertySelectorProps {
  experimentData: ExperimentData;
  inputPropertiesSelected: string[];
  setInputProperties: (inpProps: string[]) => void;
}

function InputPropertySelector({
  experimentData,
  setInputProperties,
}: InputPropertySelectorProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectChange = (
    event: SelectChangeEvent<typeof selectedValues>
  ) => {
    setSelectedValues(event.target.value as string[]);
    setInputProperties(event.target.value as string[]);
  };

  return (
    <>
      <FormControl className="selectContainer">
        <InputLabel className="selectLabel">
          Select Input Properties To Display
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedValues}
          onChange={handleSelectChange}
          renderValue={(selected) => (
            <div className="selectedChips">
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </div>
          )}
        >
          {Object.keys(
            experimentData[Object.keys(experimentData)[0]].inputs
          ).map((inpProp) => (
            <MenuItem key={inpProp} value={inpProp}>
              {inpProp}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default InputPropertySelector;
