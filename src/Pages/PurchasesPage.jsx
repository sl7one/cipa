import React from "react";
import AddNewBtn from "../components/AddNewBtn/AddNewBtn";
import PurcasesList from "../components/PurcasesList/PurcasesList";

export default function PurchasesPage() {
  return (
    <div>
      <AddNewBtn path="/purchases/new" />
      <PurcasesList />
    </div>
  );
}
