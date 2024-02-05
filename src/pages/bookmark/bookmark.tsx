import React from "react";
import {
  SimpleGrid,
  Heading,
  Flex,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import RecipeCard from "../../components/card/recipeCard";
import { useBookmarkStore } from "../../store/store";
import { useLocation, useNavigate } from "react-router-dom";

const Bookmark = () => {
  const bookmarkedRecipes = useBookmarkStore((state) => state.recipes);
  const navigate = useNavigate();

  const state = useLocation();

  const handleBack = () => {
    navigate("/", { state: state.state });
  };

  const isBookMarkedRecipesPresent =
    bookmarkedRecipes && bookmarkedRecipes.length > 0;
  return (
    <>
      <Button m={4} onClick={handleBack}>
        Back
      </Button>
      {!isBookMarkedRecipesPresent && (
        <Center mt="55" color="white">
          <Text fontSize="3xl">No Bookmarked Recipes!!</Text>
        </Center>
      )}
      {isBookMarkedRecipesPresent && (
        <>
          <Flex direction="column">
            <Center>
              <Heading>Bookmarked Recipes</Heading>
            </Center>
          </Flex>

          <SimpleGrid mt="10" columns={{ sm: 2, md: 3, lg: 4 }}>
            {bookmarkedRecipes.map((recipe: any) => (
              <RecipeCard key={recipe.id} data={recipe} />
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default Bookmark;
