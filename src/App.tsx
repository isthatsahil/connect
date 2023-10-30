import SigninForm from "./_auth/Forms/SigninForm";
import { Home } from "./_root/pages";
import { Route, Routes } from "react-router-dom";
import "./globals.css";
import SignupForm from "./_auth/Forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import Layout from "./_root/Layout";
import { Toaster } from "@/components/ui/toaster";

function App(): React.JSX.Element {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Private Routes */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <div className="absolute">
        <Toaster />
      </div>
    </main>
  );
}

export default App;
