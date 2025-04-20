import CommandDashboard from "../components/CommandDashboard";
import AuthToggle from "../components/AuthToggle";
import IntroController from "../components/IntroController";

export default function Home() {
  return (
    <>
      {/* Auth Toggle remains for testing the different intros */}
      <AuthToggle />

      {/* Show intro for guest or logged-in users before rendering dashboard */}
      <IntroController>
        <CommandDashboard />
      </IntroController>
    </>
  );
}
