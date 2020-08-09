import React, { useState, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { VectorMap } from "react-jvectormap";
import MultiSelect from "react-multi-select-component";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Checkbox } from "semantic-ui-react";

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
    mapList: [
      { Country: "New_Zealand", CountryCode: "NZ" },
      { Country: "Cook_Islands", CountryCode: "CK" },
      { Country: "Niue", CountryCode: "NU" },
      { Country: "Pitcairn", CountryCode: "PN" },
      { Country: "Tokelau", CountryCode: "TK" },
      { Country: "Australia", CountryCode: "AU" },
      { Country: "Christmas_Island", CountryCode: "CX" },
      { Country: "Cocos_Islands", CountryCode: "CC" },
      { Country: "Heard_and_McDonald_Islands", CountryCode: "HM" },
      { Country: "Kiribati", CountryCode: "KI" },
      { Country: "Nauru", CountryCode: "NR" },
      { Country: "Norfolk_Island", CountryCode: "NF" },
      { Country: "Tuvalu", CountryCode: "TV" },
      { Country: "American_Samoa", CountryCode: "AS" },
      { Country: "Andorra", CountryCode: "AD" },
      { Country: "Austria", CountryCode: "AT" },
      { Country: "Belgium", CountryCode: "BE" },
      { Country: "Finland", CountryCode: "FI" },
      { Country: "France", CountryCode: "FR" },
      { Country: "French_Guiana", CountryCode: "GF" },
      { Country: "FrenchSouthernTerritories", CountryCode: "TF" },
      { Country: "Germany", CountryCode: "DE" },
      { Country: "Greece", CountryCode: "GR" },
      { Country: "Guadeloupe", CountryCode: "GP" },
      { Country: "Ireland", CountryCode: "IE" },
      { Country: "Italy", CountryCode: "IT" },
      { Country: "Luxembourg", CountryCode: "LU" },
      { Country: "Martinique", CountryCode: "MQ" },
      { Country: "Mayotte", CountryCode: "YT" },
      { Country: "Monaco", CountryCode: "MC" },
      { Country: "Netherlands", CountryCode: "NL" },
      { Country: "Portugal", CountryCode: "PT" },
      { Country: "Reunion", CountryCode: "RE" },
      { Country: "Samoa", CountryCode: "WS" },
      { Country: "SanMarino", CountryCode: "SM" },
      { Country: "Slovenia", CountryCode: "SI" },
      { Country: "Spain", CountryCode: "ES" },
      { Country: "Vatican_City_State", CountryCode: "VA" },
      { Country: "SouthGeorgiaandtheSouthSandwichIslands", CountryCode: "GS" },
      { Country: "United_Kingdom", CountryCode: "GB" },
      { Country: "Jersey", CountryCode: "JE" },
      { Country: "BritishIndianOceanTerritory", CountryCode: "IO" },
      { Country: "Guam", CountryCode: "GU" },
      { Country: "Marshall_Islands", CountryCode: "MH" },
      { Country: "Micronesia", CountryCode: "FM" },
      { Country: "Northern_Mariana_Islands", CountryCode: "MP" },
      { Country: "Palau", CountryCode: "PW" },
      { Country: "PuertoRico", CountryCode: "PR" },
      { Country: "Turks_and_Caicos_Islands", CountryCode: "TC" },
      { Country: "United_States", CountryCode: "US" },
      { Country: "UnitedStatesMinorOutlyingIslands", CountryCode: "UM" },
      { Country: "British_Virgin_Islands", CountryCode: "VG" },
      { Country: "US_Virgin_Islands", CountryCode: "VI" },
      { Country: "HongKong", CountryCode: "HK" },
      { Country: "Canada", CountryCode: "CA" },
      { Country: "Japan", CountryCode: "JP" },
      { Country: "Afghanistan", CountryCode: "AF" },
      { Country: "Albania", CountryCode: "AL" },
      { Country: "Algeria", CountryCode: "DZ" },
      { Country: "Anguilla", CountryCode: "AI" },
      { Country: "Antigua_and_Barbuda", CountryCode: "AG" },
      { Country: "Dominica", CountryCode: "DM" },
      { Country: "Grenada", CountryCode: "GD" },
      { Country: "Montserrat", CountryCode: "MS" },
      { Country: "Saint_Kitts", CountryCode: "KN" },
      { Country: "Saint_Lucia", CountryCode: "LC" },
      { Country: "Saint_Vincent_and_the_Grenadines", CountryCode: "VC" },
      { Country: "Argentina", CountryCode: "AR" },
      { Country: "Armenia", CountryCode: "AM" },
      { Country: "Aruba", CountryCode: "AW" },
      { Country: "Netherlands_Antilles", CountryCode: "AN" },
      { Country: "Azerbaijan", CountryCode: "AZ" },
      { Country: "Bahamas", CountryCode: "BS" },
      { Country: "Bahrain", CountryCode: "BH" },
      { Country: "Bangladesh", CountryCode: "BD" },
      { Country: "Barbados", CountryCode: "BB" },
      { Country: "Belarus", CountryCodeBarbados: "BY" },
      { Country: "Belize", CountryCode: "BZ" },
      { Country: "Benin", CountryCode: "BJ" },
      { Country: "Burkina_Faso", CountryCode: "BF" },
      { Country: "Guinea-Bissau", CountryCode: "GW" },
      { Country: "Ivory_Coast", CountryCode: "CI" },
      { Country: "Mali", CountryCode: "ML" },
      { Country: "Niger", CountryCode: "NE" },
      { Country: "Senegal", CountryCode: "SN" },
      { Country: "Togo", CountryCode: "TG" },
      { Country: "Bermuda", CountryCode: "BM" },
      { Country: "Bhutan", CountryCode: "BT" },
      { Country: "India", CountryCode: "IN" },
      { Country: "Bolivia", CountryCode: "BO" },
      { Country: "Botswana", CountryCode: "BW" },
      { Country: "Bouvet_Island", CountryCode: "BV" },
      { Country: "Norway", CountryCode: "NO" },
      { Country: "Svalbard_and_JanMayen_Islands", CountryCode: "SJ" },
      { Country: "Brazil", CountryCode: "BR" },
      { Country: "Brunei", CountryCode: "BN" },
      { Country: "Bulgaria", CountryCode: "BG" },
      { Country: "Burundi", CountryCode: "BI" },
      { Country: "Cambodia", CountryCode: "KH" },
      { Country: "Cameroon", CountryCode: "CM" },
      { Country: "Central_African_Republic", CountryCode: "CF" },
      { Country: "Chad", CountryCode: "TD" },
      { Country: "Democratic_Republic_of_the_Congo", CountryCode: "CG" },
      { Country: "Equatorial_Guinea", CountryCode: "GQ" },
      { Country: "Gabon", CountryCode: "GA" },
      { Country: "Cape_Verde", CountryCode: "CV" },
      { Country: "Cayman_Islands", CountryCode: "KY" },
      { Country: "Chile", CountryCode: "CL" },
      { Country: "China", CountryCode: "CN" },
      { Country: "Colombia", CountryCode: "CO" },
      { Country: "Comoros", CountryCode: "KM" },
      { Country: "Congo-Brazzaville", CountryCode: "CD" },
      { Country: "Costa_Rica", CountryCode: "CR" },
      { Country: "Croatia", CountryCode: "HR" },
      { Country: "Cuba", CountryCode: "CU" },
      { Country: "Cyprus", CountryCode: "CY" },
      { Country: "Czech_Republic", CountryCode: "CZ" },
      { Country: "Denmark", CountryCode: "DK" },
      { Country: "Faroe_Islands", CountryCode: "FO" },
      { Country: "Greenland", CountryCode: "GL" },
      { Country: "Djibouti", CountryCode: "DJ" },
      { Country: "Dominican_Republic", CountryCode: "DO" },
      { Country: "EastTimor", CountryCode: "TP" },
      { Country: "Indonesia", CountryCode: "ID" },
      { Country: "Ecuador", CountryCode: "EC" },
      { Country: "Egypt", CountryCode: "EG" },
      { Country: "ElSalvador", CountryCode: "SV" },
      { Country: "Eritrea", CountryCode: "ER" },
      { Country: "Ethiopia", CountryCode: "ET" },
      { Country: "Estonia", CountryCode: "EE" },
      { Country: "Falkland_Islands", CountryCode: "FK" },
      { Country: "Fiji", CountryCode: "FJ" },
      { Country: "French_Polynesia", CountryCode: "PF" },
      { Country: "New_Caledonia", CountryCode: "NC" },
      { Country: "Wallis_and_Futuna_Islands", CountryCode: "WF" },
      { Country: "Gambia", CountryCode: "GM" },
      { Country: "Georgia", CountryCode: "GE" },
      { Country: "Gibraltar", CountryCode: "GI" },
      { Country: "Guatemala", CountryCode: "GT" },
      { Country: "Guinea", CountryCode: "GN" },
      { Country: "Guyana", CountryCode: "GY" },
      { Country: "Haiti", CountryCode: "HT" },
      { Country: "Honduras", CountryCode: "HN" },
      { Country: "Hungary", CountryCode: "HU" },
      { Country: "Iceland", CountryCode: "IS" },
      { Country: "Iran", CountryCode: "IR" },
      { Country: "Iraq", CountryCode: "IQ" },
      { Country: "Israel", CountryCode: "IL" },
      { Country: "Jamaica", CountryCode: "JM" },
      { Country: "Jordan", CountryCode: "JO" },
      { Country: "Kazakhstan", CountryCode: "KZ" },
      { Country: "Kenya", CountryCode: "KE" },
      { Country: "North_Korea", CountryCode: "KP" },
      { Country: "South_Korea", CountryCode: "KR" },
      { Country: "Kuwait", CountryCode: "KW" },
      { Country: "Kyrgyzstan", CountryCode: "KG" },
      { Country: "Laos", CountryCode: "LA" },
      { Country: "Latvia", CountryCode: "LV" },
      { Country: "Lebanon", CountryCode: "LB" },
      { Country: "Lesotho", CountryCode: "LS" },
      { Country: "Liberia", CountryCode: "LR" },
      { Country: "Libya", CountryCode: "LY" },
      { Country: "Liechtenstein", CountryCode: "LI" },
      { Country: "Switzerland", CountryCode: "CH" },
      { Country: "Lithuania", CountryCode: "LT" },
      { Country: "Macau", CountryCode: "MO" },
      { Country: "Macedonia", CountryCode: "MK" },
      { Country: "Madagascar", CountryCode: "MG" },
      { Country: "Malawi", CountryCode: "MW" },
      { Country: "Malaysia", CountryCode: "MY" },
      { Country: "Maldives", CountryCode: "MV" },
      { Country: "Malta", CountryCode: "MT" },
      { Country: "Mauritania", CountryCode: "MR" },
      { Country: "Mauritius", CountryCode: "MU" },
      { Country: "Mexico", CountryCode: "MX" },
      { Country: "Moldova", CountryCode: "MD" },
      { Country: "Mongolia", CountryCode: "MN" },
      { Country: "Morocco", CountryCode: "MA" },
      { Country: "Western_Sahara", CountryCode: "EH" },
      { Country: "Mozambique", CountryCode: "MZ" },
      { Country: "Myanmar", CountryCode: "MM" },
      { Country: "Namibia", CountryCode: "NA" },
      { Country: "Nepal", CountryCode: "NP" },
      { Country: "Nicaragua", CountryCode: "NI" },
      { Country: "Nigeria", CountryCode: "NG" },
      { Country: "Oman", CountryCode: "OM" },
      { Country: "Pakistan", CountryCode: "PK" },
      { Country: "Panama", CountryCode: "PA" },
      { Country: "Papua_New_Guinea", CountryCode: "PG" },
      { Country: "Paraguay", CountryCode: "PY" },
      { Country: "Peru", CountryCode: "PE" },
      { Country: "Philippines", CountryCode: "PH" },
      { Country: "Poland", CountryCode: "PL" },
      { Country: "Qatar", CountryCode: "QA" },
      { Country: "Romania", CountryCode: "RO" },
      { Country: "Russia", CountryCode: "RU" },
      { Country: "Rwanda", CountryCode: "RW" },
      { Country: "Sao_Tome_and_Principe", CountryCode: "ST" },
      { Country: "Saudi_Arabia", CountryCode: "SA" },
      { Country: "Seychelles", CountryCode: "SC" },
      { Country: "Sierra_Leone", CountryCode: "SL" },
      { Country: "Singapore", CountryCode: "SG" },
      { Country: "Slovakia", CountryCode: "SK" },
      { Country: "Solomon_Islands", CountryCode: "SB" },
      { Country: "Somalia", CountryCode: "SO" },
      { Country: "South_Africa", CountryCode: "ZA" },
      { Country: "Sri_Lanka", CountryCode: "LK" },
      { Country: "Sudan", CountryCode: "SD" },
      { Country: "Suriname", CountryCode: "SR" },
      { Country: "Swaziland", CountryCode: "SZ" },
      { Country: "Sweden", CountryCode: "SE" },
      { Country: "Syria", CountryCode: "SY" },
      { Country: "Taiwan", CountryCode: "TW" },
      { Country: "Tajikistan", CountryCode: "TJ" },
      { Country: "Tanzania", CountryCode: "TZ" },
      { Country: "Thailand", CountryCode: "TH" },
      { Country: "Tonga", CountryCode: "TO" },
      { Country: "Trinidad_and_Tobago", CountryCode: "TT" },
      { Country: "Tunisia", CountryCode: "TN" },
      { Country: "Turkey", CountryCode: "TR" },
      { Country: "Turkmenistan", CountryCode: "TM" },
      { Country: "Uganda", CountryCode: "UG" },
      { Country: "Ukraine", CountryCode: "UA" },
      { Country: "United_Arab_Emirates", CountryCode: "AE" },
      { Country: "Uruguay", CountryCode: "UY" },
      { Country: "Uzbekistan", CountryCode: "UZ" },
      { Country: "Vanuatu", CountryCode: "VU" },
      { Country: "Venezuela", CountryCode: "VE" },
      { Country: "Vietnam", CountryCode: "VN" },
      { Country: "Yemen", CountryCode: "YE" },
      { Country: "Zambia", CountryCode: "ZM" },
      { Country: "Zimbabwe", CountryCode: "ZW" },
      { Country: "Aland_Islands", CountryCode: "AX" },
      { Country: "Angola", CountryCode: "AO" },
      { Country: "Antarctica", CountryCode: "AQ" },
      { Country: "Bosnia_and_Herzegovina", CountryCode: "BA" },
      { Country: "Congo", CountryCode: "CD" },
      { Country: "Ghana", CountryCode: "GH" },
      { Country: "Guernsey", CountryCode: "GG" },
      { Country: "Isle_of_Man", CountryCode: "IM" },
      { Country: "Laos", CountryCode: "LA" },
      { Country: "Macao", CountryCode: "MO" },
      { Country: "Montenegro", CountryCode: "ME" },
      { Country: "Palestinian", CountryCode: "PS" },
      { Country: "Saint_Barthelemy", CountryCode: "BL" },
      { Country: "Saint_Helena", CountryCode: "SH" },
      { Country: "Saint_Martin", CountryCode: "MF" },
      { Country: "Saint_Pierre_and_Miquelon", CountryCode: "PM" },
      { Country: "Serbia", CountryCode: "RS" },
      { Country: "European_Union", CountryCode: "EU" },
    ],
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/requests/getCountries/")
      .then((res) => {
        const countries = res.data;
        const countriesNamesArray = res.data;
        console.log(res.data);
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
    console.log(countryCode);
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
      data,
      mapList,
      titleSet,
      checked,
      tableData,
    } = this.state;

    const handleClickGo = () => {
      var i;
      for (i = 0; i < checked.length; i++) {
        namesToSend[0] = countries[checked[i]];
      }
      console.log(namesToSend[0]);
      axios
        .get("http://localhost:5000/requests/" + namesToSend[0])
        .then((res) => {
          console.log(res.data[0]);
          console.log(res.data[0].VisaFree);

          const tableData = mappings(res.data[0].VisaFree);
          highlightMap(tableData);
          this.setState({ tableData });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const mappings = (countries) => {
      var res = [];
      for (var j = 0; j < countries.length; j++) {
        console.log(countries);
        for (var i = 0; i < mapList.length; i++) {
          if (countries[j].country.localeCompare(mapList[i].Country) == 0) {
            res.push({ country: getName(mapList[i].CountryCode) });
          }
        }
      }
      return res;
    };

    const highlightMap = (toHighlight) => {
      console.log(toHighlight.length);
      for (var i = 0; i < toHighlight.length - 1; i++) {
        console.log(toHighlight[i].country);
        var cCode = getCode(toHighlight[i].country);
        console.log(toHighlight[i].country + " = " + cCode);
        data[cCode] = 100000;
      }
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
            <td key={tableData[i].country}>{tableData[i].country}</td>
            <td key={tableData[i].conversion}>{tableData[i].conversion}</td>
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
