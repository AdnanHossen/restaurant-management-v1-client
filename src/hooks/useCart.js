// import axios from "axios";
import useAuth from "./useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getToast from "./useToast";
import secureApi from "../services/secureApi";

const useCart = () => {
  // get the logged in user
  const { user } = useAuth();
  //   user email
  const email = user?.email;
  console.log(email);

  // Access the query client of tanstack/query
  const queryClient = useQueryClient();

  // use query to fetch data from the api
  const { data: cart = {}, isLoading } = useQuery({
    queryKey: ["cart", email],
    queryFn: async () => {
      const res = await secureApi.get(`carts/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // now add to cart with query
  const addToCart = useMutation({
    mutationFn: (productId) =>
      secureApi.post(`/add-cart`, {
        userEmail: email,
        productId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", email] }),
        getToast("success", "Added to Cart Successfully");
    },
    onError: (error) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Product already in cart"
      ) {
        getToast("error", "Product already in cart");
      } else {
        getToast("error", "Something went Wrong");
      }
    },
  });

  // remove from query
  const removeFromCart = useMutation({
    mutationFn: (productId) =>
      secureApi.patch(`/remove-cart`, {
        userEmail: email,
        productId,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cart", email] }),
  });

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
  };
};

export default useCart;
