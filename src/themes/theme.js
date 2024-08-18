// src/themes/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  
    global: {
      "html, body": {
        padding: 0,
        margin: 0,
        fontFamily: "'Inter', sans-serif",
      },
    },

    colors: {
      customRed: {
        500: "#940000", 
      },
    },

});

export default theme;
