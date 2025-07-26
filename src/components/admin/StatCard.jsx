import React from "react";

const StatCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`flex items-center p-4 rounded-xl shadow-md text-white ${bgColor}`}>
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
