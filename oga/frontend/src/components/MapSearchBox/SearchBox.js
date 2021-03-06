/**
 * Searchbox component for App bar
 */
import React, { Component } from "react";

// Material UI imports
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";

// Import React Scrit Library to load Google object
import Script from "react-load-script";
import API_KEY from "../../const/api_key.js";

class SearchBox extends Component {
    // Define Constructor
    constructor(props) {
        super(props);

        // Declare State
        this.state = {
            city: "",
            query: ""
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll, true);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        // Close dropdown list on scroll
        var click = document.getElementById("autocomplete");
        click.blur();
    };

    handleScriptLoad = () => {
        // Declare Options For Autocomplete

        // Initialize Google Autocomplete
        /*global google*/ // To disable any eslint 'google not defined' errors
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete")
            //options,
        );

        // Avoid paying for data that you don't need by restricting the set of
        // place fields that are returned to just the address components and formatted
        // address.
        //this.autocomplete.setFields(['address_components', 'formatted_address']);

        // Fire Event when a suggested name is selected
        this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
    };

    handlePlaceSelect = () => {
        // Extract City From Address Object
        const addressObject = this.autocomplete.getPlace();
        const address = addressObject.address_components;

        // Check if address is valid
        if (address) {
            // Set State
            this.setState({
                city: address[0].long_name,
                query: addressObject.formatted_address
            });
        }
    };

    onClearSearchBox = () => {
        // Clear text field value in search box
        var autocomplete = document.getElementById("autocomplete");
        if (autocomplete) {
            autocomplete.value = "";
        }
    };

    render() {
        var url_str =
            "https://maps.googleapis.com/maps/api/js?" +
            "key=" +
            API_KEY +
            "&libraries=places";
        return (
            <div align="right" justify="flex-end">
                <TextField
                    position="relative"
                    className="MapSearchBox"
                    id="autocomplete"
                    type="input"
                    variant="outlined"
                    placeholder="Search for a location"
                    inputProps={{
                        // Remove textfield border padding
                        style: {
                            padding: 10
                        }
                    }}
                    InputProps={{
                        style: {
                            width: "180%",
                            backgroundColor: "#fff",
                            height: 40,
                            marginLeft: "20%",
                            marginRight: "80%"
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    id="clear-search-button"
                                    onClick={() => this.onClearSearchBox()}
                                >
                                    <Close />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Script url={url_str} onLoad={this.handleScriptLoad} />
            </div>
        );
    }
}

export default SearchBox;
