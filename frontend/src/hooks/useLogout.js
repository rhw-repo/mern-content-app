// instead of server request, update global state and delete token from local storage
import { useAuthContext } from "./useAuthContext";
import { useMaterialsContext } from "./useMaterialsContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: materialsDispatch } = useMaterialsContext()

    const logout = () => {
        // remove user from storage 
        localStorage.removeItem("user")

        // dispatch logout action
        dispatch({ type: "LOGOUT" })
        materialsDispatch({ type: "SET WORKOUTS", payload: null })
    }

    return { logout }
}