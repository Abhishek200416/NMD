import { Helmet } from "react-helmet-async";

/**
 * SEO Component for Meta Tags, Open Graph, and Schema.org
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} image - OG image URL
 * @param {string} url - Canonical URL
 * @param {string} type - Page type (website, article, etc.)
 * @param {object} schema - Schema.org structured data
 */
const SEO = ({ 
  title = "Faith Center & Nehemiah David Ministries",
  description = "Join us for inspiring worship, life-changing messages, and community fellowship. Watch our sermons online and connect with our church family.",
  image = "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200",
  url = window.location.href,
  type = "website",
  schema = null
}) => {
  const fullTitle = title.includes("Faith Center") || title.includes("Nehemiah") 
    ? title 
    : `${title} | Faith Center & Nehemiah David Ministries`;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Church",
    "name": "Faith Center & Nehemiah David Ministries",
    "description": description,
    "url": url,
    "image": image,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Amaravathi Rd, above Yousta, Gorantla",
      "addressLocality": "Guntur",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "522034",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "General Inquiry",
      "email": "info@faithcenter.com"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Faith Center & Nehemiah David Ministries" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Faith Center & Nehemiah David Ministries" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
