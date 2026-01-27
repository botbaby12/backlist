import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email").max(255),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const Blog = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: EmailFormValues) => {
    console.log("Email signup:", data);
    toast.success("You're on the list!", {
      description: "We'll notify you when our blog launches.",
    });
    setIsSubmitted(true);
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Blog <span className="text-primary">Coming Soon</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We're working on valuable content to help dealerships source smarter, 
              understand the market, and grow their business. Be the first to know when we launch.
            </p>

            {/* Email Signup */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Get Notified</CardTitle>
                <CardDescription>
                  Subscribe to receive updates when our blog launches.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="rounded-lg bg-primary/10 p-6 text-center">
                    <p className="font-medium text-primary">Thanks for subscribing!</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We'll send you an email when we launch.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:flex-row">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Enter your email" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="gap-2">
                        Notify Me <ArrowRight className="h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Topics */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold">What to Expect</h2>
              <div className="mt-8 grid gap-6 text-left sm:grid-cols-2">
                {[
                  {
                    title: "Market Insights",
                    description: "Trends in private-party vehicle pricing and inventory levels.",
                  },
                  {
                    title: "Sourcing Strategies",
                    description: "Tips for finding and acquiring the best deals.",
                  },
                  {
                    title: "Industry News",
                    description: "Updates on marketplace changes and new opportunities.",
                  },
                  {
                    title: "Success Stories",
                    description: "How dealers are winning with smarter sourcing.",
                  },
                ].map((topic) => (
                  <Card key={topic.title}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold">{topic.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{topic.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
