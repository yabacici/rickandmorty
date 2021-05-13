import React from "react";
import Image from "next/image";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";

const Episode = ({ episodes }) => {
    return (
        <SimpleGrid columns={[1, 2, 3]} spacing="40px">
            {episodes.map((episode) => {
                return (
                    <div key={episode.id}>
                        <Heading
                            as="h4"
                            align="center"
                            size="md"
                            style={{
                                backgroundColor: "white",
                            }}
                        >
                            {episode.name}
                        </Heading>

                        {/* <Text align="center">
                            {" "}
                            Origin: {character.origin.name}
                        </Text> */}
                        {/* <Text align="center">
                            {" "}
                            Origin: {character.origin.name}
                        </Text> */}

                        {/* <Text align="center">
                            {" "}
                            Location: {character.location.name}
                        </Text> */}
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

export default Episode;
