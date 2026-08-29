import AuthLayout from "@/features/auth/components/AuthLayout";
import CustomSignInForm from "@/features/auth/components/CustomSignInForm";

export default function SignInPage() {
  return (
    <AuthLayout
      title="Welcome back to QuantFlow"
      subtitle="Sign in to access your quantitative backtesting terminal and strategies."
    >
      <CustomSignInForm />
    </AuthLayout>
  );
}