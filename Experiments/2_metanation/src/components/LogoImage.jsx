const styles = {
  logoImage: {
    padding: "0 7px",
    height: "42px",
    gap: "5px",
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
};
function LogoImage(props) {
  const noLogoToken = "./src/logo.png";

  return (
    <div style={styles.logoImage}>
      <img
        src={props.image || noLogoToken}
        alt="MetaNation"
        style={{ height: props?.size || "50px" }}
      />
    </div>
  );
}
export default LogoImage;
