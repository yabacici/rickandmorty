import React from "react";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";

const Character = ({ characters }) => {
    return (
        <SimpleGrid columns={[1, 2, 3]} spacing="40px">
            {characters.map((character) => {
                return (
                    <div className="image-style" key={character.id}>
                        <Image
                            src={character.image}
                            width={200}
                            height={200}
                            style={{
                                borderStyle: "2px solid black",
                            }}
                        />
                        <Heading
                            as="h4"
                            align="center"
                            size="md"
                            style={{
                                backgroundColor: "white",
                            }}
                        >
                            {character.name}
                        </Heading>

                        <Text align="center">
                            {" "}
                            Origin: {character.origin.name}
                        </Text>
                        <Text align="center">
                            {" "}
                            Location: {character.location.name}
                        </Text>
                        {/* 
                        <Text align="center">
                            {" "}
                            Episode: {character.episode}
                        </Text> */}
                    </div>
                );
            })}
        </SimpleGrid>
    );
};

export default Character;
