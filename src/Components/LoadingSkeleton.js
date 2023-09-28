import React from "react";
import { Skeleton } from "@mui/material";
import "./form.css";
import { Grid } from "@mui/material";

function CardSkeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-rectangular">
        <Skeleton
          variant="rectangular"
          width={350}
          height={150}
          animation="wave"
        />

        <div style={{ padding: "8px" }}>
          <Skeleton
            variant="rectangular"
            width={100}
            height={20}
            animation="wave"
          />
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            animation="wave"
          />
        </div>
      </div>
    </div>
  );
}

const SkeletonList = () => {
  const skeletonCount = 3;
  const skeletonArray = new Array(skeletonCount).fill(null);

  return (
    <Grid container spacing={2}>
      {skeletonArray.map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonList;
