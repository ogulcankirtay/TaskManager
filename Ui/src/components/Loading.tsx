import { CircularProgress, Box } from "@mui/material";
import { useLoading } from "../providers/LoadingProvider.tsx";

export const Loading = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <CircularProgress size={60} color="primary" />
    </Box>
  );
};
