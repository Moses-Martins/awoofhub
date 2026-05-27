import { useBusinessAlert } from "./useBusinessAlert";
import { useRemoveAlert } from "./useRemoveAlert";
import { useSetAlert } from "./useSetAlert";

export const useAlert = (id: string) => {
  const isSubscribed = useBusinessAlert(id);
  const { setAlert } = useSetAlert({id});
  const { removeAlert } = useRemoveAlert({id});

  const toggleAlert = () => {
    if (isSubscribed) {
      removeAlert();
    } else {
      setAlert();
    }
  }; 

  return { toggleAlert, isSubscribed };
};