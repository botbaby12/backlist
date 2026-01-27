import { Layout } from "@/components/Layout";
import {
  HeroSection,
  TrustedBy,
  HowItWorks,
  ProductPreview,
  DataSources,
  Benefits,
  SocialProof,
  CTASection,
} from "@/components/landing";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustedBy />
      <ProductPreview />
      <HowItWorks />
      <DataSources />
      <Benefits />
      <SocialProof />
      <CTASection />
    </Layout>
  );
};

export default Index;
