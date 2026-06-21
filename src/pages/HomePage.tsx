import Hero from "../components/Hero";
import Thinking from "../components/Thinking";
import Projects from "../components/Projects";
import TechnicalDepth from "../components/TechnicalDepth";
import NidusDecisions from "../components/NidusDecisions";
import CreatorHubDecisions from "../components/CreatorHubDecisions";
import AutoMatchDecisions from "../components/AutoMatchDecisions";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Thinking />
      <Projects />
      <TechnicalDepth />
      <NidusDecisions />
      <CreatorHubDecisions />
      <AutoMatchDecisions />
    </>
  );
}
