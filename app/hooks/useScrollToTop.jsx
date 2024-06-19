import { useEffect } from "react";

function useScrollToTop() {
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };

    // Executăm handleScroll imediat pentru a aduce pagina la început
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}

export default useScrollToTop;
