import React from "react";

function useChatScroll<T>(
  dep: T
): React.MutableRefObject<HTMLDivElement | undefined> {
  const ref = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}
export default useChatScroll;
