import React from "react";
import { Handle, Position } from "reactflow";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

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
            <h4>{data.label}</h4>
          </>
        ) : (
          <>
            <strong style={{ textDecoration: "underline" }}>Parent Span</strong>
            <br />
            <strong>
              {data.label.includes("FloraVisionCloudStack")
                ? data.label.split(/\d/)[0]
                : data.label}
            </strong>
          </>
        )}
        <Handle type="source" position={Position.Bottom} id="source" />
        <Handle type="target" position={Position.Top} id="target" />
      </div>
    </LightTooltip>
  );
};

export default CustomNodeForTrace;
