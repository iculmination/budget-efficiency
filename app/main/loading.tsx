import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default Loading;
