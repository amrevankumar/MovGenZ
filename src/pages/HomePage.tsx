import { useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { COMMON_TITLES } from "src/constant";
import HeroSection from "src/components/HeroSection";
import { genreSliceEndpoints, useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import SliderRowForGenre from "src/components/VideoSlider";
import store from "src/store";

export async function loader() {
  await store.dispatch(
    genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie)
  );
  return null;
}

function ApiKeyPrompt() {
  const [keyInput, setKeyInput] = useState("");

  const handleSave = () => {
    if (keyInput.trim()) {
      localStorage.setItem("TMDB_API_KEY", keyInput.trim());
      window.location.reload();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        pt: 8,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, sm: 5 },
          maxWidth: 540,
          width: "100%",
          bgcolor: "rgba(20, 20, 20, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 2,
          textAlign: "center",
          backdropFilter: "blur(12px)",
        }}
      >
        <VpnKeyIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Connect TMDB API
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          MovGenZ streams movie & TV data from The Movie Database (TMDB). Please enter your free TMDB v3 API key below to load movies and trailers.
        </Typography>
        <TextField
          fullWidth
          size="medium"
          placeholder="Paste TMDB v3 API Key here"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          sx={{
            mb: 2.5,
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(255, 255, 255, 0.08)",
              color: "#fff",
            },
          }}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!keyInput.trim()}
            sx={{ fontWeight: 600, py: 1.2, px: 3 }}
          >
            Save & Load MovGenZ
          </Button>
          <Button
            variant="outlined"
            href="https://www.themoviedb.org/signup"
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon fontSize="small" />}
            sx={{
              color: "text.secondary",
              borderColor: "rgba(255, 255, 255, 0.3)",
              "&:hover": { borderColor: "#fff", color: "#fff" },
            }}
          >
            Get Free API Key
          </Button>
        </Stack>
        <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 3 }}>
          Alternatively, add it to your <code>.env</code> file as <code>VITE_APP_TMDB_V3_API_KEY</code>.
        </Typography>
      </Paper>
    </Box>
  );
}

export function Component() {
  const { data: genres, isSuccess, isLoading } = useGetGenresQuery(MEDIA_TYPE.Movie);

  if (isSuccess && genres && genres.length > 0) {
    return (
      <Stack spacing={2}>
        <HeroSection mediaType={MEDIA_TYPE.Movie} />
        {[...COMMON_TITLES, ...genres].map((genre: Genre | CustomGenre) => (
          <SliderRowForGenre
            key={genre.id || genre.name}
            genre={genre}
            mediaType={MEDIA_TYPE.Movie}
          />
        ))}
      </Stack>
    );
  }

  if (!isLoading) {
    return <ApiKeyPrompt />;
  }

  return null;
}

Component.displayName = "HomePage";

