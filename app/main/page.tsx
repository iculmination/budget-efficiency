import { getCurrentUser } from "@/lib/actions/user.actions";

const MainPage = async () => {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-6 grid-rows-3 w-full h-full gap-6">
        <div className="bg-gray-100 rounded-lg">
          <h1 className="h1">Dashboard</h1>
        </div>

        <div className="bg-gray-100 rounded-lg"></div>
        <div className="bg-gray-100 rounded-lg col-span-2"></div>
        <div className="bg-gray-100 rounded-lg"></div>
        <div className="bg-gray-100 rounded-lg"></div>
        <div className="bg-gray-100 rounded-lg col-span-3"></div>
        <div className="bg-gray-100 rounded-lg"></div>
        <div className="bg-gray-100 rounded-lg"></div>
        <div className="bg-gray-100 rounded-lg row-span-2"></div>
        <div className="bg-gray-100 rounded-lg"></div>
        <div className="bg-gray-100 rounded-lg col-span-2"></div>
        <div className="bg-gray-100 rounded-lg"></div>
        <div className="bg-gray-100 rounded-lg"></div>
      </div>
    </div>
  );
};

export default MainPage;
