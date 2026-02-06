import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const demoFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  dealership: z.string().min(2, "Dealership name is required").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  locations: z.string().min(1, "Please select number of locations"),
});

type DemoFormValues = z.infer<typeof demoFormSchema>;

interface DemoFormProps {
  title?: string;
  description?: string;
}

export function DemoForm({ 
  title = "Book a Demo", 
  description = "See how Backlist can help your dealership source better inventory."
}: DemoFormProps) {
  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      name: "",
      dealership: "",
      email: "",
      phone: "",
      locations: "",
    },
  });

  const onSubmit = (data: DemoFormValues) => {
    console.log("Demo form submitted:", data);
    toast.success("Demo request submitted!", {
      description: "We'll be in touch within 24 hours.",
    });
    form.reset();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dealership"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dealership Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Smith Auto Group" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@smithauto.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Locations</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 location</SelectItem>
                      <SelectItem value="2-5">2-5 locations</SelectItem>
                      <SelectItem value="6-10">6-10 locations</SelectItem>
                      <SelectItem value="11+">11+ locations</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Request Demo
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
