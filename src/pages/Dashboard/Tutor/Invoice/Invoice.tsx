/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import InvoicePreview from "../../../../components/Dashboard/Tutor/InvoicePage/InvoicePreview/InvoicePreview";
import InvoiceCard from "../../../../components/Dashboard/Tutor/InvoicePage/InvoiceCard/InvoiceCard";
import { useGetAllTutorsInvoicesQuery } from "../../../../redux/Features/Invoice/invoiceApi";
import Loader from "../../../../components/Reusable/Loader/Loader";
import type { TInvoice } from "../../../../types/invoice.types";
import NoData from "../../../../components/Reusable/NoData/NoData";

const Invoice = () => {
  const {
    data: allInvoicesData,
    isLoading,
    isFetching,
  } = useGetAllTutorsInvoicesQuery({});
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  return (
    <div className="font-Nunito">
      {isLoading || isFetching ? (
        <div className="py-10">
          <Loader size="lg" text="Please wait..." />
        </div>
      ) : !selectedInvoice ? (
        allInvoicesData?.data && allInvoicesData.data.length > 0 ? (
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
          <NoData />
        )
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
