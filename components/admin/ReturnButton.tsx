'use client'

import { updateBorrowStatus } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReturnButton({ borrowId }: { borrowId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  
  const handleReturn = async () => {
    setIsLoading(true);
    try {
      const result = await updateBorrowStatus(borrowId);
      if (result.success) {
        router.refresh(); // Reîncarcă datele
        // Opțional: Poți adăuga un toast sau altă notificare
      }
    } catch (error) {
      console.error("Error returning book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleReturn}
      disabled={isLoading}
      className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed ${
        isLoading ? 'animate-pulse' : ''
      }`}
    //  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
    >
      {isLoading ? 'Se procesează...' : 'returnat ?'}
    </button>
  );
}