const Submit = ({ children, assesment = false, style, ...props }) => {
  return (
    <div
      style={{
        backgroundColor: assesment ? "#1C9030" : "#49167E",
        padding: "8px 30px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        font: "normal normal 600 14px/18px Montserrat",
        borderRadius: "100px",
        textTransform: "uppercase",
        cursor: "pointer",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Submit;
