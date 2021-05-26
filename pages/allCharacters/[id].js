import Head from "next/head";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import {
    Header,
    Box,
    Button,
    Flex,
    Input,
    Stack,
    useToast,
} from "@chakra-ui/react";

const defaultEndpoint = "https://rickandmortyapi.com/api/character/";
export async function getServerSideProps({ query }) {
    const { id } = query;
    const res = await fetch(`${defaultEndpoint}/${id}`);
    const data = await res.json();
    return {
        props: {
            data,
        },
    };
}

const CharacterDetail = ({ data }) => {
    console.log("the data:", data);
    const { name, image, gender, location, origin, species, status } = data;
    return (
        <SimpleGrid columns={[1]} spacing="5px" align="center">
            <div className="details-card">
                <h1>Character Details</h1>
                <Image src={image} width={250} height={250} />
                <Heading
                    as="h3"
                    align="center"
                    size="md"
                    style={{
                        backgroundColor: "white",
                    }}
                >
                    {name}
                </Heading>
                <div className="allText">
                    <ul>
                        <li>
                            <strong>Status: </strong>
                            {status}
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <strong>Gender: </strong>
                            {gender}
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <strong>Species: </strong>
                            {species}
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <strong>Location: </strong>
                            {location?.name}
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <strong>Originally from: </strong>
                            {origin?.name}
                        </li>
                    </ul>
                    <div className="buttonStyle">
                        <Button className="iconButton">
                            <Link href="/allCharacters">
                                <a border="2px solid black"> GO BACK</a>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </SimpleGrid>
    );
};
export default CharacterDetail;
