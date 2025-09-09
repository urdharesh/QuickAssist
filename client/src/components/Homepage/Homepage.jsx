import React from "react";
import JoinOurTeam from "./Components/JoinOurTeam/JoinOurTeam";
import OneClick from "./Components/OneClick/OneClick";
import OurServices from "./Components/OurServices/OurServices";
import Carousel from "./Components/Carousel/Carousel";
import LandingPage from "./LandingPage";

function Homepage() {
  return (
    <>
      <div>
        <LandingPage />
        <Carousel />
        <OurServices />
        <OneClick />
        <JoinOurTeam />
      </div>
    </>
  );
}

export default Homepage;
