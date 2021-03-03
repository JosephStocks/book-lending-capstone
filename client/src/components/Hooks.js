import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/actions/templateActions";
import { DivSC, H1S, Paper } from "./Styles";

const Hooks = () => {
  //getting global state
  const count = useSelector((state) => state.counter);

  //receive dispatch function
  const dispatch = useDispatch();

  return (
    <>
      <h1>Hooks</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment(4))}>Clique Meh</button>
      <br />
      <br />
      <DivSC bgc="gold">
        <H1S>This is Styled Component</H1S>
      </DivSC>
      <Paper height="350px">Hi</Paper>
      <Paper bgc="gold">Hi</Paper>
    </>
  );
};

export default Hooks;
