// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue , Button, Input } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;

  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [updatePasswordMessage, setUpdatePasswordMessage] = useState("");
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `${token}`,
        };

        const response = await axios.get(
          "https://api.purposeblacketh.com/api/shareHolder/dashBoard/",
          { headers }
        );

        const apiData = response.data.data;
        console.log("apis", apiData);
        const res = { obj: apiData.payment_history.slice(0, 3) };
        const curr = { ans: apiData.completedShareInfo.slice(0, 3) };
        const info = apiData.shareHolderInfo;

        console.log("currr", curr);

        const franchiseData = {
          name: "Franchise",
          growth: "buy",
          value: apiData.completedShareInfo[1]?.numberOfShare || "0",
        };
        const ordinaryData = {
          name: "Ordinary",
          growth: "buy",
          value: apiData.completedShareInfo[0]?.numberOfShare || "0",
        };
        const tsmData = {
          name: "TSM",
          growth: "buy",
          value: apiData.completedShareInfo[2]?.numberOfShare || "0",
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
          info,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once

  if (!data) {
    // Render loading state or return null
    return null;
  }
  console.log("need _id ", data.info._id);

  const handleUpdatePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !data.info) {
        // Handle the case when the token or user info is not available
        setUpdatePasswordMessage("Token or user info not found. Please log in.");
        return;
      }
  
      const headers = {
        Authorization: `${token}`,
      };
  
      const response = await axios.post(
        "https://api.purposeblacketh.com/api/auth/updatePassword",
        {
          id: data.info._id, // Assuming user ID is available in your data.info
          token: token,
          password: newPassword,
        },
        { headers }
      );
      console.log("update", response);
  
      setUpdatePasswordMessage(response.data.message);
    } catch (error) {
      console.error("Error updating password:", error);
      setUpdatePasswordMessage("Failed to update password");
    }
  };
  
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align="center">
      <Box
        bg={`url(${banner})`}
        bgSize="cover"
        borderRadius="16px"
        h="231px"
        w="100%"
      />
      <Avatar
        mx="auto"
        src={avatar}
        h="87px"
        w="87px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        {job}
      </Text>
      <Flex
        w={{ base: "90%", md: "70%", lg: "50%", xl: "40%" }}
        mx="auto"
        mt="26px"
        direction="column"
      >
        <Flex mx="auto">
          <Text color={textColorSecondary} fontSize="xl" fontWeight="500">
            Email
          </Text>
          <Text
            color={textColorSecondary}
            fontSize="sm"
            fontWeight="400"
            ml={{ base: "1rem", md: "15rem" }}
          >
            {data.info.email}
          </Text>
        </Flex>
        <Flex mx="auto" mt="1rem" align="center">
          <Text color={textColorSecondary} fontSize="xl" fontWeight="400">
            Phone
          </Text>
          <Text
            color={textColorSecondary}
            fontSize="sm"
            fontWeight="400"
            ml={{ base: "1rem", md: "20rem" }}
          >
            {data.info.phone}
          </Text>
        </Flex>
        <Flex mx="auto" mt="1rem" align="center">
          <Text color={textColorSecondary} fontSize="xl" fontWeight="400">
            Address
          </Text>
          <Text
            color={textColorSecondary}
            fontSize="sm"
            fontWeight="400"
            ml={{ base: "0.5rem", md: "22rem" }}
          >
            {data.info.address}
          </Text>
        </Flex>
      </Flex>

      <Flex w="100%" mx="auto" mt="2rem" direction="column">
        {/* ... (your existing code) */}

        {/* Display update password button and input field */}
        {/* <Box mt="1rem">
          <Button onClick={() => setShowUpdatePassword(!showUpdatePassword)}>
            {showUpdatePassword ? "Cancel" : "Update Password"}
          </Button>
          {showUpdatePassword && (
            <>
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                mt="1rem"
              />
              <Button onClick={handleUpdatePassword} mt="1rem">
                Submit
              </Button>
              <Text color="red.500" mt="1rem">
                {updatePasswordMessage}
              </Text>
            </>
          )}
        </Box> */}
      </Flex>
    </Card>
  );
}
