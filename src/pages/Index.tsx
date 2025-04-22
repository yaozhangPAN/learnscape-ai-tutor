
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import HomeNote from "@/components/home/HomeNote";
import MainBlocksGrid from "@/components/home/MainBlocksGrid";
import StreakProgressBlock from "@/components/home/StreakProgressBlock";
import LeaderboardSection from "@/components/home/LeaderboardSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FCE883" }}>
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-6 px-2 sm:px-0">
        <HomeHeader />

        {/* Main blocks grid (all main dashboard blocks except streak/progress and leaderboard) */}
        <MainBlocksGrid />

        {/* Streak and Progress Block */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl w-full mb-4">
          <StreakProgressBlock />
          <LeaderboardSection
            to="/leaderboard"
            className="bg-[#FFB300] text-[#6D5A21]"
            icon={
              <img
                src="/lovable-uploads/1eabcd5f-326e-4849-bf2d-db471b7a4428.png"
                alt="Leaderboard Red Panda Icon"
                className="w-8 h-8 mr-2"
                draggable={false}
                style={{ userSelect: "none" }}
              />
            }
            title="Leaderboard"
            desc="排行榜"
          />
        </div>

        <HomeNote />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
