import React from "react";
import ClientsList from "../components/ClientsList/ClientsList";
import ModalUpdateClient from "../components/ModalUpdateClient/ModalUpdateClient";

export default function ClientsPage() {
  return (
    <>
      <ClientsList />
      <ModalUpdateClient />
    </>
  );
}
