import React, { useState, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { VectorMap } from "react-jvectormap";
import MultiSelect from "react-multi-select-component";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

import axios from "axios";

const { getName } = require("country-list");

class Map extends React.Component {
  state = {
    countriesCodesArray: [],
    countriesNamesArray: [],
    countries: [],
    data: {},
    title: "",
    titleSet: false,
    color: "#48aeef",
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
        const countries = res;
        console.log(res);
        this.setState({ countries });
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
      color,
      titleSet,
    } = this.state;

    const handleClickGo = () => {
      async function refreshMap() {
        //console.log(getMapObject().selected);
      }
      refreshMap();
    };

    const { getName } = require("country-list");

    return (
      <div>
        <div class="center">
          <h1>Visa free travel</h1>
        </div>
        <table class="floatingTable">
          <tr>
            <th>Country</th>
            <th>Conversion</th>
          </tr>
        </table>
        <div id="whatIsSelected"></div>
        {/* <MultiSelect
          selectedOptions={selectedItems}
          options={options}
          onChange={this.onChange}
        /> */}
        <button onClick={handleClickGo}>GO</button>

        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent" //change it to ocean blue: #0077be
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "520px",
          }}
          onRegionClick={this.handleClick1} //gets the country code
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
