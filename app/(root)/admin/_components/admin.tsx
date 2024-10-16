'use client'

import { useUser } from "@clerk/nextjs";
import React from "react";

const Admin: React.FC = () => {
    const { user } = useUser();

    if (!user) {
        return <div>Du måste vara inloggad som administratör för att få åtkomst till denna sida.</div>;
    }

    const isAdmin = user.publicMetadata?.isAdmin || false;

    if (!isAdmin) {
        return <div>Unauthorized</div>;
    }

    return (
        <div>
            <h1>Admin</h1>
            <p>Welcome to the admin dashboard</p>
        </div>
    );

}

export default Admin;