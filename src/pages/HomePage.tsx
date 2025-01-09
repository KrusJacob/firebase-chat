import { Box, Container, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Container>
      <Box display={"flex"} flexDirection={"column"} gap={4} alignItems={"center"}>
        <Typography variant="h1">Welcome</Typography>
        <Typography>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem repudiandae, nobis nemo eius
          dignissimos excepturi delectus, hic consequatur tempore exercitationem doloremque iusto culpa dolores
          fugiat accusamus inventore dicta officia ut.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
