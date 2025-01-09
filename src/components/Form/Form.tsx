import { Button, Container, Stack, TextField } from "@mui/material";
import React, { FormEventHandler, ReactNode, useState } from "react";

interface Props {
  title: ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLoginWithGoodle?: () => void;
  isLoading: boolean;
}

const Form = ({ title, handleSubmit, isLoading, handleLoginWithGoodle }: Props) => {
  return (
    <Container maxWidth={"sm"}>
      <form onSubmit={handleSubmit} id="form">
        <Stack gap={2}>
          <TextField size="small" required name="email" type="email" label="email" />
          <TextField size="small" required name="password" type="password" label="password" />
          <Button disabled={isLoading} type="submit" form="form" size="large" variant="contained">
            {title}
          </Button>
          {handleLoginWithGoodle && (
            <>
              <span style={{ textAlign: "center" }}>OR</span>
              <Button
                startIcon={
                  <img
                    style={{ margin: "0 10px" }}
                    width={28}
                    src="https://img.icons8.com/?size=512&id=17949&format=png"
                  />
                }
                onClick={handleLoginWithGoodle}
                disabled={isLoading}
                type="submit"
                size="large"
                variant="outlined"
              >
                Sign in with Google
              </Button>
            </>
          )}
        </Stack>
      </form>
    </Container>
  );
};

export default Form;
