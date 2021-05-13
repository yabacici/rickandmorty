import React from "react";
import Image from "next/image";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";

const Character = ({ characters }) => {
    return (
        <SimpleGrid columns={[1, 2, 3]} spacing="40px">
            {characters.map((character) => {
                return (
                    <div className="card-style" key={character.id}>
                        <Image
                            src={character.image}
                            width={300}
                            height={300}
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

                        <Text align="center" fontFamily="bold">
                            {" "}
                            Origin: {character.origin.name}
                        </Text>
                        <Text align="center" fontFamily="bold">
                            {" "}
                            Location: {character.location.name}
                        </Text>

                        {/* <Text align="center">
                            {" "}
                            air_date: {character.air_date}
                        </Text> */}
                    </div>
                );
            })}
        </SimpleGrid>
    );
};

export default Character;
