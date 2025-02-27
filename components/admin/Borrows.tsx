
'use client'

import { Borrow } from "@/constants/interfaces";
import { updateBorrowStatus } from "@/lib/actions/admin";


const BorrowsPage = ({ borrows }:{borrows:Borrow[]}) =>{
  return (
    <div className="space-y-4">
      {borrows.map((borrow) => (
        <div key={borrow.id} className="p-4 border rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{borrow.book.title}</h3>
              <p className="text-sm text-gray-600">
                Împrumutat de: {borrow.user.fullName}
              </p>
            </div>
            {borrow.status === "BORROWED" && (
              <button
                onClick={async () => {
                  const result = await updateBorrowStatus(borrow.id);
                  if (result.success) {
                    // Opțional: Actualizare UI sau afișare notificare
                  }
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Marchează ca returnat
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
export default BorrowsPage