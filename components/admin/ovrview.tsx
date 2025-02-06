
import { getMonthlyBorrowStats, getOverviewStats } from "@/lib/actions/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, BookOpen, Clock, Users } from "lucide-react";
import BorrowChart from "./BorrowChart";
import { Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Ovrview = async () => {
  const stats = await getOverviewStats();
  const graf = await getMonthlyBorrowStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent> 
          <div className="text-2xl font-bold">
            {stats.totalUsers} utilizatori
          </div>
          <p className="text-xs text-muted-foreground">
            +{stats.newUsersThisMonth} this month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Books</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBooks}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.newBook}new additions
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Borrows</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeLoans}</div>
          <p className="text-xs text-muted-foreground">
            {stats.weekLoans} due this week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Approvals
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingUsers}</div>
          <p className="text-xs text-muted-foreground">Requires attention</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Borrowing Statistics</CardTitle>
          <CardDescription>Number of books borrowed per month</CardDescription>
        </CardHeader>

        <CardContent className="h-[300px]">
          <BorrowChart data={graf}/>
          {/* <ResponsiveContainer width="100%" height="100%">
            <BorrowChart data={graf}>
               <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#93c5fd" /> 
            </BorrowChart>
            
          </ResponsiveContainer> */}
        </CardContent>
      </Card>
    </div>
  );
};
export default Ovrview;

// import {  getOverviewStats } from "@/lib/actions/admin";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { AlertCircle, BookOpen, Clock, Users } from "lucide-react";
// // import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
// // import BorrowChart from "./BorrowChart";

// const Overview = async () => {
//   const stats = await getOverviewStats();
// //   const graf = await getMonthlyBorrowStats();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//           <Users className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">
//             {stats.totalUsers} utilizatori
//           </div>
//           <p className="text-xs text-muted-foreground">
//             +{stats.newUsersThisMonth} this month
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-sm font-medium">Total Books</CardTitle>
//           <BookOpen className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.totalBooks}</div>
//           <p className="text-xs text-muted-foreground">
//             +{stats.newBook} new additions
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-sm font-medium">Active Borrows</CardTitle>
//           <Clock className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.activeLoans}</div>
//           <p className="text-xs text-muted-foreground">
//             {stats.weekLoans} due this week
//           </p>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-sm font-medium">
//             Pending Approvals
//           </CardTitle>
//           <AlertCircle className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.pendingUsers}</div>
//           <p className="text-xs text-muted-foreground">Requires attention</p>
//         </CardContent>
//       </Card>

//       {/* Card pentru grafic */}
//       {/* <Card>
//         <CardHeader>
//           <CardTitle>Monthly Borrowing Statistics</CardTitle>
//           <CardDescription>Number of books borrowed per month</CardDescription>
//         </CardHeader>
//         <CardContent className="h-[300px]">
//           <BorrowChart data={graf} />
//         </CardContent>
//       </Card> */}
//     </div>
//   );
// };
// export default Overview;