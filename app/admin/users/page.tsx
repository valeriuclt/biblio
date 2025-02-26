import Ovrview from "@/components/admin/ovrview";
import UserActions from "@/components/admin/UserA";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { getInitials } from "@/lib/utils";
import { count, eq, desc } from "drizzle-orm";


const page = async () => {
  const borrowB = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      createdAt: users.createdAt, // adăugăm data înscrierii
      status: users.status,
      role: users.role,
      universityId: users.universityId,
      borrowCount: count(borrowRecords.id),
    })
    .from(users)
    .innerJoin(borrowRecords, eq(users.id, borrowRecords.userId))
    .groupBy(
      users.id,
      users.fullName,
      users.email,
      users.createdAt,
      users.status,
      users.role,
      users.universityId
    ) // trebuie inclus în groupBy
    .orderBy(desc(count(borrowRecords.id)));
  // .limit(10);

  // Formatăm data pentru afișare
  const userBorrow = borrowB.map((item) => ({
    id: item.id,
    fullName: item.fullName,
    email: item.email,
    status: item.status,
    role: item.role,
    universityId: item.universityId,
    createdAt: item.createdAt
      ? item.createdAt.toLocaleDateString("ro-RO", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Dată necunoscută",
    borrowCount: Number(item.borrowCount),
  }));

  return (
    <>
      <Ovrview />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Utilizatorii bibliotecii
        </h1>

        <div className="flex flex-wrap gap-6 justify-start">
          {userBorrow.map((util) => (
            <div
              key={util.id}
              className="w-[320px] p-4 pb-1 bg-white shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold text-lg">
                      {getInitials(util.fullName || "IN")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 truncate ">
                    {util.fullName}
                  </p>
                  <p className="text-sm text-gray-500 truncate ">
                    {util.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    ID Universitate: {util.universityId}
                  </p>

                  <div className="flex flex-col space-y-2"></div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-gray-600">
                    Membru din{" "}
                    <span className="font-medium">{util.createdAt}</span>
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-600">
                    <span className="font-medium">{util.borrowCount}</span>{" "}
                    cărți împrumutate
                  </span>
                </div>

                <div className="flex justify-end space-x-2 mt-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        util.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {util.status}
                    </span>
                    <UserActions user={util} />
                  </div>
                </div>
              </div>

              {/* ... celelalte carduri folosind stats */}
            </div>
          ))}
        </div>
      </div>
     
    </>
  );
};

export default page;
