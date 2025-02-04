// import React from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// interface Props {  
//     genre: string;
//     rating: number;
//     // adaugă alte proprietăți necesare
//   }

// const BookAnalytics = ({ books }:{books: Book[]} ) => {
//   // Procesare date pentru graficul de genuri
// //   const genreData = books.reduce((acc, book) => {
// //     acc[book.genre] = (acc[book.genre] || 0) + 1;
// //     return acc;
// //   }, {});

// const genreChartData =Array.from(
//     books.reduce((acc,book) =>{
//         const current = acc.get(book.genre) || 0;
//         acc.set(book.genre, current + 1);
//         return acc;
//       }, new Map<string, number>()),
//       ([genre, count]) => ({ genre, count })
//     );
// //   const genreChartData = Object.entries(genreData).map(([genre, count]) => ({
// //     genre,
// //     count
// //   }));

//   // Procesare date pentru graficul de rating
// //   const ratingData = books.reduce((acc, book) => {
// //     const rating = Math.floor(book.rating);
// //     acc[rating] = (acc[rating] || 0) + 1;
// //     return acc;
// //   }, {});

// //   const ratingChartData = Object.entries(ratingData).map(([rating, count]) => ({
// //     rating: `${rating} stele`,
// //     count
// //   }));

// const ratingChartData = Array.from(
//     books.reduce((acc, book) => {
//       const rating = Math.floor(book.rating);
//       const current = acc.get(rating) || 0;
//       acc.set(rating, current + 1);
//       return acc;
//     }, new Map<number, number>()),
//     ([rating, count]) => ({ rating: `${rating} stele`, count })
//   );

//   // Culori pentru pie chart
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
//       {/* Grafic pentru genuri */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Distribuția cărților pe genuri</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <BarChart width={400} height={300} data={genreChartData}>
//             <XAxis dataKey="genre" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" fill="#8884d8" />
//           </BarChart>
//         </CardContent>
//       </Card>

//       {/* Grafic pentru rating */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Distribuția rating-urilor</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <PieChart width={400} height={300}>
//             <Pie
//               data={ratingChartData}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="count"
//             >
//               {ratingChartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BookAnalytics;

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// const BookAnalytics = ({ books }:{ books: Book[]}) => {
//   // Procesare date pentru genuri
//   const genreCount = new Map();
//   books.forEach(book => {
//     genreCount.set(book.genre, (genreCount.get(book.genre) || 0) + 1);
//   });

//   const genreData = Array.from(genreCount, ([genre, count]) => ({
//     genre,
//     count
//   }));

//   // Procesare date pentru rating
//   const ratingCount = new Map();
//   books.forEach(book => {
//     const rating = Math.floor(book.rating);
//     ratingCount.set(rating, (ratingCount.get(rating) || 0) + 1);
//   });

//   const ratingData = Array.from(ratingCount, ([rating, count]) => ({
//     rating: `${rating} stele`,
//     count
//   }));

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
//       <div className="p-4 border rounded-lg shadow-sm">
//         <h3 className="text-lg font-semibold mb-4">Distribuția cărților pe genuri</h3>
//         <BarChart width={400} height={300} data={genreData}>
//           <XAxis dataKey="genre" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="count" fill="#8884d8" />
//         </BarChart>
//       </div>

//       <div className="p-4 border rounded-lg shadow-sm">
//         <h3 className="text-lg font-semibold mb-4">Distribuția rating-urilor</h3>
//         <PieChart width={400} height={300}>
//           <Pie
//             data={ratingData}
//             cx={200}
//             cy={150}
//             labelLine={false}
//             label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//             outerRadius={100}
//             fill="#8884d8"
//             dataKey="count"
//           >
//             {ratingData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </div>
//     </div>
//   );
// };

// export default BookAnalytics;
const BookAnalitics = () => {
  return (
    <div>BookAnalitics</div>
  )
}
export default BookAnalitics