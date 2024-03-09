import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import { Link } from "react-router-dom";
function randomID(len) {
  let result = "";
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

const Livestreams = () => {
  console.log(
    process.env.REACT_APP_APP_ID,
    process.env.REACT_APP_SERVER_SECRET
  );

  const [element, setElement] = React.useState(null);

  React.useEffect(() => {
    const roomID = getUrlParams().get("roomID") || randomID(5);
    let role_str = getUrlParams(window.location.href).get("role") || "Host";
    const role =
      role_str === "Host"
        ? ZegoUIKitPrebuilt.Host
        : role_str === "Cohost"
        ? ZegoUIKitPrebuilt.Cohost
        : ZegoUIKitPrebuilt.Audience;

    let sharedLinks = [];
    if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
      sharedLinks.push({
        name: "Join as co-host",
        url:
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?roomID=" +
          roomID +
          "&role=Cohost",
      });
    }
    sharedLinks.push({
      name: "Join as audience",
      url:
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID +
        "&role=Audience",
    });

    // Use environment variables for appID and serverSecret
    const appID = parseInt(process.env.REACT_APP_APP_ID);
    const serverSecret = process.env.REACT_APP_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    if (element) {
      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks,
      });
    }
  }, [element]); // This effect depends on `element` being set

  return (
    <>
      {localStorage.getItem("token") ? (
        <div
          className="myCallContainer"
          ref={setElement}
          style={{ width: "100vw", height: "100vh" }}
        ></div>
      ) : (
        <div
          style={{
            fontSize: "x-large",
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          {" "}
          Please <Link to="/login">Login</Link> first
        </div>
      )}
    </>
  );
};

export default Livestreams;
