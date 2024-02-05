import React from "react";
import { Center, Spinner, Text, SimpleGrid, Button } from "@chakra-ui/react";
import RecipeCard from "../../components/card/recipeCard";

const Recipes = (props: any) => {
  const { recipes, loadingRecipe, loadMoreData } = props;

  if (loadingRecipe && (recipes == null || recipes.length === 0)) {
    return (
      <Center mt="55">
        <Spinner size="xl" color="white" />
      </Center>
    );
  }

  if (recipes == null || recipes.length === 0) {
    return (
      <Center mt="55" color="white">
        <Text fontSize="3xl">Search your favourite recipes!</Text>
      </Center>
    );
  }

  return (
    <>
      <SimpleGrid mt="10" columns={{ sm: 2, md: 3, lg: 4 }}>
        {recipes.map((recipe: any) => (
          <RecipeCard key={recipe.id} data={recipe} />
        ))}
      </SimpleGrid>

      {loadingRecipe ? (
        <Center mt="55">
          <Spinner size="xl" color="white" />
        </Center>
      ) : (
        <Center>
          <Button m="20" colorScheme="blue" onClick={loadMoreData}>
            Load More Recipes
          </Button>
        </Center>
      )}
    </>
  );
};

export default Recipes;
