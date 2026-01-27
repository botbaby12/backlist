import { useState } from "react";
import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { DemoFormModal } from "@/components/DemoFormModal";
import { DemoForm } from "@/components/DemoForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "Standard",
    price: "$500",
    period: "/month",
    description: "Perfect for independent dealerships looking to source smarter.",
    features: [
      "Unlimited vehicle alerts",
      "All 4 marketplace sources",
      "Private-party filter",
      "Custom search criteria",
      "Mobile app access",
      "Email & SMS notifications",
      "Basic market insights",
      "Email support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For multi-location dealerships and auto groups with advanced needs.",
    features: [
      "Everything in Standard",
      "Unlimited users",
      "Advanced market analytics",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Priority support",
      "Custom reporting",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

const faqs = [
  {
    question: "How quickly do I receive alerts?",
    answer: "Alerts are sent in real-time—typically within minutes of a new listing appearing. Our system continuously monitors all four platforms to ensure you never miss an opportunity.",
  },
  {
    question: "Can I try Backlist before committing?",
    answer: "Yes! We offer a personalized demo where you can see Backlist in action with real data from your local market. Book a demo and we'll show you exactly how it works.",
  },
  {
    question: "How does Backlist filter out dealer listings?",
    answer: "Our AI-powered system analyzes listing patterns, language, and seller history to identify and filter out dealer listings. This gives you access to true private-party opportunities only.",
  },
  {
    question: "What's included in market insights?",
    answer: "You'll see pricing trends, inventory levels, and demand patterns in your area. This helps you understand what vehicles are selling, at what prices, and where the opportunities are.",
  },
  {
    question: "Is there a long-term contract?",
    answer: "No. The Standard plan is month-to-month with no long-term commitment. Enterprise plans may have custom terms based on your needs.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel anytime from your account dashboard. Your access continues through the end of your billing period.",
  },
];

const Pricing = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Simple, Transparent <span className="text-primary">Pricing</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              One vehicle sourced through Backlist instead of auction can pay for months of service.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16">
        <div className="container-wide">
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative hover-lift ${plan.popular ? 'border-primary border-2' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="mt-8 w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => setDemoModalOpen(true)}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Why Dealers Trust Backlist</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              We built Backlist because we saw dealerships losing thousands every month to auction fees—money that could stay in their pockets. By aggregating private-party listings and delivering them in real-time, we help dealers source better inventory at better prices.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              One vehicle sourced through Backlist instead of auction can easily save $500-$1,500 in fees alone—not to mention the better margins on private-party purchases.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to know about Backlist.
              </p>
            </div>
            <Accordion type="single" collapsible className="mt-12">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Demo Form Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Get Started?</h2>
            <p className="mt-4 text-muted-foreground">
              Book a demo and see how Backlist can transform your sourcing.
            </p>
          </div>
          <div className="mt-12">
            <DemoForm 
              title="Book Your Demo"
              description="We'll reach out within 24 hours to schedule your personalized demo."
            />
          </div>
        </div>
      </section>

      <DemoFormModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </Layout>
  );
};

export default Pricing;
