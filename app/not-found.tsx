import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-2">
      <h1 className="h1">This page does not exist</h1>
      <Link href="/main">
        <Button className="" size="lg">
          To Dashboard <ArrowBigRight />
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
