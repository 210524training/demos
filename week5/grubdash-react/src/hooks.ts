import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// These should be included to help with type-safety in our components
// The AppDispatch is not super important, as we could just use the generic
// in our components every time
// However, the useAppSelector is very useful due to the way you need to declare the type
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;