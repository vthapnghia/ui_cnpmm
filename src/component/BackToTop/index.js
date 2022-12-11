import { useCallback, useEffect, useState } from "react";
import Icons from "../Icons";

function BackToTop({id}) {
  const [backToTop, setBackToTop] = useState(false);

  const toggleVisible = useCallback(() => {
    const element = document.getElementById(id);
    const scrolled = element.scrollTop;
    if (scrolled > 100) {
      setBackToTop(true);
    } else if (scrolled <= 100) {
      setBackToTop(false);
    }
  }, [id]);

  useEffect(() => {
    const element = document.getElementById(id);
    element.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, [toggleVisible, id]);

  const scrollUp = useCallback(() => {
    const element = document.getElementById(id);
    element.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  return (
    backToTop && (
      <div
        style={{
          position: "fixed",
          bottom: "50px",
          right: "50px",
          border: "1px solid #CB1C22",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#CB1C22",
          cursor: "pointer",
          zIndex: "100px",
        }}
        onClick={scrollUp}
      >
        <Icons.ArrowUp height="18" width="18" color="#FFFFFF" />
      </div>
    )
  );
}

export default BackToTop;
