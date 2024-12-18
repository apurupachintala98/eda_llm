import React, { useEffect, useState } from "react";
import { styled } from '@mui/system';
import { AppBar, Toolbar, Typography, MenuItem, FormControl, InputLabel, Select, Box } from "@mui/material";
import { getPlatforms, getModelsByPlatform } from "../services/apiService";
import LLM_Image from '../assests/images/LLM.png';


const Banner = styled(Box)({
    height: '650px',
    backgroundImage: `url(${LLM_Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  const Home = () => {
    const [platforms, setPlatforms] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const data = await getPlatforms();
                setPlatforms(data);
            } catch (error) {
                console.error("Error fetching platforms:", error);
            }
        };

        fetchPlatforms();
    }, []);

    const handlePlatformChange = async (event) => {
        const platform = event.target.value;
        setSelectedPlatform(platform);

        try {
            const modelsData = await getModelsByPlatform(platform);
            setModels(modelsData);
            setSelectedModel(""); // Reset model dropdown
        } catch (error) {
            console.error("Error fetching models:", error);
        }
    };

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    return (
        <div>
            {/* App Header */}
            <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ color: "#6c5ce7", fontWeight: "bold" }}>EDA LLM GW</Typography>
                </Toolbar>
            </AppBar>

            {/* Banner Image */}
            <Banner />

            {/* Centered Dropdowns */}
            {/* <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 4
                }}
            >
                <Typography variant="h5" gutterBottom sx={{alignItems: 'left', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
                    Choose LLM Platform
                </Typography>

                <FormControl sx={{ width: 600, mb: 2 }}>
                    <InputLabel id="platform-label">Select Platform</InputLabel>
                    <Select
                        labelId="platform-label"
                        value={selectedPlatform}
                        onChange={handlePlatformChange}
                    >
                        {platforms.map((platform) => (
                            <MenuItem key={platform} value={platform}>
                                {platform}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedPlatform && (
                    <FormControl sx={{ width: 300, mb: 2 }}>
                        <InputLabel id="model-label">Select Model</InputLabel>
                        <Select
                            labelId="model-label"
                            value={selectedModel}
                            onChange={handleModelChange}
                        >
                            {models.map((model) => (
                                <MenuItem key={model} value={model}>
                                    {model}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Box> */}
            <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Align items to the start
        justifyContent: 'center',
        mt: 4
    }}
>
    {/* Title */}
    <Typography
        variant="h5"
        gutterBottom
        sx={{
            fontWeight: 'bold',
            alignItems: 'flex-start', // Align items to the start
            fontFamily: 'Roboto, sans-serif',
             color: "#6c5ce7",
             fontSize: "20px",
            mb: 1 // Optional: Add spacing between title and dropdown
        }}
    >
        Choose LLM Platform
    </Typography>

    {/* Platform Dropdown */}
    <FormControl sx={{ width: 300, mb: 2 }}>
        <InputLabel id="platform-label">Select Platform</InputLabel>
        <Select
            labelId="platform-label"
            value={selectedPlatform}
            onChange={handlePlatformChange}
            sx={{
                height: 40, // Adjust the height of the select input
                fontSize: 14, // Adjust the font size for a more compact look
                display: 'flex',
                alignItems: 'center', // Ensures vertical alignment
                '& .MuiInputBase-input': {
                    padding: '8px 8px' // Adjust padding to center text vertically
                }
            }}
            MenuProps={{
                PaperProps: {
                    sx: {
                        maxHeight: 200, // Limit the height of the dropdown menu
                        fontSize: 14
                    },
                },
            }}
        >
            {platforms.map((platform) => (
                <MenuItem key={platform} value={platform}>
                    {platform}
                </MenuItem>
            ))}
        </Select>
    </FormControl>

    {/* Model Dropdown */}
    {selectedPlatform && (
        <FormControl sx={{ width: 300, mb: 2 }}>
            <InputLabel id="model-label">Select Model</InputLabel>
            <Select
                labelId="model-label"
                value={selectedModel}
                onChange={handleModelChange}
            >
                {models.map((model) => (
                    <MenuItem key={model} value={model}>
                        {model}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )}
</Box>

        </div>
    );
}

export default Home;
