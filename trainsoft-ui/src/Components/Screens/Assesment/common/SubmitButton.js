const Submit = ({ children, assesment = false, ...props }) => {
  return (
    <div
      {...props}
      style={{
        backgroundColor: assesment ? "#66D179" : "#49167E",
        padding: "12px 30px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        font: "normal normal 600 14px/18px Montserrat",
        borderRadius: "100px",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
};

export default Submit;
