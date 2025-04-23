import { useState } from "react";
import Navbar from "@/components/Navbar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Medal, Trophy, Search } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

const leaderboardData = [
  {
    id: 1,
    rank: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg",
    score: 9860,
    questions: 423,
    badge: "Expert",
  },
  {
    id: 2,
    rank: 2,
    name: "Sarah Williams",
    avatar: "/placeholder.svg",
    score: 8945,
    questions: 387,
    badge: "Advanced",
  },
  {
    id: 3,
    rank: 3,
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    score: 8632,
    questions: 362,
    badge: "Advanced",
  },
  {
    id: 4,
    rank: 4,
    name: "Jessica Lee",
    avatar: "/placeholder.svg",
    score: 7890,
    questions: 345,
    badge: "Intermediate",
  },
  {
    id: 5,
    rank: 5,
    name: "David Thompson",
    avatar: "/placeholder.svg",
    score: 7654,
    questions: 322,
    badge: "Intermediate",
  },
  {
    id: 6,
    rank: 6,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg",
    score: 7321,
    questions: 310,
    badge: "Intermediate",
  },
  {
    id: 7,
    rank: 7,
    name: "James Wilson",
    avatar: "/placeholder.svg",
    score: 6987,
    questions: 298,
    badge: "Intermediate",
  },
  {
    id: 8,
    rank: 8,
    name: "Sophia Martinez",
    avatar: "/placeholder.svg",
    score: 6754,
    questions: 276,
    badge: "Intermediate",
  },
  {
    id: 9,
    rank: 9,
    name: "Daniel Brown",
    avatar: "/placeholder.svg",
    score: 6543,
    questions: 265,
    badge: "Beginner",
  },
  {
    id: 10,
    rank: 10,
    name: "Olivia Garcia",
    avatar: "/placeholder.svg",
    score: 6321,
    questions: 254,
    badge: "Beginner",
  },
];

const getBadgeVariant = (badge: string, t: any) => {
  switch (badge) {
    case t.LEADERBOARD.BADGE_EXPERT:
      return "default";
    case t.LEADERBOARD.BADGE_ADVANCED:
      return "secondary";
    case t.LEADERBOARD.BADGE_INTERMEDIATE:
      return "outline";
    default:
      return "outline";
  }
};

const getRankIcon = (rank: number, t: any) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Medal className="h-6 w-6 text-amber-600" />;
    default:
      return <span className="font-semibold">{rank}</span>;
  }
};

const badgeMap = {
  "Expert": "BADGE_EXPERT",
  "Advanced": "BADGE_ADVANCED",
  "Intermediate": "BADGE_INTERMEDIATE",
  "Beginner": "BADGE_BEGINNER"
};

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useI18n();
  const dataMapped = leaderboardData.map(user => ({
    ...user,
    badge: t.LEADERBOARD[badgeMap[user.badge as keyof typeof badgeMap]],
  }));
  const filteredData = dataMapped.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFF7D1] flex flex-col">
      <Navbar />

      <div className="bg-gradient-to-br from-[#FCE883] via-[#FFD88C] to-[#F7BE4A] py-12 px-4 relative">
        <div className="max-w-4xl mx-auto relative flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#915723] mb-3 tracking-tight drop-shadow-sm" style={{ fontFamily: "Nunito, sans-serif" }}>
            {t.LEADERBOARD.TITLE}
          </h1>
          <p className="text-lg text-[#7C6020] text-center max-w-2xl mb-2 px-2">
            {t.LEADERBOARD.SUBTITLE}
          </p>
        </div>

        <div className="absolute top-3 left-6 w-6 h-6 bg-white/50 rounded-full shadow animate-float" />
        <div className="absolute top-12 left-1/3 w-4 h-4 bg-yellow-200 rounded-full shadow animate-bounce-slow" />
        <div className="absolute bottom-6 right-[15%] w-5 h-5 bg-[#F7BE4A] rounded-full opacity-80" />
        <div className="absolute bottom-4 right-8 w-12 h-12 bg-white/30 rounded-full blur-[2px]"></div>
      </div>

      <div className="flex-1 w-full max-w-5xl px-2 mx-auto py-6">
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold text-[#8F5C1B] mb-6 flex items-center">
            <Award className="mr-2 text-[#f7b731]" /> {t.LEADERBOARD.TOP_ACHIEVERS}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dataMapped.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className={`rounded-3xl shadow-xl relative group bg-gradient-to-tr from-[#FFF6E7] to-[#FFE6A1] border-4
                ${user.rank === 1 ? "border-[#FEE12B]" : user.rank === 2 ? "border-[#D3D9E7]" : "border-[#FFC67E]"}
                transition-all hover:scale-105`}
                style={{ minHeight: 260 }}
              >
                <div className="flex flex-col items-center pt-6 pb-3">
                  <div className="mb-2">{getRankIcon(user.rank, t)}</div>
                  <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-lg font-bold text-[#A46B24] mt-2">{user.name}</span>
                </div>
                <div className="flex flex-col items-center bg-white/70 rounded-2xl mx-5 py-4 shadow-inner">
                  <Badge variant={getBadgeVariant(user.badge, t)}>{user.badge}</Badge>
                  <span className="text-2xl font-bold text-[#FFA900] mt-1">{user.score.toLocaleString()}</span>
                  <span className="text-xs text-[#91712A]">{t.LEADERBOARD.POINTS}</span>
                  <span className="mt-1 text-[#916A13]">{user.questions} {t.LEADERBOARD.QUESTIONS}</span>
                </div>
                {user.rank === 1 && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFDA7F] rounded-full px-4 py-1 font-bold text-[#AF821A] shadow-lg">{t.LEADERBOARD.CHAMPION}</span>
                )}
                {user.rank === 2 && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#EFEFEF] rounded-full px-4 py-1 font-bold text-[#909497] shadow-lg">{t.LEADERBOARD.RUNNER_UP}</span>
                )}
                {user.rank === 3 && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD5A6] rounded-full px-4 py-1 font-bold text-[#C87D3F] shadow-lg">{t.LEADERBOARD.THIRD_PLACE}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 relative max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C48829]" />
            <input
              type="text"
              placeholder={t.LEADERBOARD.SEARCH_PLACEHOLDER}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-[#F7BE4A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFCA52] bg-yellow-50 font-medium placeholder:text-[#D3B667]"
              style={{ boxShadow: "0 2px 6px 0 rgba(255, 195, 0, 0.06)" }}
            />
          </div>
        </div>

        <div className="bg-white/90 rounded-3xl shadow-xl border-2 border-[#FFE29F] p-0 overflow-hidden animate-fade-in">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-[#A37A36]">{t.LEADERBOARD.RANK}</TableHead>
                <TableHead className="text-[#A37A36]">{t.LEADERBOARD.USER}</TableHead>
                <TableHead className="text-[#A37A36]">{t.LEADERBOARD.POINTS}</TableHead>
                <TableHead className="hidden md:table-cell text-[#A37A36]">{t.LEADERBOARD.QUESTIONS}</TableHead>
                <TableHead className="hidden md:table-cell text-[#A37A36]">{t.LEADERBOARD.BADGE}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((user, idx) => (
                <TableRow
                  key={user.id}
                  className={`
                    ${idx % 2 === 0 ? "bg-[#FFF8DA] hover:bg-[#FFECB3]" : "bg-[#FFF3BD] hover:bg-[#FFECB3]"}
                    transition-colors
                    `}
                  style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700 }}
                >
                  <TableCell className="font-semibold">
                    <div className="flex items-center justify-center">{getRankIcon(user.rank, t)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3 border-2 border-[#FFCA52] shadow-sm">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-[#825A20]">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-[#FFA42B]">{user.score.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell text-[#A17D3A]">{user.questions}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={getBadgeVariant(user.badge, t)}>{user.badge}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className="rounded-lg bg-[#FFF6E0] border border-[#FFD047] text-[#C48829] hover:bg-[#FFECB3] transition" href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="rounded-lg bg-[#FFD047] text-[#7C6020] border-none font-bold" href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="rounded-lg bg-[#FFF6E0] text-[#C48829] hover:bg-[#FFECB3]" href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink className="rounded-lg bg-[#FFF6E0] text-[#C48829] hover:bg-[#FFECB3]" href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className="rounded-lg bg-[#FFF6E0] border border-[#FFD047] text-[#C48829] hover:bg-[#FFECB3] transition" href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
