import React, { useEffect, useState } from "react";
import { styled } from '@mui/system';
import {
    AppBar,
    Toolbar,
    Typography,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Box,
    TextField,
    Button,
    Paper,
    CircularProgress,
    Card,
    CardContent
} from "@mui/material";
import axios from "axios";
import { getPlatforms, getModelsByPlatform, getLLMResponse } from "../services/apiService";
import LLM_Image from '../assests/images/LLM.png';

const BASE_URL = "http://10.126.192.122:8000";

const Banner = styled(Box)({
    height: '600px',
    backgroundImage: `url(${LLM_Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

const Home = () => {
    const [platforms, setPlatforms] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [prompt, setPrompt] = useState("");
    const [responsePrompt, setResponsePrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState("");

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
            setSelectedModel("");
        } catch (error) {
            console.error("Error fetching models:", error);
        }
    };

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    const handleSubmit = async () => {
        const payload = {
            method: selectedPlatform, // Take method value from the selected platform
            model: selectedModel,
            context: "You are powerful AI assistant in providing accurate answers always. Be Concise in providing answers based on context.",
            prompt: prompt,
        };
        setLoading(true);
        setApiResponse("");
        try {
            const response = await getLLMResponse(payload);
            setResponsePrompt(prompt);
            setApiResponse(response?.modelreply || "No response received.");
        } catch (error) {
            console.error("Error sending request:", error);
            setApiResponse("Error generating response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formatApiResponse = (response) => {
        if (!response) return "";
        // Replace **text** with bold markup
        return response.split(/(\*\*.*?\*\*)/g).map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <b key={index}>{part.replace(/\*\*/g, "")}</b>;
            }
            return part;
        });
    };

    return (
        <Box sx={{mb: 2}}>
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ color: "#6c5ce7", fontWeight: "bold" }}>
                        Data Intelligence Platform - LLM Gateway
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Banner */}
            <Banner />

            {/* Platform Selection */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 4
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ alignItems: 'left', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', fontSize: "20px", color: "#6c5ce7" }}>
                    Choose LLM Platform
                </Typography>
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="platform-select-label">Choose LLM Platform</InputLabel>
                    <Select
                        value={selectedPlatform}
                        onChange={handlePlatformChange}
                        sx={{ backgroundColor: 'white' }}

                    >
                        {platforms.map((platform) => (
                            <MenuItem key={platform} value={platform}>
                                {platform}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
            </Box>

            {/* Conditional Dropdowns and Input */}
            {selectedPlatform && (
                <Paper elevation={3} sx={{ padding: 4, mt: 4, mx: "auto", maxWidth: 600 }}>
                    {/* Select Model */}
                    <Typography variant="h6" mb={2} sx={{ fontWeight: "bold", color: "#6c5ce7" }}>
                        Ask using Snowflake Cortex
                    </Typography>

                    {/* Model Selection */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="model-select-label">Select your model</InputLabel>
                        <Select
                            value={selectedModel}
                            onChange={handleModelChange}
                            sx={{ backgroundColor: 'white' }}

                        >
                            {models.map((model) => (
                                <MenuItem key={model} value={model}>{model}</MenuItem>
                            ))}
                            
                        </Select>
                    </FormControl>

                    {/* Prompt Input */}
                    <TextField
                        label="Provide Prompt"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />

                    <Typography variant="body1" sx={{ mt: 2 }}>
                        <b>Selected model:</b> {selectedModel || "None"}
                    </Typography>
                    {/* Display Requested Prompt */}
                    {responsePrompt && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Requested Prompt:</Typography>
                            <Typography variant="body2">{responsePrompt}</Typography>
                        </Box>
                    )}

                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#6c5ce7", mt: 2 }}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Submit"}
                    </Button>

                    {/* Loader */}
                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    )}
                </Paper>
            )}

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {apiResponse && (
                    <Card elevation={3} sx={{ mt: 4, mx: "auto", maxWidth: 780, backgroundColor: '#f5f5f5', border: '1px solid #ddd', borderRadius: 2, boxShadow: 2 }}>
                        <CardContent>
                            <Typography variant="body2" sx={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{formatApiResponse(apiResponse)}</Typography>
                        </CardContent>
                    </Card>
                )}
            </Box>

        </Box>

    );
};

export default Home;
