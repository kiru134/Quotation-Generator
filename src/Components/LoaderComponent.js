import classes from "./Loading.module.css";
import ReactLoading from "react-loading";
const Loading = () => {
  return (
    <div className={classes.loading}>
      <div className={classes.lds_roller}>
        <ReactLoading
          type="spinningBubbles"
          color="#405de6"
          height={100}
          width={50}
        />
      </div>
    </div>
  );
};

export default Loading;
