import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-4xl font-bold">Login</h1>
            <p className="mt-4 text-muted-foreground">
              Customer login portal coming soon. Contact us for early access.
            </p>
            <Button asChild className="mt-8">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
