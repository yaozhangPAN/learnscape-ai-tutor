
import React from "react";
import LeaderboardSection from "./LeaderboardSection";

interface Props {
  to: string;
  className: string;
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

const HomeLeaderboardSection: React.FC<Props> = (props) => (
  <LeaderboardSection {...props} />
);

export default HomeLeaderboardSection;
