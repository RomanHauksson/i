"use client";

import {
  Card,
  Title,
  Text,
  LineChart,
  TabList,
  Tab,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

import { useState } from "react";
import { startOfYear, subDays } from "date-fns";

const data = [
{
    Date: "2021.05.01",
    Price: 113.05,
    Volume: 21400410,
},
{
    Date: "2021.06.01",
    Price: 113,
    Volume: 29707270,
},
{
    Date: "2021.07.01",
    Price: 95.32,
    Volume: 45187420,
},
{
    Date: "2021.08.01",
    Price: 98.12,
    Volume: 31287420,
},
{
    Date: "2021.09.01",
    Price: 102.45,
    Volume: 28787420,
},
{
    Date: "2021.10.01",
    Price: 105.67,
    Volume: 25187420,
},
{
    Date: "2021.11.01",
    Price: 110.23,
    Volume: 21487420,
},
{
    Date: "2021.12.01",
    Price: 115.67,
    Volume: 18787420,
},
{
    Date: "2022.01.01",
    Price: 120.45,
    Volume: 17487420,
},
{
    Date: "2022.02.01",
    Price: 125.67,
    Volume: 15187420,
},
{
    Date: "2022.03.01",
    Price: 130.23,
    Volume: 12887420,
},
{
    Date: "2022.04.01",
    Price: 135.67,
    Volume: 10787420,
},
{
    Date: "2022.05.01",
    Price: 140.45,
    Volume: 9487420,
},
{
    Date: "2022.06.01",
    Price: 145.67,
    Volume: 7877420,
},
{
    Date: "2022.07.01",
    Price: 150.23,
    Volume: 6287420,
},
{
    Date: "2022.08.01",
    Price: 155.67,
    Volume: 4717420,
},
{
    Date: "2022.09.01",
    Price: 160.45,
    Volume: 3147420,
},
{
    Date: "2022.10.01",
    Price: 165.67,
    Volume: 1577420,
},
{
    Date: "2022.11.01",
    Price: 170.23,
    Volume: 87420,
},
{
    Date: "2022.12.01",
    Price: 175.67,
    Volume: 0,
},
{
    Date: "2023.01.01",
    Price: 180.45,
    Volume: 0,
},
{
    Date: "2023.02.01",
    Price: 185.67,
    Volume: 0,
},
{
    Date: "2023.03.01",
    Price: 190.23,
    Volume: 0,
},
{
    Date: "2023.04.01",
    Price: 195.67,
    Volume: 0,
},
{
    Date: "2023.05.01",
    Price: 200.45,
    Volume: 0,
},
{
    Date: "2023.06.01",
    Price: 205.67,
    Volume: 0,
},
{
    Date: "2023.07.01",
    Price: 210.23,
    Volume: 0,
},
{
    Date: "2023.08.01",
    Price: 215.67,
    Volume: 0,
},
{
    Date: "2023.09.01",
    Price: 220.45,
    Volume: 0,
},
{
    Date: "2023.10.01",
    Price: 225.67,
    Volume: 0,
},
{
    Date: "2023.11.01",
    Price: 230.23,
    Volume: 0,
},
{
    Date: "2023.12.01",
    Price: 235.67,
    Volume: 0,
},
];

const periods = ["1M", "2M", "6M", "YTD", "Max"];

const dataFormatter = (number: number) => `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export default function PortfolioValue() {
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  const getDate = (dateString: string) => {
    const [day, month, year] = dateString.split(".").map(Number);
    return new Date(year, month - 1, day);
  };

  const filterData = (startDate: Date, endDate: Date) =>
    data.filter((item) => {
      const currentDate = getDate(item.Date);
      return currentDate >= startDate && currentDate <= endDate;
    });

  const getFilteredData = (period: number) => {
    const lastAvailableDate = getDate(data[data.length - 1].Date);
    const periodName = periods[period];
    switch (periodName) {
      case "1M": {
        const periodStartDate = subDays(lastAvailableDate, 30);
        return filterData(periodStartDate, lastAvailableDate);
      }
      case "2M": {
        const periodStartDate = subDays(lastAvailableDate, 60);
        return filterData(periodStartDate, lastAvailableDate);
      }
      case "6M": {
        const periodStartDate = subDays(lastAvailableDate, 180);
        return filterData(periodStartDate, lastAvailableDate);
      }
      case "YTD": {
        const periodStartDate = startOfYear(lastAvailableDate);
        return filterData(periodStartDate, lastAvailableDate);
      }
      default:
        return data;
    }
  };

  return (
    <Card>
      <Title>portfolio value</Title>
      <TabGroup index={selectedPeriod} onIndexChange={setSelectedPeriod} className="mt-10">
        <TabList variant="line">
          <Tab>1M</Tab>
          <Tab>2M</Tab>
          <Tab>6M</Tab>
          <Tab>YTD</Tab>
          <Tab>Max</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LineChart
              className="h-80 mt-8"
              data={getFilteredData(selectedPeriod)}
              index="Date"
              categories={["Price"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              showLegend={false}
              yAxisWidth={48}
            />
          </TabPanel>
          <TabPanel>
            <LineChart
              className="h-80 mt-8"
              data={getFilteredData(selectedPeriod)}
              index="Date"
              categories={["Price"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              showLegend={false}
              yAxisWidth={48}
            />
          </TabPanel>
          <TabPanel>
            <LineChart
              className="h-80 mt-8"
              data={getFilteredData(selectedPeriod)}
              index="Date"
              categories={["Price"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              showLegend={false}
              yAxisWidth={48}
            />
          </TabPanel>
          <TabPanel>
            <LineChart
              className="h-80 mt-8"
              data={getFilteredData(selectedPeriod)}
              index="Date"
              categories={["Price"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              showLegend={false}
              yAxisWidth={48}
            />
          </TabPanel>
          <TabPanel>
            <LineChart
              className="h-80 mt-8"
              data={getFilteredData(selectedPeriod)}
              index="Date"
              categories={["Price"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              showLegend={false}
              yAxisWidth={48}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
}
