// import axios from "axios";
import React from "react";
// import { Link } from "react-router-dom";
import Layout from "../../components/companie/Layout";
import PackagesTableComponent from "../../components/companie/PackagesTableComponent";
import SectionTitle from "../../components/SectionTitle";
// import { UserContext } from "../../hooks/Usercontext";

const CompaniePackages = () => {
  return (
    <Layout>
      <div className="w-full bg-slate-50 h-screen p-4 ml-14 ">
        <div className="w-full">
          <SectionTitle title={"Notre Colies"} />
        </div>

        <div className="w-full flex items-center justify-center">
          <PackagesTableComponent isOwner={true} forProfil={false} />
        </div>
      </div>
    </Layout>
  );
};

export default CompaniePackages;
