import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "store/slices/counterSlice";
import { RootState } from "store/store";

function ReduxTest() {
  const { value } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      {value}
      <Button type="primary" onClick={() => dispatch(increment())}>
        +
      </Button>
      <Button type="primary" onClick={() => dispatch(decrement())}>
        -
      </Button>
    </div>
  );
}

export default ReduxTest;
