import { useState } from "react";
import Navbar from "../essentials/Navbar";
import {
  ChartCanvas,
  Chart,
  series,
  scale,
  coordinates,
  axes,
  annotation,
} from "react-financial-charts";
import { timeDay } from "d3-time";
import "chartjs-adapter-date-fns";

// Import the necessary components
const { CandlestickSeries } = series;
const { XAxis, YAxis } = axes;

export default function Dashboard() {
  const companies = [
    "Company 1",
    "Company 2",
    "Company 3",
    "Company 4",
    "Company 5",
    "Company 6",
    "Company 7",
    "Company 8",
    "Company 9",
    "Company 10",
  ];

  const [activeCompany, setActiveCompany] = useState(companies[0]);

  const candlestickData = [
    {
      date: new Date("2019-09-01"),
      open: 735.5,
      high: 737.5,
      low: 725.25,
      close: 729.75,
    },
    {
      date: new Date("2019-09-02"),
      open: 729.75,
      high: 735.75,
      low: 724.5,
      close: 727.75,
    },
    {
      date: new Date("2019-09-03"),
      open: 727.75,
      high: 729.5,
      low: 718.25,
      close: 721,
    },
    {
      date: new Date("2019-09-04"),
      open: 721,
      high: 729.75,
      low: 719,
      close: 727.5,
    },
    {
      date: new Date("2019-09-05"),
      open: 727.5,
      high: 731.75,
      low: 723,
      close: 725.75,
    },
  ];

  return (
    <>
      <div className="min-vh-100">
        <Navbar />
        <div className="d-md-flex justify-content-start">
          <div className="parent-sidebar">
            <div className="sidebar">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className={`mt-2 company-item ${
                    activeCompany === company ? "active" : ""
                  }`}
                  onClick={() => setActiveCompany(company)}
                  style={{ cursor: "pointer" }}
                >
                  <b>{company}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="content">
            <div className="greeting stylish">
              <h1 className="">
                <b>HI, NIMISH</b>
              </h1>
            </div>

            <div className="pe-4">
              <div className="analysis">
                <div className="fundamentals">
                  <table className="table table-striped table-dark table-bordered">
                    <thead>
                      <tr>
                        <td>
                          <b>COMPANY NAME</b>
                        </td>
                        <td>
                          <b>{activeCompany}</b>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>MARKET CAP</td>
                        <td>65423 CR</td>
                      </tr>
                      <tr>
                        <td>MARKET CAP</td>
                        <td>65423 CR</td>
                      </tr>
                      <tr>
                        <td>MARKET CAP</td>
                        <td>65423 CR</td>
                      </tr>
                      <tr>
                        <td>MARKET CAP</td>
                        <td>65423 CR</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <ChartCanvas
                width={600}
                height={400}
                ratio={1}
                data={candlestickData}
                seriesName="Candlestick Chart"
                xAccessor={(d) => d.date}
                xScale={scale.scaleTime()}
                xExtents={[new Date("2019-09-01"), new Date("2019-09-05")]}
                yExtents={(d) => [d.low, d.high]}
                clamp={false}
              >
                <Chart id={1} height={400} yExtents={(d) => [d.low, d.high]}>
                  <XAxis />
                  <YAxis />
                  <CandlestickSeries
                    stroke={(d) => (d.close > d.open ? "green" : "red")}
                    wickStroke={(d) => (d.close > d.open ? "green" : "red")}
                  />
                </Chart>
              </ChartCanvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
