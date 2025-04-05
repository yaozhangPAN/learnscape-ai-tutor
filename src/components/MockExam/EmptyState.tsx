
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

type EmptyStateProps = {
  resetFilters: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({ resetFilters }) => {
  return (
    <div className="p-8 text-center bg-white rounded-3xl shadow-sm border-2 my-6">
      <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold mb-2">No Papers Found</h3>
      <p className="text-gray-500 mb-4">
        We couldn't find any papers matching your filters. Try adjusting your search criteria.
      </p>
      <Button variant="outline" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );
};

export default EmptyState;
