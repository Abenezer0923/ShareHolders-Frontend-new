import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState, useEffect } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import YoutubeComplaxes from "views/admin/default/components/YoutubePu";
import ComplexTable from "views/admin/default/components/ComplexTable";
import History from "views/admin/default/components/History";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import {
  columnsDataCheck,
  columnsHistoryCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import axios from "axios";
import Cookies from "js-cookie";

const UserReports = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("jwt");
        console.log("this is", token);

        const response = await axios.get(
          "https://api.purposeblacketh.com/api/shareHolder/dashBoard/",
          {
            withCredentials: true,
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log("response", response);

        const apiData = response.data.data;
        console.log("apiData", apiData);
        console.log("api total", apiData.shareCatagoryTotal);

        let shareCatagoryTotalArray = [];

        // Check if shareCatagoryTotal is an object, convert it to an array
        if (apiData.shareCatagoryTotal && typeof apiData.shareCatagoryTotal === 'object') {
          shareCatagoryTotalArray = Object.values(apiData.shareCatagoryTotal);
        } else if (Array.isArray(apiData.shareCatagoryTotal)) {
          shareCatagoryTotalArray = apiData.shareCatagoryTotal;
        }

        const lists = shareCatagoryTotalArray.map((item) => item._id);
        console.log("Algo", lists);

        const idxOfOrdinary = lists.indexOf("ordinary");
        const idxOfFranchise = lists.indexOf("franchise");
        const idxOfTsm = lists.indexOf("tsm");
        let valueOfTsm = 0;
        let valueOfOrdinary = 0;
        let valueOfFranchise = 0;

        if (idxOfOrdinary !== -1) {
          valueOfOrdinary = shareCatagoryTotalArray[idxOfOrdinary].total;
        }
        if (idxOfFranchise !== -1) {
          valueOfFranchise = shareCatagoryTotalArray[idxOfFranchise].total;
        }
        if (idxOfTsm !== -1) {
          valueOfTsm = shareCatagoryTotalArray[idxOfTsm].total;
        }

        const res = { obj: apiData.payment_history.slice(0, 3) };
        const curr = { ans: apiData.completedShareInfo.slice(0, 3) };
        console.log("currr", curr);

        const franchiseData = {
          name: "Franchise",
          growth: "buy",
          value: `${valueOfFranchise}`,
        };
        const ordinaryData = {
          name: "Ordinary",
          growth: "buy",
          value: `${valueOfOrdinary}`,
        };
        const tsmData = {
          name: "TSM",
          growth: "buy",
          value: `${valueOfTsm}`,
        };
        const totalData = {
          name: "Total",
          value:
            parseInt(franchiseData.value) +
            parseInt(ordinaryData.value) +
            parseInt(tsmData.value),
        };

        setData({
          franchiseData,
          ordinaryData,
          tsmData,
          totalData,
          checkTableData: res.obj,
          shareInfo: curr.ans,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set default values or placeholder data
        setData({
          franchiseData: { name: "Franchise", growth: "buy", value: "N/A" },
          ordinaryData: { name: "Ordinary", growth: "buy", value: "N/A" },
          tsmData: { name: "TSM", growth: "buy", value: "N/A" },
          totalData: { name: "Total", value: "N/A" },
          checkTableData: [],
          shareInfo: [],
        });
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once

  if (!data) {
    // Render loading state or return null
    return <div>Loading...</div>;
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        gap="25px"
        mb="20px"
      >
        <MiniStatistics {...data.franchiseData} />
        <MiniStatistics {...data.ordinaryData} />
        <MiniStatistics {...data.tsmData} />
        <MiniStatistics {...data.totalData} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />

        <YoutubeComplaxes
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CheckTable
          columnsData={columnsDataCheck}
          tableData={data.checkTableData}
        />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <History columnsData={columnsHistoryCheck} tableData={data.shareInfo} />
      </SimpleGrid>
    </Box>
  );
};

export default UserReports;
