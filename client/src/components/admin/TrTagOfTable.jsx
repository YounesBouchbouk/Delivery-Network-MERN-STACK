import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const TrTagOfTable = ({ user, HandlAction }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      data-aos="zoom-in"
    >
      <Link to={`/admin/Dashboard/userprofil/${user._id}`}>
        <th
          scope="row"
          className="px-6 py-4 font-medium animate-pulse  text-blue-600 hover:text-blue-400 hover:underline whitespace-nowrap "
        >
          {user.name}
        </th>
      </Link>

      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.role}</td>
      <td className="px-6 py-4">{user.CreatedAt}</td>
      <td className="px-6 py-4 text-right">
        {!user.active ? (
          <button
            onClick={() => {
              HandlAction("activer", user._id, user.email);
            }}
            className="font-medium text-green-500 dark:text-blue-500 hover:underline"
          >
            Activé
          </button>
        ) : (
          <button
            onClick={() => {
              HandlAction("desactive", user._id, user.email);
            }}
            className="font-medium text-red-600 dark:text-blue-500 hover:underline"
          >
            Désactivé
          </button>
        )}
      </td>
    </tr>
  );
};

export default TrTagOfTable;
