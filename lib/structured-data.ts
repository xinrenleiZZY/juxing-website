export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "企业官网",
    url: "https://example.com",
    logo: "https://example.com/logo.png",
    description: "我们提供专业的产品和服务，致力于为客户创造价值",
    address: {
      "@type": "PostalAddress",
      addressLocality: "北京市",
      addressRegion: "朝阳区",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86-400-123-4567",
      contactType: "customer service",
      email: "contact@example.com",
    },
    sameAs: [
      "https://github.com",
      "https://twitter.com",
    ],
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "企业官网",
      logo: {
        "@type": "ImageObject",
        url: "https://example.com/logo.png",
      },
    },
    url: article.url,
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: product.url,
    brand: {
      "@type": "Brand",
      name: "企业官网",
    },
  };
}
