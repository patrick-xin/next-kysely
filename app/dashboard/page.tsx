import { auth } from "@/auth";

const Dashboard = async () => {
    const session = await auth()

    return (
        <div>
            Email: {session?.user?.email}
        </div>
    )
};

export default Dashboard;
