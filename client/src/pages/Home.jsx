import { Box, Grid, LinearProgress } from "@mui/material";
import CreateVideo from "../components/CreateVideo";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Home = () => {
  const {
 
    setVideos,
    isLoading,
    setIsLoading,
    search,
    isSearching,
    setIsSearching,
    isDeleting,
    isRating,
    isDirecting,
  } = useContext(AppContext);

  useEffect(() => {
    const order = !isDirecting ? "desc" : "asc";
    fetch(`${process.env.REACT_APP_API_URL}/api/?order=${order}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        setVideos(data.data);
        setIsSearching(false);
      })
      .catch((err) => console.error(err));
  }, [
    isDeleting,
    isRating,
    isDirecting,
    setIsLoading,
    setIsSearching,
    setVideos,
  ]);

  return (
    <Box
      paddingX={{ xs: 2, sm: 5, md: 10, xl: 20 }}
      paddingTop={{ xs: 35, md: 25 }}
      sx={{ pb: 10 }}
    >
      {!isLoading && (
        <Box>
          <LinearProgress color="secondary" />
          <LinearProgress color="secondary" />
        </Box>
      )}
      <Grid
        container
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 3, xl: 4 }}
        columns={{ xs: 1, sm: 2, md: 3, xl: 4 }}
        paddingX={{ xs: 2, sm: 3, md: 5, xl: 6 }}
        sx={{ backgroundColor: " #f9e7ed", pb: 5 }}
      >
        {!isSearching
          ? videos.map((eachVideo) => (
              <Grid item xs={1} key={eachVideo.id}>
                <CreateVideo eachVideo={eachVideo} />
              </Grid>
            ))
          : search.map((eachVideo) => (
              <Grid item xs={1} key={eachVideo.id}>
                <CreateVideo eachVideo={eachVideo} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Home;
