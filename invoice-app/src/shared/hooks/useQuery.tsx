import React from "react";
import client from "../client";
import endpoints from "../endpoints";
import { Invoice } from "../interfaces/Invoice";

export const useQuery = () => {
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);

  const runAsyncFunc = React.useCallback(
    (promise: Promise<any>, callback: (data: any) => void) => {
      promise.then(
        (data) => {
          callback(data);
        },
        (error) => {
          console.log("error:", error);
        }
      );
    },
    []
  );

  const getInvoices = React.useCallback(() => {
    runAsyncFunc(client("GET", endpoints.pedingInvoices), (data: Invoice[]) => {
      setInvoices(data);
    });
  }, [runAsyncFunc]);

  const approveInvoice = (id: number) => {
    runAsyncFunc(
      client("PUT", endpoints.updateInvoice + id, { status: "approved" }),
      () => {}
    );
  };

  React.useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  return { getInvoices, approveInvoice, invoices };
};
