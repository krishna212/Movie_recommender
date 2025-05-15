import React from "react";

const RotatingRasenganLoader = () => {
  const loaderStyle = {
    transform: "rotateZ(45deg)",
    perspective: "1000px",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    color: "#fff",
    position: "relative",
  };

  const beforeAfterStyle = {
    content: "''",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    transform: "rotateX(70deg)",
    animation: "spin 1s linear infinite",
  };

  const afterStyle = {
    ...beforeAfterStyle,
    color: "#FF3D00",
    transform: "rotateY(70deg)",
    animationDelay: "0.4s",
  };

  return (
    <>
      <span style={loaderStyle}>
        <span style={beforeAfterStyle}></span>
        <span style={afterStyle}></span>
      </span>

      <style>
        {`
          @keyframes spin {
            0%, 100% {
              box-shadow: 0.2em 0px 0 0px currentcolor;
            }
            12% {
              box-shadow: 0.2em 0.2em 0 0 currentcolor;
            }
            25% {
              box-shadow: 0 0.2em 0 0px currentcolor;
            }
            37% {
              box-shadow: -0.2em 0.2em 0 0 currentcolor;
            }
            50% {
              box-shadow: -0.2em 0 0 0 currentcolor;
            }
            62% {
              box-shadow: -0.2em -0.2em 0 0 currentcolor;
            }
            75% {
              box-shadow: 0px -0.2em 0 0 currentcolor;
            }
            87% {
              box-shadow: 0.2em -0.2em 0 0 currentcolor;
            }
          }
        `}
      </style>
    </>
  );
};

export default RotatingRasenganLoader;
