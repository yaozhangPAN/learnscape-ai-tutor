
import { Star, Trophy, Music, Flame, Gem, Book, Coffee, Heart } from "lucide-react";

export const GameIcons = {
  Completed: ({ className = "" }) => (
    <div className={`rounded-full bg-lime-500 w-16 h-16 flex items-center justify-center shadow-md ${className}`}>
      <Star className="text-white w-8 h-8" fill="white" />
    </div>
  ),
  Current: ({ className = "" }) => (
    <div className={`rounded-full bg-lime-500 w-20 h-20 flex items-center justify-center shadow-md border-4 border-lime-300 ${className}`}>
      <Star className="text-white w-10 h-10" fill="white" />
    </div>
  ),
  Locked: ({ className = "" }) => (
    <div className={`rounded-full bg-gray-300 w-16 h-16 flex items-center justify-center shadow-md ${className}`}>
      <Star className="text-gray-400 w-8 h-8" />
    </div>
  ),
  ChestReward: () => (
    <div className="w-16 h-16 bg-yellow-400 rounded-md flex items-center justify-center shadow-md border-2 border-yellow-600">
      <div className="w-10 h-8 bg-amber-800 rounded-md flex items-center justify-center border-t-2 border-yellow-300">
        <div className="w-3 h-3 bg-yellow-300 rounded-full" />
      </div>
    </div>
  ),
  Character: () => (
    <div className="relative">
      <div className="w-24 h-24 bg-white rounded-md p-2">
        <div className="w-full h-full bg-lime-500 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-lime-500 rounded-full" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center shadow-md">
          <Coffee className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  ),
  Practice: () => (
    <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center shadow-md">
      <div className="w-12 h-12 bg-lime-500 rounded-md flex items-center justify-center">
        <Music className="w-6 h-6 text-white" />
      </div>
    </div>
  ),
  // Navigation icons for the bottom bar
  Navigation: {
    Heart: () => <Heart className="h-6 w-6" fill="#ff9999" stroke="#ff5555" />,
    Trophy: () => <Trophy className="h-6 w-6" fill="#ffd700" stroke="#cc9900" />,
    Flame: () => <Flame className="h-6 w-6" fill="#ff5500" stroke="#cc4400" />,
    Gem: () => <Gem className="h-6 w-6" fill="#55aaff" stroke="#0055aa" />,
    Book: () => <Book className="h-6 w-6" fill="#66cc66" stroke="#339933" />
  }
};

export default GameIcons;
