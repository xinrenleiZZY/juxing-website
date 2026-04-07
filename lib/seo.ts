import { Metadata } from "next";

export const siteConfig = {
  name: "企业官网",
  description: "我们提供专业的产品和服务，致力于为客户创造价值",
  url: "https://example.com",
  ogImage: "https://example.com/og.jpg",
  links: {
    github: "https://github.com",
  },
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
