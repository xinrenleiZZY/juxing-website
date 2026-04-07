import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { ClientLogos } from "@/components/sections/client-logos";
import { CTA } from "@/components/sections/cta";
import { generateOrganizationSchema } from "@/lib/structured-data";

export default function Home() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Hero />
      <ClientLogos />
      <Features />
      <CTA />
    </>
  );
}
