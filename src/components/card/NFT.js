import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

export default function NFT(props) {
  const {
    video,
    name,
    width,
    height,
  } = props;
  const [like, setLike] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Card p="20px" height="350px">
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="center"
        borderRadius="20px"
        overflow="hidden"
        height="100%" 
      >
        <Box mb={{ base: "20px", "2xl": "20px" }} position="relative" borderRadius="20px" >
          <Button onClick={openModal}>
            {/* Use the provided width and height props */}
            <iframe
              width={width || "286"}
              height={height || "500"}
              borderRadius="20px"
              src={video}
              title={name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                display: "block",
                margin: "auto",
              }}
            ></iframe>
          </Button>
        </Box>
        <Flex flexDirection="column" justify="space-between" h="100%">
          <Flex
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb="auto"
          >
            
          </Flex>
          <Flex
            align="start"
            justify="space-between"
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt="25px"
          >
            <div onClick={openModal} style={{ cursor: "pointer", marginBottom:'2.5rem' }}>
              <Button>
                See it!
              </Button>
            </div>
          </Flex>
        </Flex>
      </Flex>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              width="100%"
              height="400"
              src={video}
              title={name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
}
