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

const Character = ({ characters }) => {
    const [fav, setFav] = useState([], () => {
        const results = localStorage.getItem("fav");
        return results ? JSON.parse(results) : [];
    });
    useEffect(() => {
        localStorage.setItem("myFav", JSON.stringify(fav));
    }, [fav]);
    // console.log("the favs:", fav);
    const [data, setData] = useState(characters.id, () => {
        const localData = localStorage.getItem("data");
        return localData ? JSON.parse(localData) : [];
    });

    return (
        <SimpleGrid columns={[1, 2, 3]} spacing="40px">
            {characters.map((character) => {
                return (
                    <div className="card-style" key={character.id}>
                        <Image
                            className="img-style"
                            src={character.image}
                            width={300}
                            height={300}
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
                        <div className="allText">
                            <Text align="center" fontFamily="bold">
                                {" "}
                                Origin: {character.origin.name}
                            </Text>
                            <Text align="center" fontFamily="bold">
                                {" "}
                                Location: {character.location.name}
                            </Text>
                        </div>

                        <FavButton
                            onClick={() => {
                                handleFavoritesClick(character.name);
                            }}
                        ></FavButton>
                    </div>
                );
            })}
        </SimpleGrid>
    );
};

export default Character;
