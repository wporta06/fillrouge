import "./featuredInfo.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [NumberOfsells, setNumberOfsells] = useState(0);

  const [totalsales, setTotalsales] = useState('0');

  useEffect(() => {
    // to get total sells mad
    const getOrders = async () => {
      try {

        let sum = 0;
        const res = await userRequest.get("orders");
        setNumberOfsells(res.data.length);
        const summ = res.data.map(order => order.amount)
        console.log(summ)
        
        for (let i = 0; i < summ.length; i++) {
          sum += summ[i];
          setTotalsales(sum);
          // console.log(totalsales)
        }
      } catch { }
    };
    getOrders();


  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Revenue: </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">MAD {totalsales}</span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Total Sales:</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"> {NumberOfsells} </span>
          
        </div>
      </div>
    </div>
  );
}
