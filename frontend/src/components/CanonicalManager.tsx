import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export const CanonicalManager = () => {
    const location = useLocation();
    const baseUrl = "https://www.cazza.ai"; 

    // Determine the canonical URL
    // For the home page (/), it should just be the base URL
    // For other pages, append the pathname
    const cleanPath = location.pathname === "/" ? "" : location.pathname;
    const canonicalUrl = `${baseUrl}${cleanPath}`;

    return (
        <Helmet>
            <link rel="canonical" href={canonicalUrl} />
        </Helmet>
    );
};
