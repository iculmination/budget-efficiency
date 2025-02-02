import React from "react";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className="absolute bottom-0 w-[calc(100%-3rem)] mb-6"
    >
      {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Submit"}
    </Button>
  );
};

export default SubmitButton;
