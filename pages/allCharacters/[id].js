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
// export async function getStaticPaths() {
//     const client = new ApolloClient({
//         uri: "https://rickandmortyapi.com/graphql/",
//         cache: new InMemoryCache(),
//     });
//     const { data } = await client.query({
//         query: gql`
//             query {
//                 characters(page: 1) {
//                     info {
//                         count
//                     }
//                     results {
//                         id
//                     }
//                 }
//             }
//         `,
//     });
//     return {
//         props: {
//             characters: data.characters.results,
//             fallback: false,
//         },
//     };
// }

const CharacterDetail = ({ data }) => {
    console.log("the data:", data);
    const { name, image, gender, location, origin, species, status } = data;
    return (
        <SimpleGrid
            className="details-card"
            columns={[1, 2]}
            spacing="5px"
            align="center"
        >
            <h1 align="center">Character details</h1>
            <Heading
                as="h2"
                align="center"
                size="md"
                style={{
                    backgroundColor: "white",
                }}
            >
                {name}
            </Heading>
            <Image src={image} width={150} height={150} />
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
            </div>
            <Button className="iconButton">
                <Link href="/allCharacters">
                    <a border="2px solid black"> BACK TO CHARACTERS</a>
                </Link>
            </Button>
        </SimpleGrid>
    );
};
export default CharacterDetail;
