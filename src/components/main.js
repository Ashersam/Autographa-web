import React, { useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { IntlProvider } from "react-intl";
// import { Observer } from "mobx-react";
import ProjectsDrawer from "../components/ProjectsPane/ProjectsDrawer";
import * as localForage from "localforage";
// import AutographaStore from "./AutographaStore";
// import AutoUpdate from "./AutoUpdate";
// import { logger } from "../logger";

let messages;
const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#757ce8",
      main: "#212121",
      dark: "#455a64",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fff",
      main: "#ffffff",
      dark: "#455a64",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "0.4em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.2)",
          outline: "1px solid slategrey",
        },
      },
    },
  },
});

const Main = () => {
  const [language, setlanguage] = React.useState("en")
  const [ message, setmessage ] = React.useState({})
  useEffect(() => {
    // logger.info("main.js, setting up app with preferred language");
    getLocale().then(async (lang) => {
      // AutographaStore.appLang = lang;
      setlanguage(lang)
      messages = await loadLocaleData(lang);
      setmessage(messages)
      // AutographaStore.currentTrans = messages;
    });
  }, []);

  const getLocale = async function () {
    // logger.debug("main.js, started work for getLocale");
    try {
      const value = await localForage.getItem("applang");
      // This code runs once the value has been loaded
      // from the offline store.
      if (!value) {
        // logger.error(
        //   "main.js, failed to fetch language from localforage, setting to default language"
        // );
        return "en";
      } else return value;
    } catch (err) {
      // This code runs if there were any errors.
      // logger.error(
      //   "main.js, failed to fetch language from localforage, setting to default language"
      // );
      return "en";
    }
  };

  const loadLocaleData = (locale) => {
    switch (locale) {
      case "en":
        return import("../translations/en.json");
      case "hi":
        return import("../translations/hi.json");
      default:
        // logger.warn("main.js, Setting to default language");
        return import("../translations/en.json");
    }
  };

  return (
    <React.Fragment>
        {Object.keys(message).length !== 0 ? (
            <ThemeProvider theme={theme}>
              <IntlProvider
                defaultLocale="en"
                locale={language}
                messages={message}
              >
                <ProjectsDrawer />
              </IntlProvider>
            </ThemeProvider>
          ) : (
            <div></div>
          )
        }
    </React.Fragment>
  );
};

export default Main;
