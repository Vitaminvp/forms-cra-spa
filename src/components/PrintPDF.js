import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button, Icon } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

const PrintPDF = () => {
  const printDocument = () => {
    const input = document.querySelector(".MuiContainer-root");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", [700, 1500]);
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={printDocument}
      style={{ margin: 10 }}
    >
      <FormattedMessage id="download" defaultMessage="download" /> &nbsp;
      <Icon>cloud_download</Icon>
    </Button>
  );
};

export default PrintPDF;
