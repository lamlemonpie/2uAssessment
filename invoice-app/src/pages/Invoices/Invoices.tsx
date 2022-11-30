import React from "react";
import { Button, Popconfirm, Table } from "antd";
import { useQuery } from "../../shared/hooks/useQuery";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: number;
  invoiceNumber: string;
  vendorName: string;
  vendorAddress: string;
  invoiceTotal: string;
  invoiceDate: string;
  dueDate: string;
}

export const Invoices = () => {
  const { invoices, approveInvoice } = useQuery();

  const dataSource: DataType[] = invoices.map((invoice) => {
    return {
      key: invoice.id,
      invoiceNumber: invoice.invoice_number,
      vendorName: invoice.vendor_name,
      vendorAddress: invoice.remittance_address,
      invoiceTotal: `${invoice.currency} ${invoice.total}`,
      invoiceDate: invoice.invoice_date,
      dueDate: invoice.due_date,
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: "Vendor Address",
      dataIndex: "vendorAddress",
      key: "vendorAddress",
    },
    {
      title: "Invoice Total",
      dataIndex: "invoiceTotal",
      key: "invoiceTotal",
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "",
      key: "approve",
      render: (_: any, record: DataType) => (
        <Popconfirm
          title="Approve invoice?"
          onConfirm={() => approveInvoice(record.key)}
        >
          <Button>Approve</Button>
        </Popconfirm>
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};
