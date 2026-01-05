import { useLocation } from "react-router-dom";

export const CanonicalManager = () => {
  const location = useLocation();
  const baseUrl = "https://www.cazza.ai";

  // Determine the canonical URL
  const cleanPath = location.pathname === "/" ? "" : location.pathname;
  const canonicalUrl = `${baseUrl}${cleanPath}`;

  return <link rel="canonical" href={canonicalUrl} />;
};
