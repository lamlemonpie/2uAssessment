import React from "react";
import { io } from "socket.io-client";
import client from "../client";
import endpoints from "../endpoints";
import { Invoice } from "../interfaces/Invoice";

const socket = io("http://localhost:3000");

export const useQuery = () => {
  socket.on("connect", () => {
    console.log("Client connected");
  });

  const [invoices, setInvoices] = React.useState<Invoice[]>([]);

  const runAsyncFunc = React.useCallback(
    (promise: Promise<any>, callback: (data: any) => void) => {
      promise
        .then((data) => {
          console.log("Request ended succesfully", data);
          callback(data);
        })
        .catch((error) => {
          console.log("error:", error);
        });
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
      () => {
        const newInvoices = invoices.filter((value) => {
          return value.id !== id;
        });

        setInvoices(newInvoices);
      }
    );
  };

  React.useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  React.useEffect(() => {
    socket.on("INVOICE_CREATED", (res) => {
      setInvoices([res, ...invoices]);
    });
  }, [invoices]);

  return { getInvoices, approveInvoice, invoices };
};
