"use client";
 
import { ArrowRight } from 'lucide-react';
import { updateUserRole, approveUserRegistration } from "@/lib/actions/admin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/constants/interfaces";
 
// Definește un tip de uniune pentru roluri
type Role = "ADMIN" | "USER";


function UserActions({ user }: { user: User }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
  
    const handleApprove = async () => {
      setIsLoading(true);
      try {
        const result = await approveUserRegistration(user.id);
        if (result.success) {
          router.refresh();
        }
      } catch (error) {
        console.error("Error approving user:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleRoleChange = async (newRole: Role) => {
      setIsLoading(true);
      try {
        const result = await updateUserRole(user.id, newRole);
        if (result.success) {
          router.refresh();
        }
      } catch (error) {
        console.error("Error updating role:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="flex  gap-2">
        
        {user.status === "PENDING" && (
       <div className='relative'>    
       <button
       onClick={handleApprove}
             disabled={isLoading}
       className='relative inline-flex items-center gap-1 rounded-md bg-zinc-950 px-2.5 py-1.5 text-sm text-zinc-50 outline outline-1 outline-[#fff2f21f]'>
       
       {isLoading ? "Se procesează..." : "Aprobă"} <ArrowRight className='h4 w-4' />
       </button>
     </div>
      
        )}

        <select
          value={user.role || "USER"}
          onChange={(e) => handleRoleChange(e.target.value as Role)}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
    );
  }
  
  export default UserActions;