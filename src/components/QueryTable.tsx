import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import "./QueryTable.css";
import { ExperimentData } from "../utils/experiment";
import { Divider } from "@mui/material";

type QueryTableProps = {
  experimentData: ExperimentData;
  outputProperties: string[];
  inputProperties: string[];
};

type FlattenedExperimentDataType = {
  [key: string]: string | number;
};

function QueryTable({
  experimentData,
  outputProperties,
  inputProperties,
}: QueryTableProps) {
  const flattenedExperimentData: FlattenedExperimentDataType[] = Object.keys(
    experimentData
  ).map((exp) => {
    return {
      experiment: exp,
      ...experimentData[exp].inputs,
      ...experimentData[exp].outputs,
    };
  });
  const [rows, setRows] = useState(flattenedExperimentData);
  const [searched, setSearched] = useState<string>("");

  const requestSearch = (searchedVal: string) => {
    const filteredRows = flattenedExperimentData.filter((row) => {
      return row.experiment
        .toString()
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <Paper className="tablePaper">
      <h3>Search for experiments</h3>
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        className="searchBar"
      />
      <Paper className="onlyTable">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={inputProperties.length}
                  align="center"
                  color="green"
                >
                  <a>Inputs</a>
                </TableCell>
                <TableCell colSpan={outputProperties.length} align="center">
                  <a>Outputs</a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Experiment</TableCell>
                {inputProperties.map((inpProp) => {
                  return <TableCell>{inpProp}</TableCell>;
                })}
                {outputProperties.map((outProp) => {
                  return <TableCell>{outProp}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.experiment}>
                  <>
                    <TableCell component="th" scope="row">
                      {row.experiment}
                    </TableCell>
                    {inputProperties.map((inpProp) => {
                      return (
                        <TableCell align="right">{row[inpProp]}</TableCell>
                      );
                    })}
                    {outputProperties.map((outProp) => {
                      return (
                        <TableCell align="right">{row[outProp]}</TableCell>
                      );
                    })}
                  </>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  );
}

export default QueryTable;
