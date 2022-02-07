

const fileUploadStyle = {
  dropzone: {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border 24s ease-in-out",
  cursor: "pointer",
},
dropzoneContainer: {
  padding: 16,
  border: "1px #e8e8e8 solid",
  borderRadius: 3,
  width: "100%",
  display: "inline-block",
  marginBottom: 10,
},
title: {
  marginTop: 20,
},
thumbsContainer: {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  justifyContent: "center",
  backgroundColor: "white",

},

thumb: {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "100%",
  height: "100%",
  maxWidth: 150,
  maxHeight: 150,
  padding: 4,
  boxSizing: "border-box",
},
videoThumb: {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 370,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
  position: "relative",
},


thumbInner: {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
},

img: {
  display: "block",
  width: "auto",
  height: "100%",
  maxWidth: 150,
  maxHeight: 150,
},
fileUploadWrapper: {
  textAlign: "end",
},
fileType: {
  width: 100,
  height: 100,
  backgroundColor: "black"
}
};

export default fileUploadStyle;
