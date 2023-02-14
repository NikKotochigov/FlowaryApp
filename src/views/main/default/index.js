import { useState } from "react";

import { Box, Button, Toolbar } from "@mui/material";
import CompanyCreateStepper from "../Steps/companyCreateStepper";

const Main = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateCompany = () => {
    console.log("hello");
    setIsCreateOpen(true);
  }

  return (
    <>
      <Toolbar>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <Button variant="outlined" onClick={handleCreateCompany}>
            Create company
          </Button>
          <Button variant="outlined">
            Choose company
          </Button>
        </Box>
      </Toolbar>
      {isCreateOpen && <CompanyCreateStepper />}
    </>
  )
};

export default Main;













