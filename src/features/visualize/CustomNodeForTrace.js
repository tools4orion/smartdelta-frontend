import React from "react";
import { Handle, Position } from "reactflow";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import lambda from "assets/svgs/lambda.svg";
import dynamoDBlogo from "assets/svgs/dynamoDBlogo.svg";
const CustomNodeForTrace = ({ id, data }) => {
  console.log("CustomNodeForTrace data", data);

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      background: "linear-gradient(120deg, #182848 0%,  #4b6cb7 100%)",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "#4b6cb7",
    },
  }));

  return (
    <LightTooltip
      placement="top"
      title={
        <div>
          <div>
            <strong>Span Name:</strong> {data.label}
          </div>
          <div>
            <strong>Outcome:</strong> {data.outcome}
          </div>
          <div>
            <strong>Duration:</strong> {data.duration} μs
          </div>
          <div>
            <strong>Timestamp:</strong> {data.timestamp}
          </div>

          {data.type === "childWithParent" && (
            <>
              <div>
                <strong>HTTP Method:</strong> {data.httpMethod}
              </div>
              <div>
                <strong>HTTP Status:</strong> {data.httpStatus}
              </div>
              <div>
                <strong>Destination Port:</strong> {data.destinationServicePort}
              </div>
            </>
          )}
        </div>
      }
    >
      <div
        id={id}
        style={{
          padding: 18,
          border: "1px solid #777",
          borderRadius: 5,
          background: "#fff",
          cursor: "move",
          textAlign: "center",
        }}
      >
        {data.type === "childWithParent" ? (
          <>
            <strong style={{ textDecoration: "underline" }}>Child Span</strong>
            <br />
            <div>
              <img
                width="36"
                height="36"
                src={dynamoDBlogo}
                alt="DynamoDB"
                style={{ paddingRight: "4px", verticalAlign: "middle" }}
              />
              <strong style={{ verticalAlign: "middle" }}>{data.label}</strong>
            </div>
          </>
        ) : (
          <>
            <strong style={{ textDecoration: "underline" }}>Parent Span</strong>
            <br />
            <div>
              {data.label.includes("FloraVisionCloudStack") && (
                <img
                  width="36"
                  height="36"
                  src={lambda}
                  alt="AWS Lambda"
                  style={{ paddingRight: "6px", verticalAlign: "middle" }}
                />
              )}
              <strong style={{ verticalAlign: "middle" }}>
                {data.label.includes("FloraVisionCloudStack")
                  ? data.label.split(/\d/)[0]
                  : data.label}
              </strong>
            </div>
          </>
        )}
        <Handle type="source" position={Position.Bottom} id="source" />
        <Handle type="target" position={Position.Top} id="target" />
      </div>
    </LightTooltip>
  );
};

export default CustomNodeForTrace;
