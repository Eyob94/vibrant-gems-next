import qs from "qs";

export const getSingleProductWithId = (id: string) => {
  return {
    filters: {
      id: {
        $eq: id,
      },
    },
  };
};
