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
export async function getStaticPaths() {
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql/",
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
            query {
                characters {
                    results {
                        name
                        id
                    }
                }
            }
        `,
    });
    const paths = data.characters.results.map((character) => {
        return {
            params: { id: character.id.toString() },
        };
    });
    return {
        paths: paths,
        fallback: false,
    };
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql/",
        cache: new InMemoryCache(),
    });
    const { data } = await client.query({
        query: gql`
        query {
          character(id: ${id}) {
            name
            image
            gender
            status
            origin{
                name
            }
            location {
              name
            }
            species
            episode {
                id
                name
                episode
            }
          }
        }
      `,
    });

    return {
        props: {
            character: data.character,
        },
    };
};

const CharacterDetail = ({ character }) => {
    console.log("character details:", character);
    const {
        name,
        image,
        gender,
        location,
        origin,
        species,
        status,
        episode,
    } = character;
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
                            <strong>Origins: </strong>
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

////// WITH REST API///////
// const defaultEndpoint = "https://rickandmortyapi.com/api/character/";
// export async function getServerSideProps({ query }) {
//     const { id } = query;
//     const res = await fetch(`${defaultEndpoint}/${id}`);
//     const data = await res.json();
//     return {
//         props: {
//             data,
//         },
//     };
// }
