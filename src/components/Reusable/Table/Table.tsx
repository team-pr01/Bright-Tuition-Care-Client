/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { ICONS } from "../../../assets";

export type TableHead = {
  key: string; // key to read from data row
  label: string; // column header text
  className?: string; // optional additional classes for th
};

export type TableAction<T> = {
  label: any;
  onClick: (row: T) => void;
};

type Props<T extends Record<string, any>> = {
  title?: string;
  description?: string;
  theads: TableHead[];
  data: T[];
  actions?: TableAction<T>[];
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  onSearch?: (q: string) => void;
  className?: string;
};

// Reusable Table component
export default function Table<T extends Record<string, any>>({
  title = "",
  description = "",
  theads,
  data,
  actions = [],
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  isLoading = false,
  onSearch,
  className = "",
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);
  const [closingMenuId, setClosingMenuId] = useState<string | number | null>(
    null
  );
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      // if there's no open menu nothing to do
      if (!openMenuId) return;

      const menu = menuRef.current;
      if (!menu) return;

      if (!menu.contains(e.target as Node)) {
        // begin smooth close
        setClosingMenuId(openMenuId);
        // after animation remove
        setTimeout(() => {
          setOpenMenuId(null);
          setClosingMenuId(null);
        }, 180); // match transition time in CSS
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape" && openMenuId) {
        setClosingMenuId(openMenuId);
        setTimeout(() => {
          setOpenMenuId(null);
          setClosingMenuId(null);
        }, 180);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [openMenuId]);

  useEffect(() => {
    // notify parent of search change (debounced simple implementation)
    if (!onSearch) return;
    const t = setTimeout(() => onSearch(query), 300);
    return () => clearTimeout(t);
  }, [query, onSearch]);

  const handleToggleMenu = (id: string | number) => {
    if (openMenuId === id) {
      // smooth close
      setClosingMenuId(id);
      setTimeout(() => {
        setOpenMenuId(null);
        setClosingMenuId(null);
      }, 180);
    } else {
      setOpenMenuId(id);
      setClosingMenuId(null);
    }
  };

  const goToPage = (p: number) => {
    if (!onPageChange) return;
    const page = Math.max(1, Math.min(totalPages || 1, p));
    onPageChange(page);
  };

  return (
    <div
      className={`w-full bg-white dark:bg-slate-900 rounded-lg shadow-sm p-4 font-Nunito ${className}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          {description && (
            <p className="text-sm text-slate-500">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div>
            <input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input input-sm px-3 py-2 border border-neutral-55/60 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm w-56"
              aria-label="Search table"
            />
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Loader overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80">
            <div className="animate-pulse text-sm text-slate-600">
              Loading...
            </div>
          </div>
        )}

        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full table-auto border-collapse">
            <thead className="sticky top-0 z-10 bg-white">
              <tr>
                {theads.map((th) => (
                  <th
                    key={th.key}
                    className={`p-3 text-left text-sm font-medium text-slate-600 ${
                      th.className ?? ""
                    } whitespace-nowrap border-b border-neutral-55/90`}
                  >
                    {th.label}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="p-3 text-right text-sm font-medium text-slate-600 whitespace-nowrap border-b border-neutral-55/60">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="bg-white">
              {!isLoading && data.length === 0 && (
                <tr>
                  <td
                    colSpan={theads.length + (actions.length ? 1 : 0)}
                    className="p-6 text-center text-sm text-slate-500"
                  >
                    No data found!
                  </td>
                </tr>
              )}

              {data.map((row, idx) => {
                const rowId = (row.id ?? row._id ?? idx) as string | number;
                return (
                  <tr
                    key={rowId}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {theads.map((th) => {
                      const cellValue = row[th.key as keyof typeof row];
                      return (
                        <td
                          key={String(th.key)}
                          className="p-3 text-sm align-top whitespace-nowrap border-b border-neutral-55/60 max-w-xs overflow-hidden text-ellipsis"
                        >
                          {React.isValidElement(cellValue)
                            ? cellValue
                            : String(cellValue ?? "")}
                        </td>
                      );
                    })}

                    {actions.length > 0 && (
                      <td className="p-3 text-sm border-b border-neutral-55/60 text-right relative">
                        <div className="inline-block relative">
                          <button
                            onClick={() => handleToggleMenu(rowId)}
                            className="cursor-pointer"
                            aria-expanded={openMenuId === rowId}
                            aria-controls={`menu-${rowId}`}
                          >
                            <img
                              src={ICONS.threeDots}
                              alt="three-dots"
                              className="size-5"
                            />
                          </button>

                          {/* Dropdown - keep mounted for smooth transitions */}
                          <div
                            ref={openMenuId === rowId ? menuRef : null}
                            id={`menu-${rowId}`}
                            role="menu"
                            className={
                              `bg-white origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg transform transition-all duration-150 ease-out z-30 ` +
                              (openMenuId === rowId && closingMenuId !== rowId
                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                                : openMenuId === rowId &&
                                  closingMenuId === rowId
                                ? "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                                : "opacity-0 scale-95 -translate-y-1 pointer-events-none")
                            }
                          >
                            <div className="py-1">
                              {actions.map((act, i) => (
                                <button
                                  key={i}
                                  onClick={() => {
                                    act.onClick(row);
                                    // close smoothly
                                    setClosingMenuId(rowId);
                                    setTimeout(() => {
                                      setOpenMenuId(null);
                                      setClosingMenuId(null);
                                    }, 180);
                                  }}
                                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 cursor-pointer"
                                >
                                  {act.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-3 flex justify-end items-center gap-2">
        <div className="flex items-center gap-2 text-xs lg:text-sm">
          {/* Prev Button */}
          <button
            onClick={() => goToPage((currentPage || 1) - 1)}
            disabled={currentPage <= 1}
            className={`px-3 py-1 rounded-md border border-neutral-55/60 disabled:opacity-50 disabled:cursor-not-allowed 
        ${currentPage > 1 ? "cursor-pointer bg-primary-10 text-white" : ""}`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded-md border border-neutral-55/60 
          ${
            currentPage === page
              ? "bg-primary-10 text-white"
              : "hover:bg-primary-10 hover:text-white cursor-pointer"
          }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => goToPage((currentPage || 1) + 1)}
            disabled={currentPage >= (totalPages || 1)}
            className={`px-3 py-1 rounded-md border border-neutral-55/60 disabled:opacity-50 disabled:cursor-not-allowed 
        ${
          currentPage < totalPages
            ? "cursor-pointer bg-primary-10 text-white"
            : ""
        }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
