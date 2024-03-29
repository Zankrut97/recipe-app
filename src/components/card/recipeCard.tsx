import React from "react";
import {
  Image,
  Center,
  Box,
  Tag,
  IconButton,
  Flex,
  Text,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { IRecipe, useBookmarkStore } from "../../store/store";
import RecipeModal from "../recipeModal/recipeModal";

// interface for RecipeCard Props
export interface IRecipeCardProps {
  data: IRecipe;
}

const RecipeCard = (props: IRecipeCardProps) => {
  const { data } = props;
  const bookmarkedRecipes = useBookmarkStore((state) => state.recipes);
  const addRecipe = useBookmarkStore((state) => state.addRecipe);
  const removeRecipe = useBookmarkStore((state) => state.removeRecipe);
  const [showRecipeModal, setShowRecipeModal] = React.useState(false);

  /**
   * shows Card Modad on Click
   */
  const handleCardClick = () => {
    setShowRecipeModal(!showRecipeModal);
  };

  /**
   * Handles bookmark
   * if present removes recipe from bookmark store
   * else adds recipe to bookmarstore
   */
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isAlreadyPresent = bookmarkedRecipes.find(
      (recipe) => recipe.label === data.label
    );
    if (isAlreadyPresent) {
      removeRecipe(data);
    } else {
      addRecipe(data);
    }
  };

  return (
    <>
      <Box
        maxW="sm"
        margin="5"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        backgroundColor="white"
        cursor="pointer"
        onClick={handleCardClick}
      >
        <IconButton
          position="relative"
          zIndex={2}
          aria-label="bookmark"
          icon={
            bookmarkedRecipes.find((recipe) => recipe.label === data.label) ? (
              <AiFillStar />
            ) : (
              <AiOutlineStar />
            )
          }
          top="9%"
          left="77%"
          onClick={handleClick}
          colorScheme={
            bookmarkedRecipes.find((recipe) => recipe.label === data.label)
              ? "yellow"
              : "gray"
          }
        ></IconButton>
        <Box pl="6" pr="6" pb="4">
          <Center>
            <Image
              objectFit="cover"
              key={data.id}
              src={data.image}
              borderRadius="lg"
            />
          </Center>
          <Box mt="1">
            <Text as="b" fontSize="lg" noOfLines={1}>
              {data.label}
            </Text>
          </Box>
          <Box mt="2">
            <Tag size="sm" colorScheme="green">
              Calories: {parseFloat(data.calories).toFixed(2)}
            </Tag>
          </Box>
          <Box fontWeight="semibold" as="h6" lineHeight="tight" noOfLines={1}>
            Health Information
          </Box>
          <Flex direction="row">
            {data.healthLabels
              .slice(0, 3)
              .map((label: string, index: number) => (
                <Tag m="1" size="sm" key={index} colorScheme="purple">
                  {label}
                </Tag>
              ))}
          </Flex>
          <Box fontWeight="semibold" as="h6" lineHeight="tight" noOfLines={1}>
            Dietry Information
          </Box>
          <Flex direction="row">
            {data.dietLabels.slice(0, 3).map((label: string, index: number) => (
              <Tag m="1" size="sm" key={index} colorScheme="orange">
                {label}
              </Tag>
            ))}
          </Flex>
        </Box>
      </Box>
      <RecipeModal
        setShowRecipeModal={setShowRecipeModal}
        showRecipeModal={showRecipeModal}
        recipe={data}
      ></RecipeModal>
    </>
  );
};

export default RecipeCard;
