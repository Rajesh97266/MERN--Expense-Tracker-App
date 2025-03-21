import React from "react";
import TransactionList from "../../../Templates/Transactions/TransactionList";
import TransactionChart from "../../../Templates/Transactions/TransactionChart";
import FilterSection from "../../../Templates/Transactions/FilterSection";

const Dashboard = () => {
  return (
    <>
      <TransactionChart />
      <FilterSection />
    </>
  );
};

export default Dashboard;
