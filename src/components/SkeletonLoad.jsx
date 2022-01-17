import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SkeletonLoad() {
  return (
    <Stack spacing={1} style={{ margin: "1em auto 1em auto", width: "95%" }}>
      <Skeleton variant="text" animation="wave" width="86%" />
      <Skeleton variant="circular" width={60} height={60} animation="wave" />
      <Skeleton variant="rectangular" height={318} width="96%" />
      <Skeleton variant="rectangular" height={48} width="56%" />
      <Skeleton variant="rectangular" height={118} width="96%" />
    </Stack>
  );
}
