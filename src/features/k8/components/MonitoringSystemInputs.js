import React from "react";
import { Grid, CardActionArea, Card } from "@mui/material";
import MDTypography from "components/MDTypography";

const MonitoringSystemsInputs = ({
  monitoringSysCards,
  handleMonitoringSysChange,
  monitoringSysValue,
}) => {
  return (
    <>
      <MDTypography variant="h6" py={5} px={4}>
        Select Your Monitoring System
      </MDTypography>
      <Grid container spacing={2} px={4}>
        {monitoringSysCards.map((card, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Card
              onClick={() => handleMonitoringSysChange(index)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                boxShadow:
                  monitoringSysValue === index
                    ? "0px 0px 10px 2px #1976d2"
                    : undefined,
                border:
                  monitoringSysValue === index
                    ? "2px solid #1976d2"
                    : "1px solid #e0e0e0",
                cursor: "pointer",
              }}
            >
              <CardActionArea>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                    style={{
                      maxWidth: "60%",
                      maxHeight: "60%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default MonitoringSystemsInputs;
