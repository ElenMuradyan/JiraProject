import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import { CSSProperties } from "react";

export const formStyles:CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 5rem",
    overflow: "hidden",
    gridColumn: "1 / 2",
    gridRow: "1 / 2",
    transition: "0.2s 0.7s ease-in-out",
};
  
  export const inputStyles:CSSProperties = {
    background: "none",
    outline: "none",
    border: "none",
    fontWeight: 600,
    fontSize: "1.1rem",
    width: '300px',
    height: "max-content",
    lineHeight: "55px",
    color: "#333",
};

export const joinInputStyles:CSSProperties = {
  background: "none",
  outline: "none",
  border: "none",
  fontWeight: 600,
  fontSize: "1.1rem",
  width: '380px',
  height: "55px",
  lineHeight: "55px",
  color: "#333",
};

  
  export const buttonStyles:CSSProperties = {
    width: "150px",
    height: "49px",
    border: "none",
    outline: "none",
    borderRadius: "49px",
    cursor: "pointer",
    backgroundColor: "#5995fd",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 600,
    margin: "10px 0",
    transition: "0.5s",
  };
      
  export const formItemStyle = {
    maxWidth: '380px',
    width: '100%',
    height: '55px',
    backgroundColor: '#f0f0f0',
    margin: '10px 0',
    borderRadius: '55px',
    display: 'grid',
    gridTemplateColumns: '15% 85%',
    padding: '0 .4rem',
  }

  export const iStyle:CSSProperties = {
    textAlign: 'center',
    lineHeight: '55px',
    color: '#acacac',
    fontSize: '1.1rem',
    marginLeft: 15,
  }

  export const flex = {
    width: '300px',
  }

  export const formStylesForCabinet:CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 5rem",
    gridColumn: "1 / 2",
    gridRow: "1 / 2",
    transition: "0.2s 0.7s ease-in-out",
};
