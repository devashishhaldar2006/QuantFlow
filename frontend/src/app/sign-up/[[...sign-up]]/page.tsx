import AuthLayout from "@/features/auth/components/AuthLayout";
import CustomSignUpForm from "@/features/auth/components/CustomSignUpForm";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create your QuantFlow account"
      subtitle="Start backtesting quantitative strategies with compiled C++ execution speed."
    >
      <CustomSignUpForm />
    </AuthLayout>
  );
}