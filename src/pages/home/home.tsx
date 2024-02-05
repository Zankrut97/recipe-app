import React from "react";
import {
  Container,
  InputGroup,
  Input,
  InputRightElement,
  Flex,
  IconButton,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Api, { IApifilters } from "../../api/api";
import FilterModal from "../../components/filterModal/filterModal";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { usefilterStore } from "../../store/store";
import Recipes from "../../components/recipes/recipes";

const Home = () => {
  const navigate = useNavigate();

  const filters = usefilterStore((state) => state.filters);
  const value = usefilterStore((state) => state.value);
  const updateStore = usefilterStore((state) => state.updateStore);

  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [recipes, setRecipes] = React.useState([]);
  const [nextRecipeRef, setNextRecipeRef] = React.useState("");
  const [loadingRecipe, setLoadingRecipe] = React.useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => updateStore(filters, event.target.value);

  const formatRecipeData = (item: any) => {
    const recipe = {
      id: uuidv4(),
      label: item.recipe.label,
      calories: item.recipe.calories,
      image: item.recipe.image,
      healthLabels: item.recipe.healthLabels,
      dietLabels: item.recipe.dietLabels,
      ingredientLines: item.recipe.ingredientLines,
    };
    return recipe;
  };

  // fetches data
  const fetchData = async () => {
    setLoadingRecipe(true);
    const api = Api.getInstance();
    let params: IApifilters = filters;
    if (value) {
      params.q = value;
    }
    const response = await api.getRecipes(params);
    const recipes = response.data.hits.map((item: any) => {
      return formatRecipeData(item);
    });
    setRecipes(recipes);
    setNextRecipeRef(response.data._links?.next?.href);
    setLoadingRecipe(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const loadMoreData = async () => {
    if (nextRecipeRef == null) {
      return;
    }

    setLoadingRecipe(true);
    const api = Api.getInstance();
    const response = await api.loadMoreRecipes(nextRecipeRef);
    setNextRecipeRef(response.data._links?.next?.href);
    const recipeData = response.data.hits.map((item: any) => {
      return formatRecipeData(item);
    });
    setRecipes(recipes.concat(recipeData));
    setLoadingRecipe(false);
  };

  const handleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleBookmark = () => {
    navigate("/bookmark", {
      state: { filters, value },
    });
  };

  const handleSubmit = () => {
    setShowFilterModal(false);
    fetchData();
  };

  return (
    <>
      <Flex direction="column">
        <Container mt="80px">
          <FormControl>
            <Flex>
              <InputGroup>
                <Input
                  value={value}
                  onChange={handleChange}
                  noOfLines={1}
                  size="lg"
                  placeholder="Search lip smacking recipes!!"
                  //_placeholder={}
                  backgroundColor="#FFFFFF"
                />
                <InputRightElement width="4rem">
                  <IconButton
                    mt="8px"
                    h="2rem"
                    size="lg"
                    colorScheme="blue"
                    aria-label="Search"
                    onClick={(e) => fetchData()}
                    icon={<SearchIcon />}
                  />
                </InputRightElement>
              </InputGroup>
              <Button marginLeft="5px" size="lg" onClick={handleFilterModal}>
                Filters
              </Button>
              <Button marginLeft="5px" size="lg" onClick={handleBookmark}>
                Bookmarked
              </Button>
            </Flex>
          </FormControl>
        </Container>
      </Flex>
      <FilterModal
        setShowFilterModal={setShowFilterModal}
        showFilterModal={showFilterModal}
        handleSubmit={handleSubmit}
      />
      <Recipes
        recipes={recipes}
        loadingRecipe={loadingRecipe}
        loadMoreData={loadMoreData}
      />
    </>
  );
};

export default Home;
