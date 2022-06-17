import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const [totalsales, setTotalsales] = useState('0');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    getUsers();

    // const getOrders = async () => {
    //   try {
    //     const res = await userRequest.get("orders");
    //   } catch { }
    // };
    // getOrders();

    // const getsetTotalsales = () => {
    //   const summ = orders.map(order => order.amount)
    //   let sum = 0;
    //   for (let i = 0; i < summ.length; i++) {
    //     sum += summ[i];
    //   }
    //   setTotalsales(sum);
    // }
    // getsetTotalsales()

  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Users:</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
