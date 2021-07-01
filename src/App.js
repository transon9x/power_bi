import "./App.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { isMobile } from "react-device-detect";

function App() {
    const [data, setData] = useState([]);

    useEffect(async() => {
        const list = await axios({
            url: "http://192.168.1.250:9999/get_data",
            method: "GET",
        });
        setData(list.data);
    }, []);
    console.log( data.url_em)

    if (isMobile) {
        return ( <
            PowerBIEmbed embedConfig = {
                {
                    type: "report",
                    id: data.id_report,
                    embedUrl: data.url_em,
                    accessToken: data.token,
                    tokenType: models.TokenType.Aad,
                    settings: {
                        panes: {
                            filters: {
                                expanded: false,
                                visible: false,
                            },
                        },
                        // layoutType: models.LayoutType.MobileLandscape,
                        layoutType: models.LayoutType.MobilePortrait,
                        background: models.BackgroundType.Transparent,
                    },
                }
            }
            eventHandlers = {
                new Map([
                    [
                        "loaded",
                        function() {
                            console.log("Report loaded");
                        },
                    ],
                    [
                        "rendered",
                        function() {
                            console.log("Report rendered");
                        },
                    ],
                    [
                        "error",
                        function(event) {
                            console.log(event.detail);
                        },
                    ],
                ])
            }
            cssClassName = { "Embed-container" }
            getEmbeddedComponent = {
                (embeddedReport) => {
                    window.report = embeddedReport;
                }
            }
            />
            
        
        );
    } else {
        return ( <
            PowerBIEmbed embedConfig = {
                {
                    type: "report",
                    id: data.id_report,
                    embedUrl: data.url_em,
                    accessToken: data.token,
                    tokenType: models.TokenType.Aad,
                    settings: {
                        panes: {
                            filters: {
                                expanded: false,
                                visible: false,
                            },
                            displayOption: models.DisplayOption.FitToPage,
                        },
                    },
                }
            }
            eventHandlers = {
                new Map([
                    [
                        "loaded",
                        function() {
                            console.log("Report loaded");
                        },
                    ],
                    [
                        "rendered",
                        function() {
                            console.log("Report rendered");
                        },
                    ],
                    [
                        "error",
                        function(event) {
                            console.log(event.detail);
                        },
                    ],
                ])
            }
            cssClassName = { "Embed-container-web" }
            getEmbeddedComponent = {
                (embeddedReport) => {
                    window.report = embeddedReport;
                }
            }


            />
            

        );
    }
}

export default App;