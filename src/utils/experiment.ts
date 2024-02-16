// Data seems to be a creation of a polymer based material and the outputs are the characteristics of that material.
export enum ExperimentOutputs {
  Viscosity = "Viscosity",
  CureTime = "Cure Time",
  Elongation = "Elongation",
  TensileStrength = "Tensile Strength",
  CompressionSet = "Compression Set",
}

export type ExperimentOutput = {
  [key: string]: number;
};

export type ExperimentInput = {
  [key: string]: number;
};

export type ExperimentData = {
  [key: string]: {
    inputs: ExperimentInput;
    outputs: ExperimentOutput;
  };
};
