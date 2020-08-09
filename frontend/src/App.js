import React, { useState, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { VectorMap } from "react-jvectormap";
import MultiSelect from "react-multi-select-component";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Checkbox } from "semantic-ui-react";
import Table from "./Table.js";

import axios from "axios";

const { getName } = require("country-list");
const { getCode } = require("country-list");

class Map extends React.Component {
  state = {
    countriesCodesArray: [],
    countriesNamesArray: [],
    columnHeader: ["Country", "Conversion"],
    countries: [],
    tableData: [],
    data: {},
    title: "",
    titleSet: false,
    color: "#48aeef",
    checked: [],
    namesToSend: [],
    selectedOptions: [],
    options: [
      { label: "Canada", value: "CA" },
      { label: "India", value: "IN" },
      { label: "Watermelon 🍉", value: "watermelon" },
      { label: "Pear 🍐", value: "pear" },
      { label: "Apple 🍎", value: "apple" },
      { label: "Tangerine 🍊", value: "tangerine" },
      { label: "Pineapple 🍍", value: "pineapple" },
      { label: "Peach 🍑", value: "peach" },
    ],
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/requests/getCountries/")
      .then((res) => {
        const countries = res.data.countries;
        const countriesNamesArray = res.data.countries;
        console.log(res.data.countries);
        console.log(res);
        this.setState({ countries });
        this.setState({ countriesNamesArray });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClick1 = (e, countryCode) => {
    const { countriesCodesArray } = this.state;
    // console.log(countryCode);
    if (countriesCodesArray.indexOf(countryCode) === -1) {
      this.setState(
        {
          countriesCodesArray: [...countriesCodesArray, countryCode],
        },
        () => this.getCountriesNamesList()
      );
    }
  };

  handleColorChange = (color) => {
    console.log(color.hex);
    this.setState({ color: color.hex });
  };
  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleFormSubmit = () => {
    this.setState({
      titleSet: true,
    });
  };

  getCountriesNamesList = () => {
    const { countriesCodesArray } = this.state;
    const list = countriesCodesArray.map((code) => getName(code));
    this.setState(
      {
        countriesNamesArray: list,
      },
      () => this.makeMapDataStructure()
    );
  };

  makeMapDataStructure = () => {
    const { countriesCodesArray } = this.state;
    let obj = {};
    //{CN: 5, MX: 5, TX: 5}
    countriesCodesArray.forEach((countryCode) => (obj[countryCode] = 5));
    this.setState({
      data: obj,
    });
  };

  onChange = (selectedOptions) => {
    console.log("hi" + JSON.stringify(selectedOptions));
    this.setState({ selectedOptions: selectedOptions });
    document.getElementById("field_name").innerHTML = "hi";
    this.console.log("bye");
  };

  render() {
    const {
      selectedItems,
      options,
      countriesCodesArray,
      countriesNamesArray,
      columnHeader,
      countries,
      namesToSend,
      color,
      titleSet,
      checked,
      tableData,
    } = this.state;

    const handleClickGo = () => {
      var i;
      for (i = 0; i < checked.length; i++) {
        namesToSend[i] = countries[checked[i]];
      }
      console.log(namesToSend);
      axios
        .post("http://localhost:5000/requests/getCountryInfo/", { namesToSend })
        .then((res) => {
          const tableData = res.data.countries;
          this.setState({ tableData });

          console.log(getCode(tableData[0][0].country));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const { getName } = require("country-list");

    const onRadioChange = (e) => {
      // current array of options
      const checked = this.state.checked;
      let index;

      // check if the check box is checked or unchecked
      if (e.target.checked) {
        // add the numerical value of the checkbox to options array
        checked.push(+e.target.value);
      } else {
        // or remove the value from the unchecked checkbox from the array
        index = checked.indexOf(+e.target.value);
        checked.splice(index, 1);
      }

      // update the state with the new array of options
      this.setState({ checked: checked });
      console.log(checked);
    };

    const generateHeader = () => {
      let row = [];
      for (var i = 0; i < columnHeader.length; i++) {
        row.push(<th id={columnHeader[i]}>{columnHeader[i]}</th>);
      }
      return row;
    };

    const generateTableData = () => {
      let rows = [];
      for (var i = 0; i < tableData.length; i++) {
        rows.push(
          <tr key={i}>
            <td key={tableData[i][0].country}>{tableData[i][0].country}</td>
            <td key={tableData[i][0].conversion}>
              {tableData[i][0].conversion}
            </td>
          </tr>
        );
      }
      return rows;
    };

    return (
      <div>
        <div class="center">
          <h1>Visa free travel</h1>
        </div>
        <table className="floatingTable">
          <thread>
            <tr>{generateHeader()}</tr>
          </thread>
          <tbody>{generateTableData()}</tbody>
        </table>
        <div id="whatIsSelected"></div>
        {/* <MultiSelect
          selectedOptions={selectedItems}
          options={options}
          onChange={this.onChange}
        /> */}
        {this.state.countries.map((countries, i) => {
          return (
            <label key={countries[this.props.id]}>
              <input
                type="checkbox"
                value={i}
                onChange={onRadioChange.bind(this)}
              />
              {countries}
            </label>
          );
        })}

        <button onClick={handleClickGo}>GO</button>

        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent" //change it to ocean blue: #0077be
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "520px",
          }}
          //onRegionClick={this.handleClick1} //gets the country code
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0,
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer",
            },
            selected: {
              fill: "#2525", //color for the clicked country
            },
            selectedHover: {},
          }}
          regionsSelectable={true}
          series={{
            regions: [
              {
                values: this.state.data, //this is your data
                scale: ["#146804", "#ff0000"], //your color game's here
                normalizeFunction: "polynomial",
              },
            ],
          }}
        />
      </div>
    );
  }
}
export default Map;
