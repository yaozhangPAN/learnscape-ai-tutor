
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

const getBadgeVariant = (badge: string) => {
  switch (badge) {
    case "Expert":
      return "default";
    case "Advanced":
      return "secondary";
    case "Intermediate":
      return "outline";
    default:
      return "outline";
  }
};

const getRankIcon = (rank: number) => {
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

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredData = leaderboardData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-learnscape-blue to-learnscape-purple py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Leaderboard
          </h1>
          <p className="text-lg text-white text-center max-w-2xl mx-auto">
            Recognizing our top performers who've demonstrated exceptional dedication and achievement in their learning journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Top 3 showcase */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Award className="mr-2 text-learnscape-blue" /> Top Achievers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaderboardData.slice(0, 3).map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className={`text-center ${
                  user.rank === 1 ? "bg-yellow-50" : 
                  user.rank === 2 ? "bg-gray-50" : "bg-amber-50"
                }`}>
                  <div className="flex justify-center mb-4">
                    {getRankIcon(user.rank)}
                  </div>
                  <div className="flex justify-center mb-2">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-4">
                  <div className="mb-2">
                    <Badge variant={getBadgeVariant(user.badge)}>{user.badge}</Badge>
                  </div>
                  <p className="text-2xl font-bold text-learnscape-blue">{user.score.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Points</p>
                  <p className="mt-2 text-gray-600">{user.questions} Questions Answered</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-learnscape-blue"
            />
          </div>
        </div>

        {/* Leaderboard table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead className="hidden md:table-cell">Questions</TableHead>
                  <TableHead className="hidden md:table-cell">Badge</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center justify-center">
                        {getRankIcon(user.rank)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{user.score.toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.questions}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={getBadgeVariant(user.badge)}>{user.badge}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
