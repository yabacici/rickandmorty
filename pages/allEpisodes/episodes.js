import React from "react";
import Image from "next/image";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";

const Episode = ({ episodes }) => {
    return (
        <SimpleGrid columns={[1]} spacing="50px">
            {episodes.map((episode) => {
                return (
                    <div className="card-style" key={episode.id}>
                        <div className="allText">
                            <a href>
                                {" "}
                                <Text align="center">
                                    {" "}
                                    episode: {episode.episode}
                                </Text>
                            </a>

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
                            <Text align="center" fontFamily="bold">
                                {" "}
                                air date: {episode.air_date}
                            </Text>

                            <Text align="center" fontFamily="bold">
                                {" "}
                                created: {episode.created}
                            </Text>
                        </div>
                    </div>
                );
            })}
        </SimpleGrid>
    );
};

export default Episode;
