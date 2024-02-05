import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  Center,
  Image,
  Tag,
  Box,
  Flex,
  UnorderedList,
  ListItem,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { useBookmarkStore } from "../../store/store";
import { IRecipes } from "../../pages/home/home";
import React from "react";

interface IRecipeModalProps {
  recipe: IRecipes;
  showRecipeModal: boolean;
  setShowRecipeModal: (showFilterModal: boolean) => void;
}

const RecipeModal = (props: IRecipeModalProps) => {
  const { showRecipeModal, setShowRecipeModal, recipe } = props;
  const bookmarkedRecipes = useBookmarkStore((state) => state.recipes);
  const addRecipe = useBookmarkStore((state) => state.addRecipe);
  const removeRecipe = useBookmarkStore((state) => state.removeRecipe);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isAlreadyPresent = bookmarkedRecipes.find(
      (bookmarkedRecipe) => bookmarkedRecipe.label === recipe.label
    );
    if (isAlreadyPresent) {
      removeRecipe(recipe);
    } else {
      addRecipe(recipe);
    }
  };

  return (
    <>
      <Modal
        size="xl"
        isOpen={showRecipeModal}
        onClose={() => setShowRecipeModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack spacing={2}>
              <Text maxW="sm" fontSize="xl" noOfLines={1}>
                {recipe.label}
              </Text>
              <IconButton
                size="sm"
                aria-label="bookmark"
                icon={
                  bookmarkedRecipes.find(
                    (bookmarkedRecipe) =>
                      bookmarkedRecipe.label === recipe.label
                  ) ? (
                    <AiFillStar />
                  ) : (
                    <AiOutlineStar />
                  )
                }
                onClick={handleClick}
                colorScheme={
                  bookmarkedRecipes.find(
                    (bookmarkedRecipe) =>
                      bookmarkedRecipe.label === recipe.label
                  )
                    ? "yellow"
                    : "gray"
                }
              ></IconButton>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <Center>
              <Image
                objectFit="cover"
                key={recipe.id}
                src={recipe.image}
                borderRadius="lg"
              />
            </Center>
            <Box
              mt="5"
              fontWeight="semibold"
              as="h6"
              lineHeight="tight"
              noOfLines={1}
            >
              Calories
            </Box>
            <Tag m="2" size="sm" colorScheme="green">
              Calories: {parseFloat(recipe.calories).toFixed(2)}
            </Tag>
            <Box
              mt="2"
              fontWeight="semibold"
              as="h6"
              lineHeight="tight"
              noOfLines={1}
            >
              Health Information
            </Box>
            <Flex direction="row">
              {recipe.healthLabels
                .slice(0, 3)
                .map((label: string, index: number) => (
                  <Tag m="2" size="sm" key={index} colorScheme="purple">
                    {label}
                  </Tag>
                ))}
            </Flex>
            <Box
              mt="2"
              fontWeight="semibold"
              as="h6"
              lineHeight="tight"
              noOfLines={1}
            >
              Dietry Information
            </Box>
            <Flex direction="row">
              {recipe.dietLabels
                .slice(0, 3)
                .map((label: string, index: number) => (
                  <Tag m="2" size="sm" key={index} colorScheme="orange">
                    {label}
                  </Tag>
                ))}
            </Flex>

            <Box
              mt="2"
              fontWeight="semibold"
              as="h6"
              lineHeight="tight"
              noOfLines={1}
            >
              Ingredients
            </Box>
            <Flex direction="row">
              <UnorderedList>
                {recipe.ingredientLines.map((label: string, index: number) => (
                  <ListItem m="2" key={index}>
                    {label}
                  </ListItem>
                ))}
              </UnorderedList>
            </Flex>
          </ModalBody>
          <ModalCloseButton />
          <ModalBody pl="8" pr="8"></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecipeModal;
