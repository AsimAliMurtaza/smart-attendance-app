"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  useTheme,
  Paper,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/redirect",
    });
    setLoading(false);

    if (res?.error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          theme.palette.mode === "light" ? "#ffffff" : "#0f0f0f",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          p: 5,
          borderRadius: 0,
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0.05)",
          boxShadow:
            theme.palette.mode === "light"
              ? "0px 2px 12px rgba(0,0,0,0.08)"
              : "0px 2px 16px rgba(0,0,0,0.3)",
        }}
      >
        <Stack spacing={3} textAlign="center">
          <Typography
            variant="h5"
            fontWeight={700}
            color="text.primary"
            gutterBottom
          >
            Welcome to MarkSync
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, mt: -1 }}
          >
            Sign in to access your dashboard
          </Typography>

          {/* Email */}
          <FormControl fullWidth >
            <FormLabel>Email</FormLabel>
            <TextField
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="medium"
              fullWidth
            />
          </FormControl>

          {/* Password */}
          <FormControl fullWidth>
            <FormLabel>Password</FormLabel>
            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="medium"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </FormControl>

          <Button
            onClick={handleLogin}
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 1,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>

          <Box mt={1}>
            <Typography variant="body2" color="text.secondary">
              <Link
                component="button"
                underline="hover"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot Password?
              </Link>{" "}
              •{" "}
              <Link
                component="button"
                underline="hover"
                onClick={() => router.push("/signup")}
              >
                Create Account
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
