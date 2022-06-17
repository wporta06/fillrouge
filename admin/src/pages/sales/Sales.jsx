import "./sales.css";
import "./popup.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import "../../components/widgetLg/widgetLg.css";
import { format } from "timeago.js"

export default function Sales() {
  const [data, setData] = useState(userRows);
  const [orders, setOrders] = useState([]);



  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        // const datatojson = JSON.parse(res.data)
        setOrders(res.data);
      } catch { }
    };
    getOrders();
  }, []);
  console.log(orders);
  // console.log(data);
  // console.log(orders[0]);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };


  setTimeout(function () { //Start the timer
    const toggleBtn = document.querySelector(".togglePopup");
    const popup = document.querySelector(".popup");

    const removePopup = () => {
      popup.classList.remove("visible");
      document.onclick = null;
    };

    toggleBtn.addEventListener("click", (e) => {
      console.log("first")
      popup.classList.add("visible");
      e.stopPropagation();
      document.onclick = removePopup;
    });

    popup.onclick = (e) => {

      e.stopPropagation();
    }

  }, 1000)

  {

  }

  return (

    <div className="widgetLg" >
      <h3 className="widgetLgTitle">sales</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Address</th>
          <th className="widgetLgTh">Phone</th>
          <th className="widgetLgTh">Products</th>
          <th className="widgetLgTh">Amount (MAD)</th>
          <th className="widgetLgTh">Status</th>
          <th className="widgetLgTh">Edit Status</th>
        </tr>

        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.userName}</span>
            </td>

            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgDate">{order.address}</td>
            <td className="widgetLgDate">0632323433</td>
            <td className="widgetLgDate">
              {/* <button>({order.products.length}) Product</button> */}
              <button class="togglePopup">({order.products.length}) Product</button>
              <div class="popup">
                <div style={{ width: "33em", fontWeight: "bold" }}>
                  {order.products.map((product) => (<div> PRODUCT: {product.productId} QUANTITY: {product.quantity}</div>))}
                </div>
              </div>
            </td>
            <td className="widgetLgDate">{order.amount}</td>
            <td className="widgetLgDate">{order.status}</td>
            <td className="widgetLgDate">
              <div class="box">
                <select>
                  <option>Panding</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Canceled</option>
                </select>
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );

}

