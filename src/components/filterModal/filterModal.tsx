import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Flex,
  Text,
  CheckboxGroup,
  Stack,
  Checkbox,
  ModalFooter,
  Button,
  Box,
  StackDivider,
} from "@chakra-ui/react";
import { usefilterStore } from "../../store/store";

interface IFilterModalProps {
  showFilterModal: boolean;
  setShowFilterModal: (showFilterModal: boolean) => void;
  handleSubmit: () => void;
}

const FilterModal = (props: IFilterModalProps) => {
  const { showFilterModal, setShowFilterModal, handleSubmit } = props;
  const filters = usefilterStore((state) => state.filters);
  const value = usefilterStore((state) => state.value);
  const updateStore = usefilterStore((state) => state.updateStore);

  const handleFormChange = (key: string, data: (string | number)[]) => {
    const updatedFilters = data.length
      ? {
          ...filters,
          [key]: data,
        }
      : { ...filters, [key]: null };
    updateStore(updatedFilters, value);
  };

  return (
    <>
      <Modal
        size="xl"
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">Recipe Filters</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pl="8" pr="8">
            <FormControl>
              <Flex direction="column">
                <Box>
                  <Text as="b" fontSize="lg">
                    Diet
                  </Text>
                  <CheckboxGroup
                    onChange={(values) => handleFormChange("diet", values)}
                    colorScheme="green"
                    value={filters["diet"] || []}
                  >
                    <Stack
                      mt="2"
                      divider={<StackDivider borderColor="gray.200" />}
                      direction={["column", "row"]}
                    >
                      <Checkbox value="balanced">
                        <Text fontSize="sm">Balanced</Text>
                      </Checkbox>
                      <Checkbox value="high-fiber">
                        <Text fontSize="sm">High Fiber</Text>
                      </Checkbox>
                      <Checkbox value="high-protein">
                        <Text fontSize="sm">High Protein</Text>
                      </Checkbox>
                      <Checkbox value="low-carb">
                        <Text fontSize="sm">Low Carb</Text>
                      </Checkbox>
                      <Checkbox value="low-fat">
                        <Text fontSize="sm">Low Fat</Text>
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>
                </Box>
                <Box mt="2">
                  <Text as="b" fontSize="lg">
                    Health
                  </Text>
                  <CheckboxGroup
                    onChange={(values) => handleFormChange("health", values)}
                    colorScheme="green"
                    value={filters["health"] || []}
                  >
                    <Stack
                      mt="2"
                      divider={<StackDivider borderColor="gray.200" />}
                      direction={["column", "row"]}
                    >
                      <Checkbox value="alcohol-free">
                        <Text fontSize="sm">Alcohol Free</Text>
                      </Checkbox>
                      <Checkbox value="dairy-free">
                        <Text fontSize="sm">Dairy Free</Text>
                      </Checkbox>
                      <Checkbox value="egg-free">
                        <Text fontSize="sm">Egg Free</Text>
                      </Checkbox>
                      <Checkbox value="vegan">
                        <Text fontSize="sm">Vegan</Text>
                      </Checkbox>
                      <Checkbox value="vegetarian">
                        <Text fontSize="sm">Vegetarian</Text>
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>
                </Box>
                <Box mt="2">
                  <Text as="b" fontSize="lg">
                    Cuisine Type
                  </Text>
                  <CheckboxGroup
                    onChange={(values) =>
                      handleFormChange("cuisineType", values)
                    }
                    colorScheme="green"
                    value={filters["cuisineType"] || []}
                  >
                    <Stack
                      mt="2"
                      divider={<StackDivider borderColor="gray.200" />}
                      direction={["column", "row"]}
                    >
                      <Checkbox value="American">
                        <Text fontSize="sm">American</Text>
                      </Checkbox>
                      <Checkbox value="Asian">
                        <Text fontSize="sm">Asian</Text>
                      </Checkbox>
                      <Checkbox value="Indian">
                        <Text fontSize="sm">Indian</Text>
                      </Checkbox>
                      <Checkbox value="Mexican">
                        <Text fontSize="sm">Mexican</Text>
                      </Checkbox>
                      <Checkbox value="Japanese">
                        <Text fontSize="sm">Japanese</Text>
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>
                </Box>
                <Box mt="2">
                  <Text as="b" fontSize="lg">
                    Meal Type
                  </Text>
                  <CheckboxGroup
                    onChange={(values) => handleFormChange("mealType", values)}
                    colorScheme="green"
                    value={filters["mealType"] || []}
                  >
                    <Stack
                      mt="2"
                      divider={<StackDivider borderColor="gray.200" />}
                      direction={["column", "row"]}
                    >
                      <Checkbox value="Breakfast">
                        <Text fontSize="sm">Breakfast</Text>
                      </Checkbox>
                      <Checkbox value="Dinner">
                        <Text fontSize="sm">Dinner</Text>
                      </Checkbox>
                      <Checkbox value="Lunch">
                        <Text fontSize="sm">Lunch</Text>
                      </Checkbox>
                      <Checkbox value="Snack">
                        <Text fontSize="sm">Snacks</Text>
                      </Checkbox>
                      <Checkbox value="TeaTime">
                        <Text fontSize="sm">Tea Time</Text>
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>
                </Box>
                <Box mt="2">
                  <Text as="b" fontSize="lg">
                    Dish Type
                  </Text>
                  <CheckboxGroup
                    onChange={(values) => handleFormChange("dishType", values)}
                    colorScheme="green"
                    value={filters["dishType"] || []}
                  >
                    <Stack
                      mt="2"
                      divider={<StackDivider borderColor="gray.200" />}
                      direction={["column", "row"]}
                    >
                      <Checkbox value="Starter">
                        <Text fontSize="sm">Starters</Text>
                      </Checkbox>
                      <Checkbox value="Main course">
                        <Text fontSize="sm">Main Course</Text>
                      </Checkbox>
                      <Checkbox value="Desserts">
                        <Text fontSize="sm">Desserts</Text>
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>
                </Box>
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr="4" onClick={handleSubmit}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FilterModal;
