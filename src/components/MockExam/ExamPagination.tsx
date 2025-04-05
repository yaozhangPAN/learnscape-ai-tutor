
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ExamPaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

const ExamPagination: React.FC<ExamPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage 
}) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="p-4 border-t border-gray-200">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
              return page === 1 || 
                     page === totalPages || 
                     (page >= currentPage - 1 && page <= currentPage + 1);
            })
            .map((page, index, array) => {
              const shouldShowEllipsisAfter = index < array.length - 1 && array[index + 1] - page > 1;
              
              return (
                <React.Fragment key={page}>
                  <PaginationItem>
                    <PaginationLink 
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  
                  {shouldShowEllipsisAfter && (
                    <PaginationItem>
                      <span className="flex h-9 w-9 items-center justify-center">...</span>
                    </PaginationItem>
                  )}
                </React.Fragment>
              );
            })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ExamPagination;
