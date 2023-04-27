import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ThemeCard from "../ThemeCard";
import { Search } from "@mui/icons-material";

interface TemplateRequest {
  CreatedByUsername: string;
  TemplateName: string;
}

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(9);
  const [numOfTemplates, setNumOfTemplates] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function getTemplates() {
    try {
      const templateSearchParams = new URLSearchParams(); 
      templateSearchParams.append("templateName", searchQuery);
      templateSearchParams.append("pageIndex", currentPage.toString());
      templateSearchParams.append("pageSize", pageSize.toString());

      const response = axios.get("api/Themes/GetAllTemplates/?" + templateSearchParams);

      setTemplates((await response).data.data.themes);
      setNumOfPages((await response).data.totalRecords / pageSize);
      setNumOfTemplates((await response).data.data.totalRecords);
      console.log((await response).data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        component={"h1"}
        variant={"h1"}
        sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
        paddingLeft={"24px"}
        paddingTop={"32px"}
      >
        Find a template that you like, and try it out:
      </Typography>
      <form style={{ paddingTop: "16px", paddingLeft: "24px" }}>
        <TextField
          id="templateSearchBar"
          className="text"
          label="Search to enter a template name"
          variant="outlined"
          placeholder="Find..."
          sx={{ width: "96.2vw" }}
          value={searchQuery}
          onChange={(query) => setSearchQuery(query.target.value)}
          onKeyDown={(input) => {
            if (input.key === "Enter") {
              input.preventDefault();
              getTemplates();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </form>
      {numOfTemplates === 0 && (
        <Typography
          component={"h4"}
          variant={"h4"}
          sx={{ fontSize: "2.5rem" }}
          paddingLeft={"24px"}
          paddingTop={"32px"}
        >
          Sorry, it appears nothing was returned. Try searching for something
          else, or check your connection.
        </Typography>
      )}
      <Grid container component={"main"} spacing={2}>
        {templates.map((themeData: any, i: any) => (
          <Grid
            xs={12}
            sm={6}
            md={4}
            component={"article"}
            key={themeData.themeID}
          >
            <ThemeCard
              themeId={themeData.themeID}
              cardImg={"https://loremflickr.com/640/480/shibainu"}
              cardTitle={themeData.themeName}
              themeCreator={themeData.createdByUsername}
              cardDescription={themeData.themeDescr}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          paddingBottom: "36px",
          paddingTop: "12px",
        }}
      >
        {numOfPages > 1 && (
          <Pagination
            count={numOfPages}
            page={currentPage}
            variant="outlined"
          />
        )}
      </Box>
    </Box>
  );
}
