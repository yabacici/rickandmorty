import Head from "next/head";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import FavButton from "./favButton";
import {
    Header,
    Box,
    Button,
    Flex,
    Input,
    Stack,
    useToast,
} from "@chakra-ui/react";

// const CharacterDetail = () => {
//     return (
//         <div>
//             <h1>Character Detail</h1>
//         </div>
//     );
// };

// export default CharacterDetail;

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
        <div className="details-card">
            <SimpleGrid columns={[1, 2]} spacing="40px">
                <h1>Character details</h1>

                <Heading
                    as="h4"
                    align="center"
                    size="md"
                    style={{
                        backgroundColor: "white",
                    }}
                >
                    {name}
                </Heading>
                <Image
                    className="img-style"
                    src={image}
                    width={300}
                    height={300}
                />
                <div className="allText">
                    <ul>
                        <li>
                            <strong>Status:</strong>
                            {status}
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <strong>Gender:</strong>
                            {gender}
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <strong>Species:</strong>
                            {species}
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <strong>Location</strong>
                            {location?.name}
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <strong>Originally from:</strong>
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
        </div>
    );
};
export default CharacterDetail;
