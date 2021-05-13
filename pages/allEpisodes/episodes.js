import React from "react";
import Image from "next/image";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";

const Episode = ({ episodes }) => {
    return (
        <SimpleGrid columns={[1, 2, 3]} spacing="50px">
            {episodes.map((episode) => {
                return (
                    <div className="card-style" key={episode.id}>
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
                        <div
                            style={{
                                backgroundColor: "gray",
                            }}
                        >
                            <a href="">
                                <Text align="center">
                                    {" "}
                                    episode: {episode.episode}
                                </Text>

                                <Text align="center">
                                    {" "}
                                    air_date: {episode.air_date}
                                </Text>
                                {/* <Text align="center"> id: {episode.id}</Text> */}

                                <Text align="center">
                                    {" "}
                                    created: {episode.created}
                                </Text>
                            </a>
                        </div>
                    </div>
                );
            })}
        </SimpleGrid>
    );
};

export default Episode;
