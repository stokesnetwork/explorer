let SOCKET_SERVER = process.env.WS_SERVER || "https://api.stokesnetwork.com";
let SUFFIX = "";
let API_SERVER = process.env.REACT_APP_API_SERVER || "";
let ADDRESS_PREFIX = "stokes:";
let STOKES_UNIT = "STKS";

let BPS = 1;

switch (process.env.REACT_APP_NETWORK) {
  case "stokes-testnet":
    ADDRESS_PREFIX = "stokestest:";
    if (!API_SERVER) {
      API_SERVER = "http://127.0.0.1:8000";
    }
    if (!process.env.WS_SERVER) {
      SOCKET_SERVER = "http://127.0.0.1:8000";
    }
    SUFFIX = "";
    STOKES_UNIT = "TSTOK";
    break;

  // mainnet
  default:
    SOCKET_SERVER = "https://api.stokesnetwork.com";
    if (!API_SERVER) {
      API_SERVER = "https://api.stokesnetwork.com";
    }
    break;

  // case "stokes-mainnet":
  //   ADDRESS_PREFIX = "stokes:";
  //   if (!API_SERVER) {
  //     API_SERVER = "http://127.0.0.1:8000";
  //   }
  //   if (!process.env.WS_SERVER) {
  //     SOCKET_SERVER = "http://127.0.0.1:8000";
  //   }
  //   SUFFIX = "";
  //   STOKES_UNIT = "STKS";
  //   break;
}

export { SOCKET_SERVER, SUFFIX, API_SERVER, ADDRESS_PREFIX, BPS, STOKES_UNIT };
