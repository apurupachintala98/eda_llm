// import React, { useEffect, useState } from "react";
// import { styled } from '@mui/system';
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Select,
//     Box,
//     TextField,
//     Button,
//     Paper
// } from "@mui/material";
// import { getPlatforms, getModelsByPlatform } from "../services/apiService";
// import LLM_Image from '../assests/images/LLM.png';

// const Banner = styled(Box)({
//     height: '650px',
//     backgroundImage: `url(${LLM_Image})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
// });

// const Home = () => {
//     const [platforms, setPlatforms] = useState([]);
//     const [models, setModels] = useState([]);
//     const [selectedPlatform, setSelectedPlatform] = useState("");
//     const [selectedModel, setSelectedModel] = useState("");
//     const [prompt, setPrompt] = useState("");
//     const [showLLMOptions, setShowLLMOptions] = useState(false); // To control UI display

//     useEffect(() => {
//         const fetchPlatforms = async () => {
//             try {
//                 const data = await getPlatforms();
//                 setPlatforms(data);
//             } catch (error) {
//                 console.error("Error fetching platforms:", error);
//             }
//         };
//         fetchPlatforms();
//     }, []);

//     const handlePlatformChange = async (event) => {
//         const platform = event.target.value;
//         setSelectedPlatform(platform);
//         try {
//             const modelsData = await getModelsByPlatform(platform);
//             setModels(modelsData);
//             setSelectedModel("");
//         } catch (error) {
//             console.error("Error fetching models:", error);
//         }
//     };

//     const handleModelChange = (event) => {
//         setSelectedModel(event.target.value);
//     };

//     return (
//         <div>
//             {/* Header */}
//             <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
//                 <Toolbar>
//                     <Typography variant="h6" sx={{ color: "#6c5ce7", fontWeight: "bold" }}>
//                         EDA LLM GW
//                     </Typography>
//                 </Toolbar>
//             </AppBar>

//             {/* Banner */}
//             <Banner />

//             {/* Choose LLM Button */}
//             <Box display="flex" justifyContent="center" mt={4}>
//                 <Button
//                     variant="contained"
//                     onClick={() => setShowLLMOptions(true)}
//                     sx={{ backgroundColor: "#6c5ce7", color: "#fff", fontWeight: "bold" }}
//                 >
//                     Choose LLM
//                 </Button>
//             </Box>

//             {/* Conditional Dropdowns and Input */}
//             {showLLMOptions && (
//                 <Paper elevation={3} sx={{ padding: 4, mt: 4, mx: "auto", maxWidth: 600 }}>
//                     {/* Select Model */}
//                     <Typography variant="h6" mb={2} sx={{ fontWeight: "bold", color: "#6c5ce7" }}>
//                         Ask using Snowflake Cortex
//                     </Typography>

//                     {/* Model Selection */}
//                     <FormControl fullWidth margin="normal">
//                         <InputLabel id="model-select-label">Select your model</InputLabel>
//                         <Select
//                             labelId="model-select-label"
//                             value={selectedModel}
//                             onChange={handleModelChange}
//                         >
//                             {models.map((model) => (
//                                 <MenuItem key={model} value={model}>{model}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>

//                     {/* Prompt Input */}
//                     <TextField
//                         label="Provide Prompt"
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                         value={prompt}
//                         onChange={(e) => setPrompt(e.target.value)}
//                     />

//                     {/* Submit Button */}
//                     <Typography variant="body1" sx={{ mt: 2 }}>
//                         Selected model: {selectedModel || "None"}
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 2 }}>
//                         Requested Prompt:
//                     </Typography>
//                     <Button variant="contained" sx={{ backgroundColor: "#6c5ce7" }}>
//                         Submit
//                     </Button>
//                 </Paper>
//             )}
//         </div>
//     );
// };

// export default Home;

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
    Paper
} from "@mui/material";
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
    const [prompt, setPrompt] = useState("");

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

    return (
        <div>
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ color: "#6c5ce7", fontWeight: "bold" }}>
                        EDA LLM GW
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
            <Typography variant="h5" gutterBottom sx={{alignItems: 'left', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', fontSize:"20px", color: "#6c5ce7" }}>
                    Choose LLM Platform
                </Typography>
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="platform-select-label">Choose LLM Platform</InputLabel>
                    <Select
                        labelId="platform-select-label"
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
                            labelId="model-select-label"
                            value={selectedModel}
                            onChange={handleModelChange}
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

                    {/* Submit Button */}
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Selected model: {selectedModel || "None"}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Requested Prompt:
                    </Typography>
                    <Button variant="contained" sx={{ backgroundColor: "#6c5ce7" }}>
                        Submit
                    </Button>
                </Paper>
            )}
        </div>
    );
};

export default Home;
