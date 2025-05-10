import { Box, Container, Typography, Link } from "@mui/material";

const HomePage = () => {
  return (
    <Container>
      <Box display={"flex"} flexDirection={"column"} gap={4} alignItems={"center"} paddingY={10}>
        <Typography variant="h1">Welcome to Chatixx</Typography>
        <Typography fontSize={20}>
          Welcome to Chatixx – Where Conversations Come to Life! Dive into a world of engaging discussions and
          meaningful interactions. Whether you're looking to exchange ideas, explore new perspectives, or simply
          connect with others, Chatixx is your go-to space for open and vibrant conversations on any topic. Join
          the conversation, share your thoughts, and discover a community that thrives on dialogue. Let's talk,
          let's listen, let's grow – together!
        </Typography>
        <Link
          href={"/chat"}
          sx={{
            padding: "4px 12px",
            backgroundColor: "#1976D2",
            border: "1px solid black",
            color: "white",
            fontSize: 24,
            borderRadius: 2,
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "#1257A6",
            },
          }}
          color="white"
          fontSize={24}
          underline="none"
        >
          Go to Chat
        </Link>
      </Box>
    </Container>
  );
};

export default HomePage;
