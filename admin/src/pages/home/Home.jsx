import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {

  return (
    <div className="home">
      <FeaturedInfo />
      <div className="homeWidgets">
        <WidgetLg />
        <WidgetSm />
      </div>
    </div>
  );
}
