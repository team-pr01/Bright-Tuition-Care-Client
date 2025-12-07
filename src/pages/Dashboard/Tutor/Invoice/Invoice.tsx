/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import InvoicePreview from "../../../../components/Dashboard/Tutor/InvoicePage/InvoicePreview/InvoicePreview";
import InvoiceCard from "../../../../components/Dashboard/Tutor/InvoicePage/InvoiceCard/InvoiceCard";
import type { TInvoice } from "../../../../types/invoice.types";
import NoData from "../../../../components/Reusable/NoData/NoData";
import { useGetMyInvoicesQuery } from "../../../../redux/Features/Invoice/invoiceApi";
import LogoLoader from "../../../../components/Reusable/LogoLoader/LogoLoader";

const Invoice = () => {
  const {
    data: allInvoicesData,
    isLoading,
    isFetching,
  } = useGetMyInvoicesQuery({});

  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const isLoadingState = isLoading || isFetching;
  const hasInvoices = allInvoicesData?.data?.length > 0;

  if (isLoadingState) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-Nunito">
        <LogoLoader />
      </div>
    );
  }

  if (!selectedInvoice && !hasInvoices) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-Nunito">
        <NoData />
      </div>
    );
  }

  return (
    <div className="font-Nunito">
      {!selectedInvoice ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {allInvoicesData.data.map((invoice: TInvoice) => (
            <InvoiceCard
              key={invoice._id}
              invoice={invoice}
              onSelect={setSelectedInvoice}
            />
          ))}
        </div>
      ) : (
        <InvoicePreview
          invoice={selectedInvoice}
          onBack={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};

export default Invoice;